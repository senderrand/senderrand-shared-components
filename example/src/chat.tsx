import React, { useState } from 'react';
import styled from 'styled-components';
import Helper from '../../src/config/helper';
import { useColorScheme, Platform, Alert, StyleSheet } from 'react-native';
import {
  Header,
  Footer,
  TextBox,
  VoiceNote,
  VideoBox,
  ListAnimate,
  FooterOptions,
  LocationBox,
  FleetFooter,
  FleetBox,
  StatusBox,
  NewRunner,
  InvoiceBox,
  TrackBox,
  ReasonSwipe,
  ImageBox, // @ts-ignore
} from 'senderrand-shared-components';
import {
  Entypo,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  Fontisto,
  Feather, FontAwesome5,
} from '@expo/vector-icons';

const pattern = require('../../assets/media/pattern.png');
const Wrap = styled.View`
  flex: 1;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().background};
`;
const Inner = styled.ImageBackground`
  flex: 1;
`;
const Avoid = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: flex-end;
`;
const List = styled.FlatList`
  padding: 12px;
`;
const BoxWrap = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 8px;
  justify-content: ${(props: any) =>
    props.sender ? 'flex-end' : 'flex-start'};
`;

export default () => {
  let list: any;
  let scheme = useColorScheme();
  let [reply, setReply] = useState(null);
  let [messages, setMessages] = useState([...data].reverse());

  let scrollToMsg = (msg: any) => {
    let msgIndex = null;
    messages.length &&
      messages.map((item, index) => {
        if (item.id === msg.id) msgIndex = index;
      });
    if (msgIndex) list.scrollToIndex({ animated: true, index: '' + msgIndex });
  };

  let send = (msg: any) => {
    let data = {
      ...msg,
      sender: { id: 1, name: 'The sender' },
      id: Math.random() * 2000,
      status: 2,
      date: new Date(),
      reply: reply,
    };
    setMessages((state) => [data, ...state]);
    setReply(null);
  };

  let keyExtractor = (_item: any, index: number) => index.toString();
  let renderItem = ({ item }: any) => (
    <ListAnimate
      outAnimation={'fadeOut'}
      inAnimation={'zoomInDown'}
      duration={300}
      isDeleted={false}
      id={item.id}
      item={item}
    >
      <BoxWrap sender={item.sender.id === 1}>
        {item.type === 'text' ? (
          <TextBox
            fontFamily={family}
            ionicons={Ionicons}
            reply={item.reply}
            status={item.status} // 0: not sent, 1: sent, 2: received, 3:read
            text={item.text}
            date={item.date}
            sender={item.sender.id === 1}
            toReply={() => scrollToMsg(item.reply)}
            onSelectOption={() => {}}
            btnTitle={item.data && item.data.btnTitle && item.data.btnTitle}
          />
        ) : item.type === 'audio' ? (
          <VoiceNote
            image={null}
            entypo={Entypo}
            ionicons={Ionicons}
            status={item.status}
            date={item.date}
            audio={item.file && item.file.uri}
            sender={item.sender.id === 1}
            onSelectOption={() => {}}
          />
        ) : item.type === 'image' ? (
          <ImageBox
            ionicons={Ionicons}
            status={item.status}
            date={item.date}
            audio={item.file && item.file.uri}
            sender={item.sender.id === 1}
            onSelectOption={() => {}}
            image={item.file.uri}
          />
        ) : item.type === 'video' ? (
          <VideoBox
            ionicons={Ionicons}
            status={item.status}
            date={item.date}
            video={item.file && item.file.uri}
            sender={item.sender.id === 1}
            onSelectOption={() => {}}
          />
        ) : item.type === 'purchase_location' ||
          item.type === 'delivery_location' ? (
          <LocationBox
            fontFamily={family}
            ionicons={Ionicons}
            entypo={Entypo}
            fontisto={Fontisto}
            status={item.status} // 0: not sent, 1: sent, 2: received, 3:read
            text={item.data && item.data.address && item.data.address}
            date={item.date}
            sender={item.sender.id === 1}
            onSelectOption={() => {}}
            location_type={item.data && item.data.location_type}
          />
        ) : item.type === 'fleet' ? (
          <FleetBox
            date={item.date}
            index={item.data && item.data.index && item.data.index}
            sender={item.sender.id === 1}
            onSelectOption={() => {}}
          />
        ) : item.type === 'status' ? (
          <StatusBox
            fontFamily={family}
            text={item.text}
            color={item.data && item.data.color && item.data.color}
            loading={item.data && item.data.loading && item.data.loading}
          />
        ) : item.type === 'new_runner' ? (
          <NewRunner
            antDesign={AntDesign}
            fontFamily={family}
            text={'Runner YINKA joined the chat'}
            name={'Runner Yinka'}
            runs={'90+ Runs'}
            rate={4}
            image={
              'https://media.istockphoto.com/photos/portrait-of-a-girl-picture-id938709362?s=612x612'
            }
          />
        ) : item.type === 'invoice' ? (
          <InvoiceBox
            text={item.text}
            date={item.date}
            fontFamily={family}
            invoiceID={item.data && item.data.id && item.data.id}
            price={item.data && item.data.price ? `${item.data.price} AED` : ''}
          />
        ) : item.type === 'tracker' ? (
          <TrackBox
            feather={Feather}
            text={item.text}
            date={item.date}
            fontFamily={family}
            region={item.data && item.data.region && item.data.region}
            position={item.data && item.data.position && item.data.position}
          />
        ) : null}
      </BoxWrap>
    </ListAnimate>
  );

  return (
    <Wrap scheme={scheme}>
      <Inner source={pattern}>
        <Header
          entypo={Entypo}
          detail={'Typing..'}
          title={'SendErrand'}
          fontFamily={family}
          options={['Errand History', 'Saved Locations', 'Profile', 'FAQs']}
        />
        <Avoid behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <List
            inverted={-1}
            data={messages}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ref={(ref: any) => (list = ref)}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={others.listContainer}
          />
          <FooterOptions
            fontFamily={family}
            press={(index: number) => console.log(index)}
            options={[
              { id: 1, name: 'Purchase' },
              { id: 2, name: 'Pick Up' },
            ]}
          />
          <Footer
            send={send}
            reply={reply}
            fontFamily={family}
            ionicons={Ionicons}
            antDesign={AntDesign}
            materialCommunityIcons={MaterialCommunityIcons}
            onSelectOption={(index: number) => console.log(index)}
            onError={(message: string) => Alert.alert('Failed', message)}
          />
          <Footer
            runner
            send={send}
            fontFamily={family}
            ionicons={Ionicons}
            antDesign={AntDesign}
            materialCommunityIcons={MaterialCommunityIcons}
            onSelectOption={(index: number) => console.log(index)}
            onError={(message: string) => Alert.alert('Failed', message)}
          />
          <FleetFooter />
        </Avoid>
      </Inner>
      <ReasonSwipe
        ionicons={Ionicons}
        family={family}
        data={reasons}
        textKey={'reason'}
        onSend={(item) => console.log(item)}
        onSelect={(item) => console.log(item)}
      />
    </Wrap>
  );
};

const others = StyleSheet.create({
  listContainer: {
    paddingBottom: 50,
  },
});

export const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

let data = [
  {
    sender: { id: 2, name: 'The sender' },
    id: 7,
    status: 3,
    date: new Date(),
    text: 'Hello there, On the hunt for winter sun? Or any time of the year sun?',
    file: null,
    type: 'text',
    reply: null,
  },
  {
    sender: { id: 1, name: 'The sender' },
    id: 17,
    status: 3,
    date: new Date(),
    text: 'The reply to the top statement.',
    file: null,
    type: 'text',
    reply: {
      sender: { id: 2, name: 'The sender' },
      id: 7,
      status: 3,
      date: new Date(),
      text: 'Hello there, On the hunt for winter sun? Or any time of the year sun?',
      file: null,
      type: 'text',
      reply: null,
    },
  },
  {
    sender: { id: 2, name: 'The sender' },
    id: 72,
    status: 3,
    date: new Date(),
    text: '',
    file: {
      uri: 'https://i.pinimg.com/originals/d8/61/ee/d861ee91ee80faded298979fb22a8c53.jpg',
    },
    type: 'image',
    reply: null,
  },
  {
    sender: { id: 1, name: 'The sender' },
    id: 71,
    status: 3,
    date: new Date(),
    text: '',
    file: null,
    type: 'purchase_location',
    reply: null,
    data: {
      address: 'Deira International Market',
      longitude: 20,
      latitude: 20,
      location_type: 'store',
    },
  },
  {
    sender: { id: 1, name: 'The sender' },
    id: 73,
    status: 3,
    date: new Date(),
    text: '',
    file: null,
    type: 'fleet',
    reply: null,
    data: { index: 3 },
  },
  {
    sender: { id: 1, name: 'The sender' },
    id: 74,
    status: 3,
    date: new Date(),
    text: 'Please wait while we connect you to a  runner...',
    file: null,
    type: 'status',
    reply: null,
    data: { loading: true },
  },
  {
    sender: { id: 1, name: 'The sender' },
    id: 75,
    status: 3,
    date: new Date(),
    text: 'Runner Joined chat',
    file: null,
    type: 'new_runner',
    reply: null,
    data: { loading: true },
  },
  {
    sender: { id: 1, name: 'The sender' },
    id: 74,
    status: 3,
    date: new Date(),
    text: 'Yinka is 1 minute away from Location 1',
    file: null,
    type: 'status',
    reply: null,
    data: { loading: false, color: '#66CF4A' },
  },
  {
    sender: { id: 2, name: 'The sender' },
    id: 75,
    status: 3,
    date: new Date(),
    text: 'Invoice',
    file: null,
    type: 'invoice',
    reply: null,
    data: { id: '#12345678', price: 500 },
  },
  {
    sender: { id: 2, name: 'The sender' },
    id: 75,
    status: 3,
    date: new Date(),
    text: 'Track Runner',
    file: null,
    type: 'tracker',
    reply: null,
    data: {
      region: { longitude: 55.3863, latitude: 25.1279 },
      position: { longitude: 55.3775, latitude: 25.1218 },
    },
  },
  {
    sender: { id: 2, name: 'The sender' },
    id: 76,
    status: 3,
    date: new Date(),
    text: 'The sender has accepted the Invoice, Proceed to make payment.',
    file: null,
    type: 'text',
    reply: null,
    data: { btnTitle: 'PAY' },
  },
];

let reasons = [
  { reason: 'Runner took too long to respond' },
  { reason: 'Wrong pickup location' },
  { reason: 'I don’t need the service anymore' },
  { reason: 'Have to attend to an Emergency' },
];
