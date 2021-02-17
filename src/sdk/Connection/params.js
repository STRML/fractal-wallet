const INPAGE = "fractal-inpage";
const CONTENT_SCRIPT = "fractal-contentscript";

export const base = {
  inpage: INPAGE,
  contentScript: CONTENT_SCRIPT,
};

export const inpage = {
  name: INPAGE,
  target: CONTENT_SCRIPT,
};

export const contentScript = {
  name: CONTENT_SCRIPT,
  target: INPAGE,
};
