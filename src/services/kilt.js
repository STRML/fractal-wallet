import Kilt from "@kiltprotocol/sdk-js";

async function generateIdentity() {
  const mnemonic = Kilt.Identity.generateMnemonic()
  const identity = await Kilt.Identity.buildFromMnemonic(mnemonic)

  return {
    mnemonic,
    identity,
  }
}

const service = {
  generateIdentity,
}

export default service;
