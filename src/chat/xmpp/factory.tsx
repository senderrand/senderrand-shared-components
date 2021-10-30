import { Audio } from 'expo-av';
import { UID } from '../index';
import { client, xml } from '@xmpp/client';
import { sendMessage, updateMessage } from '../sql';
// import debug from '@xmpp/debug';

export interface user {
  id: string | number;
  jabber_id: string | number;
  phone: string | number;
}

let XMPPFactory = (() => {
  let Singleton = (
    user: user,
    service: string,
    domain: string,
    callback: (data: any) => void
  ) => {
    const xmpp = client({
      service: service,
      domain: domain,
      username: user && user.jabber_id ? user.jabber_id : '',
      password: user && user.phone ? user.phone : '',
      resource: 'example',
    });
    let received = 'received';

    // debug(xmpp, __DEV__);
    xmpp.on('message', (_message: string) => {});
    xmpp.on('loginError', (_message: string) => {});
    xmpp.on('login', (_message: any) => {});
    xmpp.on('connect', (_message: any) => {});
    xmpp.on('offline', async () => {
      await xmpp.send(xml('presence', {}));
    }); // User offline
    xmpp.on('connecting', async () => {});
    xmpp.on('disconnect', async (_message: any) => {});
    xmpp.on('error', (_error: any) => xmpp.reconnect.start());
    xmpp.on('online', async () => {
      await xmpp.send(xml('presence', {}));
    }); // User Online
    xmpp.on('stanza', async (stanza: any) => {
      if (stanza.is('message')) {
        const message = getMessageStanza(stanza);
        if (message.startsWith(received)) handleSentReceived(message);
        else {
          const parsedBody = JSON.parse(message);
          if (parsedBody.sender && parsedBody.id && parsedBody.date) {
            let jabber = getJabber(stanza);
            jabber.from &&
              (await handleReceived(parsedBody, jabber.from, jabber.to));
          } else {
            if (parsedBody.read)
              parsedBody.orderID && handleRead(parsedBody.orderID);
            else callback(parsedBody);
          }
        }
      }
    });
    // Sent Message Received
    let handleSentReceived = (message: string) => {
      let msg = message.replace(received, '');
      let parsed = JSON.parse(msg);
      if (parsed.sender.id === user.id) {
        updateMessage(
          'status',
          2,
          'id',
          parsed.id,
          (res) => res && callback({ type: 'messages' })
        );
      }
    };
    // Message Received
    let handleReceived = async (message: any, from: string, to: string) => {
      await sendMessage(message, async (res) => {
        if (res) {
          callback({ type: 'messages' });
          await playSound();
          await xmppSend(to, from, `${received}${JSON.stringify(message)}`);
        }
      });
    };

    let handleRead = (orderID: string) => {
      updateMessage(
        'status',
        3,
        'orderID',
        orderID,
        (res) => res && callback({ type: 'messages' })
      );
    };

    let playSound = async () => {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require('../../assets/media/recieved.wav'));
        await soundObject.playAsync();
        // await soundObject.unloadAsync();
      } catch (error) {}
    };

    const start = () => xmpp.start().catch((error: any) => console.log(error));
    const stop = () => xmpp.stop().catch(() => {});
    const send = (message: any) => xmpp.send(message);
    const reconnect = () => xmpp.reconnect.start();
    const stopReconnection = () => xmpp.reconnect.stop();
    const isOnline = () => xmpp.status === 'online';
    const getMessageStanza = (stanza: any) => {
      return stanza.getChildText('body');
    };
    const getJabber = (stanza: any) => {
      let from = stanza.attrs && stanza.attrs.from ? stanza.attrs.from : '';
      let to = stanza.attrs && stanza.attrs.to ? stanza.attrs.to : '';
      return {
        from:
          from !== ''
            ? from.includes('/')
              ? from.substr(0, from.indexOf('/'))
              : from
            : null,
        to:
          to !== ''
            ? to.includes('/')
              ? to.substr(0, to.indexOf('/'))
              : to
            : null,
      };
    };

    return { stop, xmpp, send, start, isOnline, reconnect, stopReconnection };
  };

  let instance: any;
  return {
    getInstance: (
      user?: any,
      service?: string,
      domain?: string,
      callback?: (data: any) => void
    ) => {
      if (!instance) {
        // @ts-ignore
        instance = new Singleton(user, service, domain, callback);
        delete instance.constructor;
      }
      return instance;
    },
  };
})();

export default XMPPFactory;

const xmppSend = async (from: string, to: string, data: any) => {
  let xmpp = XMPPFactory.getInstance();
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
