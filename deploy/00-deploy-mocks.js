const { network } = require("hardhat");
const {
	developmentChains,
	DECIMALS,
	INITIAL_PRICE,
} = require("../helper-hardhat-config");

const mockDeploy = async ({ getNamedAccounts, deployments }) => {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;
	// If we are on a local develohelppment network, we need to deploy mocks!
	if (chainId == 31337) {
		log("Local network detected! Deploying mocks...");
		await deploy("MockV3Aggregator", {
			contract: "MockV3Aggregator",
			from: deployer,
			log: true,
			args: [DECIMALS, INITIAL_PRICE],
		});
		log("Mocks Deployed!");
		log("------------------------------------------------");
	}
};

module.exports = mockDeploy;

module.exports.tags = ["all", "mocks"];
