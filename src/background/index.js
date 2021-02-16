import { wrapStore } from "webext-redux";

import createStore from "../redux";

const store = createStore();

wrapStore(store);
