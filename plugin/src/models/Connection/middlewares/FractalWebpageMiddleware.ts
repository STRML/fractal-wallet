import { IMiddleware, IInvokation } from "@pluginTypes/index";
import ContentScriptConnection from "@background/connection";
import WindowsService from "@services/WindowsService";

import { ERROR_NOT_ON_FRACTAL } from "@models/Connection/Errors";

import environment from "@environment/index";

export default class FractalWebpageMiddleware implements IMiddleware {
  public async apply(_invokation: IInvokation): Promise<void> {
    // get active connected chrome port
    const fractalTab = await ContentScriptConnection.getFractalConnectionPort();

    if (!fractalTab) {
      WindowsService.openTab(`https://${environment.FRACTAL_WEBSITE_HOSTNAME}`);

      throw ERROR_NOT_ON_FRACTAL();
    }
  }
}
