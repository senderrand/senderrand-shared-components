import XMPPFactory, { user } from './factory';
import { AppState } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrap = styled.View`
  flex: 0;
`;

interface client {
  user: user;
  service: string;
  domain: string;
  change: (res: any) => void;
}
const XmppClient = (props: client) => {
  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = (nextState: any) => {
    if (props.user && props.user.jabber_id) {
      const xmpp = XMPPFactory.getInstance(
        props.user,
        props.service,
        props.domain,
        handleChanges
      );
      // if (nextState === 'background') xmpp.stop();
      if (appState === 'background' && nextState === 'active') xmpp.start();
    }
    setAppState(nextState);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  let handleChanges = (res: any) => {
    props.change && props.change(res);
  };

  useEffect(() => {
    if (props.user && props.user.jabber_id && props.user.jabber_id) {
      // First instantiation of XMPP across the project
      const XMPPClient = XMPPFactory.getInstance(
        props.user,
        props.service,
        props.domain,
        handleChanges
      );
      XMPPClient.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.domain, props.service, props.user]);

  return <Wrap />;
};

export default React.memo(XmppClient);
