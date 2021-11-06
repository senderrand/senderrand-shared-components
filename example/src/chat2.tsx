import React, { useState } from 'react';
import styled from 'styled-components';
import { family, data } from './chat';
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from '@expo/vector-icons';
import Chat, {
  getInvoiceMessage,
  getStatusMessage,
  getNewRunnerMessage,
  // xmppSend,
  runnerInterface,
  getTrackerMessage, // @ts-ignore
} from 'senderrand-shared-components';
import { Alert } from 'react-native';

const Wrap = styled.View`
  flex: 1;
`;
let sender = { id: '1', name: 'Ollan Monsur' };
let sender2 = { id: '2', name: 'Yinka Azeez' };
let msg = getInvoiceMessage('1', '20 AED', sender2, 'Mirdif City Center', 'ar');
let msg2 = getTrackerMessage(
  '1',
  { longitude: 55.3863, latitude: 25.1279 },
  { longitude: 55.3775, latitude: 25.1218 },
  sender2,
  'en'
);
let msg3 = getStatusMessage(
  '1',
  'Yinka is arriving somewhere currently',
  sender2
);
let runner: runnerInterface = {
  ...sender2,
  image:
    'https://bombaymeatco.com/wp-content/uploads/2014/11/free-profile-photo-whatsapp-4.png',
  rate: 4,
  runs: 110,
};
let msg4 = getNewRunnerMessage('1', runner, 'ar');

export default () => {
  let [messages, setMessages] = useState([...data, msg, msg2, msg3, msg4]);
  let send = (message: any) => {
    setMessages([...messages, message]);
    // xmppSend('', '', message);
  };

  return (
    <Wrap>
      <Chat
        orderID={1}
        headerOptions={['History', 'Locations', 'Settings', 'FAQ']}
        headerOnSelectOption={(index: number) => console.log(index)}
        family={family}
        user={sender}
        send={send}
        messages={[]}
        ionicons={Ionicons}
        entypo={Entypo}
        materialIcons={MaterialIcons}
        antDesign={AntDesign}
        invoiceBoxPress={(item: any) => console.log(item)}
        trackBoxPress={(item: any) => console.log(item)}
        feather={Feather}
        loading={false}
        footerOnError={(error: string) => Alert.alert('Failed', error)}
        materialCommunityIcons={MaterialCommunityIcons}
      />
    </Wrap>
  );
};
