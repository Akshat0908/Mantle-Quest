// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MantleQuestBadge.sol";
import "./MantleQuestLeaderboard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MantleQuest is Ownable {
    MantleQuestBadge public badgeContract;
    MantleQuestLeaderboard public leaderboardContract;

    enum Difficulty { BEGINNER, INTERMEDIATE, ADVANCED }

    struct QuizSession {
        uint256 startTime;
        bool isActive;
        Difficulty difficulty;
        uint256 score;
    }

    // Mapping of player address to their current quiz session
    mapping(address => QuizSession) public playerSessions;
    
    // Time limit for quiz sessions (in seconds)
    uint256 public constant SESSION_TIMEOUT = 15 minutes;

    event QuizStarted(address indexed player, Difficulty difficulty);
    event QuizCompleted(address indexed player, uint256 score);

    constructor(address _badgeContract, address _leaderboardContract) {
        badgeContract = MantleQuestBadge(_badgeContract);
        leaderboardContract = MantleQuestLeaderboard(_leaderboardContract);
    }

    function startQuiz(Difficulty _difficulty) external {
        require(!playerSessions[msg.sender].isActive, "Quiz already in progress");
        
        playerSessions[msg.sender] = QuizSession({
            startTime: block.timestamp,
            isActive: true,
            difficulty: _difficulty,
            score: 0
        });

        emit QuizStarted(msg.sender, _difficulty);
    }

    function completeQuiz(uint256 score) external {
        QuizSession storage session = playerSessions[msg.sender];
        require(session.isActive, "No active quiz session");
        require(block.timestamp - session.startTime <= SESSION_TIMEOUT, "Quiz time expired");

        session.isActive = false;
        session.score = score;

        // Update leaderboard
        leaderboardContract.addScore(msg.sender, score);

        // Award badges based on performance
        _awardBadges(msg.sender, score, session.difficulty);

        emit QuizCompleted(msg.sender, score);
    }

    function _awardBadges(address player, uint256 score, Difficulty difficulty) private {
        // Award difficulty-based badges
        if (score >= 80) { // 80% or higher score
            if (difficulty == Difficulty.BEGINNER) {
                badgeContract.mintBadge(player, MantleQuestBadge.BadgeType.BEGINNER);
            } else if (difficulty == Difficulty.INTERMEDIATE) {
                badgeContract.mintBadge(player, MantleQuestBadge.BadgeType.INTERMEDIATE);
            } else if (difficulty == Difficulty.ADVANCED) {
                badgeContract.mintBadge(player, MantleQuestBadge.BadgeType.ADVANCED);
            }
        }

        // Award perfect score badge
        if (score == 100) {
            badgeContract.mintBadge(player, MantleQuestBadge.BadgeType.PERFECT_SCORE);
        }
    }

    function getActiveSession(address player) external view returns (QuizSession memory) {
        return playerSessions[player];
    }
} 