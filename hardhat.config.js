require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// define task with a name as 1st argument and handler function as the 2nd argument
task("createWallet", "print out address, public and private key", (_taskArgs, hre) => {
    const wallet = hre.ethers.Wallet.createRandom()
    console.log({
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey
    })
})

task("getBalance")
    // specify `--address` argument for the task, task arguments will be available as the 1st parameter `taskArgs` below
    .addParam("address")
    // specify handler function for the task, `hre` is the task context that contains `ethers` package
    .setAction(async (taskArgs, hre) => {
        // create RPC provider for Goerli network
        const provider = hre.ethers.providers.EtherscanProvider();
        console.log(
            "$ETH",
            // format it from Gwei to ETH
            hre.ethers.utils.formatEther(
                // fetch wallet balance using its address
                await provider.getBalance(taskArgs.address)
            )
        );
    });

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_WALLET_PRIVATE_KEY

const ETH_RPC_URL = process.env.ETH_RPC_URL
const ETH_PRIVATE_KEY = process.env.ETH_WALLET_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "sepolia",
    networks: {
        // https://sepolia.etherscan.io/
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [`0x${SEPOLIA_PRIVATE_KEY}`]
        },
        etherium: {
            url: ETH_RPC_URL,
            accounts: [`0x${ETH_PRIVATE_KEY}`]
        }
    },
    etherscan: {
        apiKey: process.env.ETH_SCAN_KEY
    },
    solidity:{
        version: "0.8.18",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    mocha: {
        timeout: 40000
    }
};
