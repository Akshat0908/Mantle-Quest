const hre = require("hardhat");

async function main() {
  // Deploy Badge Contract
  const MantleQuestBadge = await hre.ethers.getContractFactory("MantleQuestBadge");
  const badge = await MantleQuestBadge.deploy();
  await badge.waitForDeployment();
  console.log("MantleQuestBadge deployed to:", await badge.getAddress());

  // Deploy Leaderboard Contract
  const MantleQuestLeaderboard = await hre.ethers.getContractFactory("MantleQuestLeaderboard");
  const leaderboard = await MantleQuestLeaderboard.deploy();
  await leaderboard.waitForDeployment();
  console.log("MantleQuestLeaderboard deployed to:", await leaderboard.getAddress());

  // Deploy Main Quiz Contract
  const MantleQuest = await hre.ethers.getContractFactory("MantleQuest");
  const quest = await MantleQuest.deploy(
    await badge.getAddress(), 
    await leaderboard.getAddress()
  );
  await quest.waitForDeployment();
  console.log("MantleQuest deployed to:", await quest.getAddress());

  // Transfer ownership of Badge and Leaderboard contracts to Quest contract
  await badge.transferOwnership(await quest.getAddress());
  await leaderboard.transferOwnership(await quest.getAddress());
  console.log("Ownership transferred to Quest contract");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 