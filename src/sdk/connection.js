const INPAGE = "fractal-inpage";
const CONTENT_SCRIPT = "fractal-contentscript";

export const baseParams = {
  inpage: INPAGE,
  contentScript: CONTENT_SCRIPT,
};

export const inpageParams = {
  name: INPAGE,
  target: CONTENT_SCRIPT,
};

export const contentScriptParams = {
  name: CONTENT_SCRIPT,
  target: INPAGE,
};
