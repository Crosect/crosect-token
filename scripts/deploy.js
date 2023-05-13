const fs = require("fs");
const chalk = require("chalk");
const { utils } = require("ethers");
const { ethers, upgrades } = require('hardhat');
const R = require("ramda");

const main = async () => {
  console.log("\n\n 📡 Deploying...\n");
  const CrosectToken = await deploy("CrosectToken")
  console.log(
      " 💾  Artifacts (address, abi, and args) saved to: ",
      chalk.blue("packages/hardhat/artifacts/"),
      "\n\n"
  );
};

const deploy = async (contractName) => {
  const Contract = await ethers.getContractFactory(contractName);
  const gasPrice = await Contract.signer.getGasPrice();
  console.log(` 🛰  Current gas price: ${gasPrice}`);

  const estimatedGas = await Contract.signer.estimateGas(
      Contract.getDeployTransaction(),
  );
  console.log(` 🛰  Estimated gas: ${estimatedGas}`);

  const deploymentPrice = gasPrice.mul(estimatedGas);
  const deployerBalance = await Contract.signer.getBalance();

  console.log(` 🛰  Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
  console.log(` 🛰  Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);

  if (deployerBalance.lt(deploymentPrice)) {
    throw new Error(
        `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
            deploymentPrice.sub(deployerBalance),
        )}`,
    );
  }

  console.log(` 🛰  Deploying: ${contractName}`);

  const contract = await Contract.deploy();
  const deployed = await contract.deployed();

  const encoded = abiEncodeArgs(deployed, []);
  fs.writeFileSync(`artifacts/${contractName}.address`, deployed.address);

  console.log(
      " 📄",
      chalk.cyan(contractName),
      "deployed to:",
      chalk.magenta(deployed.address),
  );

  if (!encoded || encoded.length <= 2) return deployed;
  fs.writeFileSync(`artifacts/${contractName}.args`, encoded.slice(2));

  return deployed;
};

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed, contractArgs) => {
  // not writing abi encoded args if this does not pass
  if (
      !contractArgs ||
      !deployed ||
      !R.hasPath(["interface", "deploy"], deployed)
  ) {
    return "";
  }
  return utils.defaultAbiCoder.encode(
      deployed.interface.deploy.inputs,
      contractArgs
  );
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });