import styled from "styled-components";

import Credential from "@popup/components/common/Credential";
import History from "@popup/components/common/History";
import TopComponent from "@popup/components/common/TopComponent";

import CredentialsVersions from "@models/Credential/versions";

import { ICredential, IRequest } from "@pluginTypes/index";

const RootContainer = styled.div`
  margin-bottom: var(--s-32);
`;

export type CredentialsProps = {
  credentials: ICredential[];
  requests: IRequest[];
};

function Credentials(props: CredentialsProps) {
  const { credentials, requests } = props;

  const sortedCredentials = credentials.sort(
    (credentialA: ICredential, credentialB: ICredential) => {
      if (credentialA.version === credentialB.version) {
        return 0;
      }

      if (credentialA.version === CredentialsVersions.VERSION_ONE) {
        return 1;
      }

      return -1;
    },
  );

  const getCredentialRequests = (id: string) =>
    requests.filter((request) => request.request.credential!.id === id);

  return (
    <TopComponent>
      {sortedCredentials.map((credential: ICredential) => {
        const credentialsRequests = getCredentialRequests(credential.id);

        return (
          <RootContainer key={credential.id}>
            <Credential key={credential.level} credential={credential} />
            {credentialsRequests.length > 0 && (
              <History requests={getCredentialRequests(credential.id)} />
            )}
          </RootContainer>
        );
      })}
    </TopComponent>
  );
}

Credentials.defaultProps = {
  credentials: [],
};

export default Credentials;
