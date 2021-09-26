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
  ImageBox, // @ts-ignore
} from 'senderrand-shared-components';
import {
  Entypo,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
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
  let [messages, setMessages] = useState([...data]);

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
    setMessages((state) => [...state, data]);
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
            // inverted={-1}
            data={messages}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ref={(ref: any) => (list = ref)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={others.listContainer}
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
        </Avoid>
      </Inner>
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
];
