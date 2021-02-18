import Kilt from "@kiltprotocol/sdk-js";

async function generateIdentity() {
  const mnemonic = Kilt.Identity.generateMnemonic()
  console.log("mnemonic:", mnemonic)

  const identity = await Kilt.Identity.buildFromMnemonic(mnemonic)
  console.log("address:", identity.address)
  console.log("publicKey:", identity.boxKeyPair.publicKey)
  console.log("privateKey:", identity.boxKeyPair.secretKey)

  return {
    mnemonic,
    identity,
  }
}

const service = {
  generateIdentity,
}

export default service;
