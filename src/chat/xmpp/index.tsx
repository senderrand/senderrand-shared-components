import XMPPFactory from './factory';
import { UID } from '../../chat/index';
import { xml } from '@xmpp/client';

let xmpp = XMPPFactory.getInstance();
export const xmppSend = async (from: string, to: string, data: any) => {
  let stanzaParams = {
    from,
    to,
    type: 'chat',
    id: data.id ? data.id : UID(),
  };
  let messageStanza = xml('message', stanzaParams);
  await messageStanza
    .c('body', {})
    .t(typeof data === 'string' ? data : JSON.stringify(data))
    .up();
  await xmpp.send(messageStanza);
};

export const sendTyping = async (
  typing: boolean,
  orderID: string | number,
  from: string,
  to: string
) => {
  let data = { typing, orderID };
  await xmppSend(from, to, data);
};

export const sendRecording = async (
  recording: boolean,
  orderID: string | number,
  from: string,
  to: string
) => {
  let data = { recording, orderID };
  await xmppSend(from, to, data);
};

export const sendRead = async (
  orderID: string | number,
  from: string,
  to: string
) => {
  let data = { read: true, orderID };
  await xmppSend(from, to, data);
};
