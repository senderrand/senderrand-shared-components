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
  getTrackerMessage, // @ts-ignore
} from 'senderrand-shared-components';
import { Alert } from 'react-native';

const Wrap = styled.View`
  flex: 1;
`;
let sender = { id: 1, name: 'Ollan Monsur' };
let sender2 = { id: 2, name: 'Yinka Azeez' };
let msg = getInvoiceMessage('20 AED', sender2, 'Mirdif City Center', 'ar');
let msg2 = getTrackerMessage(
  { longitude: 55.3863, latitude: 25.1279 },
  { longitude: 55.3775, latitude: 25.1218 },
  sender2,
  'en'
);
let msg3 = getStatusMessage('Yinka is arriving somewhere currently', sender2);

export default () => {
  let [messages, setMessages] = useState([...data, msg, msg2, msg3]);
  return (
    <Wrap>
      <Chat
        headerOptions={['History', 'Locations', 'Settings', 'FAQ']}
        headerOnSelectOption={(index) => console.log(index)}
        family={family}
        user={sender}
        send={(message: any) => setMessages([...messages, message])}
        messages={messages}
        ionicons={Ionicons}
        entypo={Entypo}
        materialIcons={MaterialIcons}
        antDesign={AntDesign}
        invoiceBoxPress={(item) => console.log(item)}
        trackBoxPress={(item) => console.log(item)}
        feather={Feather}
        loading={false}
        footerOnError={(error: string) => Alert.alert('Failed', error)}
        materialCommunityIcons={MaterialCommunityIcons}
      />
    </Wrap>
  );
};
