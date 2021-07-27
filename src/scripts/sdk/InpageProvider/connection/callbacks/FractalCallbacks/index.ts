import ConnectionTypes from "@models/Connection/types";

const CATFISH_SESSION_KEY = "catfish_token";
const MEGALODON_SESSION_KEY = "megalodon_token";

export const getBackendSessions = () => ({
  catfish: localStorage.getItem(CATFISH_SESSION_KEY),
  megalodon: localStorage.getItem(MEGALODON_SESSION_KEY),
  scopes: localStorage.getItem(`${MEGALODON_SESSION_KEY}-scopes`),
});

export const getMegalodonSession = () =>
  localStorage.getItem(MEGALODON_SESSION_KEY);

const Callbacks = {
  [ConnectionTypes.GET_BACKEND_SESSIONS_INPAGE]: {
    callback: getBackendSessions,
  },
};

export default Callbacks;
