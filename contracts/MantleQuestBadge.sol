// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MantleQuestBadge is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Badge types
    enum BadgeType { BEGINNER, INTERMEDIATE, ADVANCED, PERFECT_SCORE }

    // Mapping from token ID to badge type
    mapping(uint256 => BadgeType) public badgeTypes;
    
    // Base URI for metadata
    string private _baseTokenURI;

    constructor() ERC721("MantleQuest Badge", "MQB") {}

    function mintBadge(address player, BadgeType badgeType) external onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(player, newTokenId);
        badgeTypes[newTokenId] = badgeType;
        
        return newTokenId;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
} 