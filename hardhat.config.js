require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MANTLE_TESTNET_RPC_URL = process.env.MANTLE_TESTNET_RPC_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    mantleTest: {
      url: MANTLE_TESTNET_RPC_URL,
      accounts: [PRIVATE_KEY].filter(Boolean),
      chainId: 5003,
      gasPrice: 1000000000, // 1 gwei
      gas: 2100000,
      timeout: 60000,
      blockGasLimit: 100000000,
      allowUnlimitedContractSize: true,
      verify: {
        etherscan: {
          apiUrl: "https://explorer.testnet.mantle.xyz"
        }
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
}; 