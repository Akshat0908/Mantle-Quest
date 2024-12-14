// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MantleQuestLeaderboard is Ownable {
    struct Score {
        address player;
        uint256 score;
        uint256 timestamp;
    }

    // Top scores array
    Score[] public topScores;
    uint256 public constant MAX_LEADERBOARD_SIZE = 10;

    // Player's best scores
    mapping(address => uint256) public playerBestScores;

    event ScoreAdded(address indexed player, uint256 score, uint256 timestamp);
    event LeaderboardUpdated(address indexed player, uint256 score);

    function addScore(address player, uint256 score) external onlyOwner {
        // Update player's best score if necessary
        if (score > playerBestScores[player]) {
            playerBestScores[player] = score;
        }

        // Add to leaderboard if qualifies
        _updateLeaderboard(player, score);

        emit ScoreAdded(player, score, block.timestamp);
    }

    function _updateLeaderboard(address player, uint256 score) private {
        // Find the position where the new score should be inserted
        uint256 position = topScores.length;
        for (uint256 i = 0; i < topScores.length; i++) {
            if (score > topScores[i].score) {
                position = i;
                break;
            }
        }

        // Insert the new score if it qualifies
        if (position < MAX_LEADERBOARD_SIZE) {
            // Create new score entry
            Score memory newScore = Score(player, score, block.timestamp);

            // If array is at max size, remove last element
            if (topScores.length == MAX_LEADERBOARD_SIZE) {
                topScores.pop();
            }

            // Insert new score at correct position
            topScores.push(newScore); // Temporarily add to end
            for (uint256 i = topScores.length - 1; i > position; i--) {
                topScores[i] = topScores[i - 1];
            }
            topScores[position] = newScore;

            emit LeaderboardUpdated(player, score);
        }
    }

    function getTopScores() external view returns (Score[] memory) {
        return topScores;
    }
} 