import { getProtocolService } from "@services/Factory";
import {
  IdentityRegistrationFailed,
  MintingRegistrationFailed,
} from "@services/ProtocolService";
import { Storage, withLock } from "@utils/StorageArray";

export class MintingRegistrar {
  constructor(
    private readonly storage: Storage,
    private readonly statusCheckSleepSeconds: number,
  ) {}

  async maybeTryRegister() {
    const lastCheck = await this.storage.getItem(
      "minting_registrar/last_check",
    );
    const now = new Date().getTime() / 1000;
    const shouldCheck =
      lastCheck == null ||
      now > parseInt(lastCheck) + this.statusCheckSleepSeconds;
    if (!shouldCheck) return;

    try {
      await withLock(this.storage, "minting_registrar/lock", async () => {
        const protocol = await getProtocolService();
        await protocol.ensureIdentityRegistered();
        const isRegistered = await protocol.isRegisteredForMinting();
        if (isRegistered) {
          console.log(
            "Already registered for next minting, not doing anything",
          );
        } else {
          console.log("Not registered for minting, trying to register");
          const hash = await protocol.registerForMinting();
          console.log(`Successfully registered for minting ${hash}`);
        }

        await this.storage.setItem(
          "minting_registrar/last_check",
          now.toString(),
        );
      });
    } catch (e) {
      if (
        e instanceof IdentityRegistrationFailed ||
        e instanceof MintingRegistrationFailed
      ) {
        chrome.runtime.reload();
      } else {
        throw e;
      }
    }
  }
}
