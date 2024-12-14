export const quizQuestions = {
  BEGINNER: [
    {
      id: 1,
      question: "What is Mantle Network?",
      options: [
        "A Layer 2 scaling solution for Ethereum",
        "A new blockchain",
        "A cryptocurrency exchange",
        "A wallet application"
      ],
      correctAnswer: 0,
      explanation: "Mantle is a Layer 2 scaling solution built on Ethereum, offering lower fees and higher throughput."
    },
    {
      id: 2,
      question: "What technology does Mantle use for scaling?",
      options: [
        "Sharding",
        "Optimistic Rollups",
        "Plasma",
        "State Channels"
      ],
      correctAnswer: 1,
      explanation: "Mantle uses Optimistic Rollup technology to securely process transactions off-chain."
    },
    {
      id: 3,
      question: "What is the native token of Mantle Network?",
      options: [
        "MATIC",
        "MNT",
        "ETH",
        "BIT"
      ],
      correctAnswer: 1,
      explanation: "MNT is the native token of Mantle Network, used for gas fees and governance."
    },
    {
      id: 4,
      question: "What is the main advantage of using Mantle Network?",
      options: [
        "Higher transaction costs",
        "Slower transaction speed",
        "Lower transaction fees and higher throughput",
        "No connection to Ethereum"
      ],
      correctAnswer: 2,
      explanation: "Mantle offers lower transaction fees and higher throughput while maintaining Ethereum's security."
    },
    {
      id: 5,
      question: "How can you interact with Mantle Network?",
      options: [
        "Only through command line",
        "Using MetaMask and other Web3 wallets",
        "Only through hardware wallets",
        "Only through centralized exchanges"
      ],
      correctAnswer: 1,
      explanation: "You can interact with Mantle using popular Web3 wallets like MetaMask."
    }
  ],
  INTERMEDIATE: [
    {
      id: 1,
      question: "What is mETH Protocol in Mantle?",
      options: [
        "A staking protocol",
        "A lending protocol",
        "A liquid staking derivative protocol",
        "A gaming protocol"
      ],
      correctAnswer: 2,
      explanation: "mETH is Mantle's liquid staking derivative protocol."
    },
    {
      id: 2,
      question: "What role does MNT token play in governance?",
      options: [
        "No role in governance",
        "Only for staking",
        "Voting on protocol upgrades and parameters",
        "Only for transaction fees"
      ],
      correctAnswer: 2,
      explanation: "MNT token holders can vote on protocol upgrades and parameter changes."
    },
    {
      id: 3,
      question: "How does Mantle achieve data availability?",
      options: [
        "Through centralized servers",
        "Using Ethereum mainnet",
        "Through a hybrid approach",
        "Only through its own network"
      ],
      correctAnswer: 2,
      explanation: "Mantle uses a hybrid approach for data availability, combining different solutions."
    },
    {
      id: 4,
      question: "What is Mantle's approach to decentralization?",
      options: [
        "Fully centralized",
        "Progressive decentralization",
        "No decentralization",
        "Instant decentralization"
      ],
      correctAnswer: 1,
      explanation: "Mantle follows a progressive decentralization approach, gradually increasing decentralization."
    },
    {
      id: 5,
      question: "What is the relationship between Mantle and BitDAO?",
      options: [
        "No relationship",
        "Mantle was incubated by BitDAO",
        "They are competitors",
        "They are the same project"
      ],
      correctAnswer: 1,
      explanation: "Mantle was incubated by BitDAO and is part of the BitDAO ecosystem."
    }
  ],
  ADVANCED: [
    {
      id: 1,
      question: "How does Mantle's fraud proof system work?",
      options: [
        "It doesn't have fraud proofs",
        "Uses zero-knowledge proofs",
        "Uses optimistic fraud proofs with a challenge period",
        "Uses immediate validation"
      ],
      correctAnswer: 2,
      explanation: "Mantle uses optimistic fraud proofs with a challenge period for transaction validation."
    },
    {
      id: 2,
      question: "What is Mantle's approach to MEV?",
      options: [
        "Ignores MEV completely",
        "Uses a fair ordering solution",
        "Allows unrestricted MEV",
        "Blocks all MEV activities"
      ],
      correctAnswer: 1,
      explanation: "Mantle implements fair ordering solutions to manage MEV (Maximal Extractable Value)."
    },
    {
      id: 3,
      question: "How does Mantle handle cross-chain communication?",
      options: [
        "No cross-chain support",
        "Through trusted bridges only",
        "Using native message passing",
        "Through external oracles only"
      ],
      correctAnswer: 2,
      explanation: "Mantle implements native message passing for secure cross-chain communication."
    },
    {
      id: 4,
      question: "What is unique about Mantle's EVM compatibility?",
      options: [
        "Not EVM compatible",
        "Partial EVM compatibility",
        "Full EVM compatibility with extensions",
        "Only basic EVM support"
      ],
      correctAnswer: 2,
      explanation: "Mantle offers full EVM compatibility with additional protocol-specific extensions."
    },
    {
      id: 5,
      question: "How does Mantle's consensus mechanism differ from Ethereum's?",
      options: [
        "Uses the same mechanism",
        "Uses Proof of Work",
        "Uses a modified Proof of Stake",
        "Uses a sequencer-based system with L1 security"
      ],
      correctAnswer: 3,
      explanation: "Mantle uses a sequencer-based system while inheriting security from Ethereum L1."
    }
  ]
}; 