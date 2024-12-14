export const mantleQuestABI = [
  // Quiz Management
  {
    inputs: [{ name: "difficulty", type: "uint8" }],
    name: "startQuiz",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "score", type: "uint256" }],
    name: "completeQuiz",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ name: "player", type: "address" }],
    name: "getActiveSession",
    outputs: [{
      components: [
        { name: "startTime", type: "uint256" },
        { name: "isActive", type: "bool" },
        { name: "difficulty", type: "uint8" },
        { name: "score", type: "uint256" }
      ],
      type: "tuple"
    }],
    stateMutability: "view",
    type: "function"
  },
  
  // Events
  {
    name: "QuizStarted",
    type: "event",
    inputs: [
      { name: "player", type: "address", indexed: true },
      { name: "difficulty", type: "uint8", indexed: false }
    ]
  },
  {
    name: "QuizCompleted",
    type: "event",
    inputs: [
      { name: "player", type: "address", indexed: true },
      { name: "score", type: "uint256", indexed: false }
    ]
  }
];

export const mantleQuestBadgeABI = [
  {
    name: "mintBadge",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "player", type: "address" },
      { name: "badgeType", type: "uint8" }
    ],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    name: "ownerOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "address" }]
  },
  {
    name: "badgeTypes",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "uint256" }],
    outputs: [{ name: "", type: "uint8" }]
  },
  {
    name: "tokenURI",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "tokenId", type: "uint256" }],
    outputs: [{ name: "", type: "string" }]
  }
];

export const mantleQuestLeaderboardABI = [
  {
    name: "addScore",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "player", type: "address" },
      { name: "score", type: "uint256" }
    ],
    outputs: []
  },
  {
    name: "getTopScores",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{
      type: "tuple[]",
      components: [
        { name: "player", type: "address" },
        { name: "score", type: "uint256" },
        { name: "timestamp", type: "uint256" }
      ]
    }]
  },
  {
    name: "playerBestScores",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "player", type: "address" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  
  // Events
  {
    name: "ScoreAdded",
    type: "event",
    inputs: [
      { name: "player", type: "address", indexed: true },
      { name: "score", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false }
    ]
  },
  {
    name: "LeaderboardUpdated",
    type: "event",
    inputs: [
      { name: "player", type: "address", indexed: true },
      { name: "score", type: "uint256", indexed: false }
    ]
  }
]; 