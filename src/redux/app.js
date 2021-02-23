import mirrorCreator from "mirror-creator";
import { createActions } from "redux-actions";

const types = mirrorCreator(["STARTUP"]);

export const creators = createActions(types.STARTUP);

export const appTypes = types;

export default creators;
