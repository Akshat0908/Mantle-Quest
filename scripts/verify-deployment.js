const hre = require("hardhat");

async function main() {
  const mantleQuestAddress = "0x211F663efD099cF2aDCd42B038f54Fd16Db5f694";
  
  try {
    // Get contract instance
    const MantleQuest = await hre.ethers.getContractFactory("MantleQuest");
    const contract = MantleQuest.attach(mantleQuestAddress);

    // Try to call a view function
    const [signer] = await hre.ethers.getSigners();
    const session = await contract.getActiveSession(signer.address);
    console.log("Contract is accessible. Active session:", session);

    // Get contract bytecode to verify deployment
    const bytecode = await hre.ethers.provider.getCode(mantleQuestAddress);
    if (bytecode === '0x') {
      console.error('Contract not deployed at this address');
    } else {
      console.log('Contract is deployed and has bytecode');
    }

  } catch (error) {
    console.error("Error verifying contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 