// Compile

const main = async () => {
  const [owner, randomPerson1, randomPerson2] = await hre.ethers.getSigners()
  
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to", waveContract.address);
  console.log("Contract deployed by", owner.address);

  let waveCount
  waveCount = await waveContract.getWaves();
  
  let waveTxn = await waveContract.wave()
  await waveTxn.wait()

  waveCount = await waveContract.getWaves();

  waveTxn = await waveContract.connect(randomPerson1).wave()
  await waveTxn.wait()

  waveTxn = await waveContract.connect(randomPerson2).wave()
  await waveTxn.wait()

  waveCount = await waveContract.getWaves();

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