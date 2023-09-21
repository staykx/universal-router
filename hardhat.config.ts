import 'hardhat-typechain'
import '@nomiclabs/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.8.17',
  settings: {
    viaIR: true,
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

export default {
  paths: {
    sources: './contracts',
  },
  defaultNetwork: 'xrplDevnet',
  networks: {
    xrplDevnet: {
      url: 'https://rpc-evm-sidechain.xrpl.org/',
      chainId: 1440002,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 11155111,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      timeout: 10000000
    }
  },
  etherscan: {
    apiKey: {
      xrplDevnet: 'whatever',
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'xrplDevnet',
        chainId: 1440002,
        urls: {
          apiURL: 'https://evm-sidechain.xrpl.org/api',
          browserURL: 'https://evm-sidechain.xrpl.org',
        }
      }
    ]
  },
  namedAccounts: {
    deployer: 0,
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  mocha: {
    timeout: 60000,
  },
}
