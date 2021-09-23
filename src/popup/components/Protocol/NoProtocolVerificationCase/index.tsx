import styled from "styled-components";

import Wallet from "@models/Wallet";

import Button from "@popup/components/common/Button";
import Text, {
  TextSizes,
  TextHeights,
  TextWeights,
} from "@popup/components/common/Text";
import Title from "@popup/components/common/Title";
import Logo from "@popup/components/common/Logo";
import Anchor from "@popup/components/common/Anchor";

import { useUserSelector } from "@redux/stores/user/context";
import { getWallet } from "@redux/stores/user/reducers/protocol/selectors";

import WindowsService from "@services/WindowsService";
import environment from "@environment/index";

// @ts-ignore
import Copy from "@assets/copy.svg";

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: var(--s-24);
  padding-bottom: var(--s-48);
`;
const ContentContainer = styled.div`
  text-align: left;
  margin-bottom: var(--s-10);
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--s-24) 0;
  margin-bottom: var(--s-32);
`;
const FooterContainer = styled.div`
  text-align: left;
`;
const AddressContainer = styled.div`
  margin-top: var(--s-48);
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const LineWithCopy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > span {
    margin-right: 5px;
  }

  > svg {
    &:hover {
      cursor: pointer;
    }
  }
`;

interface AddressProps {
  wallet: Wallet;
}

function Address({ wallet }: AddressProps) {
  return (
    <AddressContainer>
      <Text weight={TextWeights.BOLD}>FCL Address:</Text>

      <LineWithCopy>
        <Text size={TextSizes.SMALL} height={TextHeights.SMALL} span>
          {wallet.address}
        </Text>

        <Copy onClick={() => navigator.clipboard.writeText(wallet.address)} />
      </LineWithCopy>
    </AddressContainer>
  );
}

function NoProtocolVerificationCase() {
  const wallet = useUserSelector(getWallet);

  const onNext = () => WindowsService.openTab(environment.JOURNEY_URL);

  return (
    <>
      <IconContainer>
        <Logo />
      </IconContainer>
      <ContentContainer>
        <Title>You haven’t verified your identity yet.</Title>
        <Text>
          To earn {environment.PROTOCOL_CURRENCY} start by providing a valid
          liveness.
        </Text>
        {wallet && wallet.address && <Address wallet={wallet} />}
      </ContentContainer>
      <ActionContainer>
        <Button onClick={onNext}>Verify Identity</Button>
      </ActionContainer>
      <FooterContainer>
        <Text size={TextSizes.SMALL} height={TextHeights.SMALL}>
          If you need help on anything related to Fractal ID Wallet, please
          contact us at{" "}
          <Anchor link="mailto:support@fractal.id">support@fractal.id</Anchor>.
        </Text>
      </FooterContainer>
    </>
  );
}

export default NoProtocolVerificationCase;