import { alias, wrapStore } from "webext-redux";

import createStore from "../redux";
import aliases from "./aliases";

const store = createStore(alias(aliases));

wrapStore(store);
