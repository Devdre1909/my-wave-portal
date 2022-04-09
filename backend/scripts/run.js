// Helpers
const sendWaves = async (contract, address, count) => {
  while (count > 0) {
    let waveTxn
    waveTxn = await contract.connect(address).wave()
    await waveTxn.wait()
    count--
  }

}

// Compile

const main = async () => {
  const [owner, rP1, rP2, rP3] = await hre.ethers.getSigners()
  
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to", waveContract.address);
  console.log("Contract deployed by", owner.address);

  let waveCount
  waveCount = await waveContract.getWaves();
  
  let waveTxn = await waveContract.wave()
  await waveTxn.wait()

  await waveContract.getWaves();

  await sendWaves(waveContract, rP3, 5)
  await sendWaves(waveContract, rP1, 10)
  await sendWaves(waveContract, rP2, 2)

  await waveContract.getWaves();

  await waveContract.connect(rP3).getAccountWaves()
  await waveContract.connect(rP2).getAccountWaves()

  await waveContract.getListOfAccountsAndWavesCount()



}

// Deploy
const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

// Run
runMain();