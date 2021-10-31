import React, { useState } from 'react';
import styled from 'styled-components';
import Helper from '../config/helper';
import {
  Platform,
  StyleSheet,
  useColorScheme,
  Clipboard,
  LayoutAnimation,
} from 'react-native';
import ListAnimate from '../common/list-animate';
import TextBox from './components/text-box';
import VoiceNote from './components/audio-box';
import ImageBox from './components/image-box';
import VideoBox from './components/video-box';
import { LocationBox, StatusBox, FooterOptions } from './components/options';
import { FleetBox, FleetFooter } from './components/fleet';
import NewRunner from './components/new-runner';
import { InvoiceBox } from './components/invoice';
import TrackBox from './components/track-box';
import Footer from './components/footer/footer';
import Header from '../chat/components/header';

const pattern = require('../assets/media/pattern.png');
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
  justify-content: space-between;
`;
const List = styled.FlatList`
  padding: 0 15px;
  flex-grow: 0;
`;
const BoxWrap = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 8px;
  justify-content: ${(props: any) =>
    props.sender ? 'flex-end' : 'flex-start'};
`;

interface familyInterface {
  light: string;
  regular: string;
  medium: string;
  bold: string;
  italic: string;
}
export interface senderInterface {
  id: string | number;
  name?: string;
  image?: string;
}
export interface messageInterface {
  id: string | number;
  text: string;
  date: Date | number;
  file: any;
  duration?: number;
  sender: senderInterface;
  reply?: messageInterface | null;
  data?: any;
  type: string;
  status: number;
  orderID: string | number;
}

interface btnOptions {
  id: string;
  title: string;
  data?: any;
}

interface Chat {
  lang?: string;
  user: senderInterface;
  send: (data: messageInterface) => void;
  textBoxOnSelectOption?: (index: number, item: messageInterface) => void;
  mediaOnSelectOption?: (index: number, item: messageInterface) => void;
  messages: messageInterface[];
  family: familyInterface;
  ionicons: any;
  textBoxOptions?: string[];
  textBoxBtnPress?: (item: messageInterface) => void;
  entypo: any;
  voiceNoteOptions?: string[];
  imageBoxOptions?: string[];
  materialIcons: any;
  locationBoxOnSelectOption?: (index: number, item: messageInterface) => void;
  errandLocationOptions?: string[];
  fleetBoxOptions?: string[];
  fleetBoxOnSelectOption?: (index: number, item: messageInterface) => void;
  antDesign: any;
  invoiceBoxPress: (item: messageInterface) => void;
  feather: any;
  trackBoxPress?: (item: messageInterface) => void;
  runner?: boolean;
  loading: boolean;
  footerOptions?: string[];
  footerOnError: (error: string) => void;
  footerOnChangeText?: (value: string) => void;
  footerDefaultOptions?: string[];
  materialCommunityIcons: any;
  footerOnSelectOption?: (index: number) => void;
  footerOnSelectDefaultOption?: (index: number) => void;
  footerOptionsPress?: (index: number, option: btnOptions) => void;
  footerType?: string;
  footerPlaceholder?: string;
  headerTitle?: string;
  headerDetail?: string;
  headerOnSelectOption?: (index: number) => void;
  headerOptions?: string[];
  newRunnerPress?: () => void;
  orderID: string | number;
  footerSetTyping?: (typing: boolean) => void;
  footerSetRecording?: (recording: boolean) => void;
}

export default (props: Chat) => {
  let list: any;
  let scheme = useColorScheme();
  let [lang] = useState(props.lang ? props.lang : 'en');
  let [reply, setReply] = useState(null);
  let [option1] = useState([Helper.t('reply', lang), Helper.t('copy', lang)]);
  let [option2] = useState([Helper.t('reply', lang)]);
  let [errandLocationOption] = useState([
    Helper.t('edit', lang),
    Helper.t('remove', lang),
  ]);
  let [fleetOption] = useState([Helper.t('change', lang)]);

  let send = (msg: any) => {
    let data = {
      ...msg,
      id: UID(),
      date: +new Date(),
      status: 0,
      reply,
      orderID: props.orderID,
      sender: props.user && props.user,
    };
    props.send && props.send(data);
    list && list.scrollToEnd();
    setReply(null);
  };

  let selectFleet = (index: number) => {
    send({ ...emptyMessage, data: { index }, type: 'fleet' });
  };

  let textOptionSelect = (index: number, item: any) => {
    switch (index) {
      case 0:
        setReply(item);
        break;
      case 1:
        item.text && Clipboard.setString(item.text);
        break;
      default:
        props.textBoxOnSelectOption && props.textBoxOnSelectOption(index, item);
        break;
    }
  };

  let mediaOptionSelect = (index: number, item: any) => {
    switch (index) {
      case 0:
        setReply(item);
        break;
      default:
        props.mediaOnSelectOption && props.mediaOnSelectOption(index, item);
        break;
    }
  };

  let getSender = (sender: any) => {
    return (
      props.user && props.user.id && sender.id && sender.id === props.user.id
    );
  };

  let scrollToMsg = (msg: any) => {
    let msgIndex = null;
    let reInverted =
      props.messages && props.messages.length
        ? [...props.messages].reverse()
        : [];
    reInverted.map((item: any, index: number) => {
      if (item.id === msg.id) msgIndex = index;
    });
    if (msgIndex) list.scrollToIndex({ animated: true, index: '' + msgIndex });
  };

  let keyExtractor = (_item: any, index: number) => index.toString();
  let renderItem = ({ item }: any) => {
    let box: any;
    switch (item.type) {
      case 'text':
        box = (
          <TextBox
            lang={lang}
            text={item.text && item.text}
            date={item.date && item.date}
            reply={item.reply && item.reply}
            status={item.status && item.status} // 0: not sent, 1: sent, 2: received, 3:read
            family={props.family && props.family}
            toReply={() => scrollToMsg(item.reply)}
            ionicons={props.ionicons && props.ionicons}
            sender={item.sender && getSender(item.sender)}
            btnTitle={item.data && item.data.btnTitle && item.data.btnTitle}
            onSelectOption={(index: number) => textOptionSelect(index, item)}
            options={
              props.textBoxOptions && props.textBoxOptions.length
                ? [...option1, ...props.textBoxOptions]
                : option1
            }
            btnPress={() =>
              props.textBoxBtnPress && props.textBoxBtnPress(item)
            }
          />
        );
        break;
      case 'audio':
        box = (
          <VoiceNote
            lang={lang}
            date={item.date && item.date}
            status={item.status && item.status}
            family={props.family && props.family}
            entypo={props.entypo && props.entypo}
            ionicons={props.ionicons && props.ionicons}
            sender={item.sender && getSender(item.sender)}
            audio={item.file && item.file.uri && item.file.uri}
            image={item.sender.image ? item.sender.image : null}
            onSelectOption={(index: number) => mediaOptionSelect(index, item)}
            options={
              props.voiceNoteOptions && props.voiceNoteOptions.length
                ? [...option2, ...props.voiceNoteOptions]
                : option2
            }
          />
        );
        break;
      case 'image':
        box = (
          <ImageBox
            lang={lang}
            date={item.date && item.date}
            status={item.status && item.status}
            family={props.family && props.family}
            ionicons={props.ionicons && props.ionicons}
            sender={item.sender && getSender(item.sender)}
            image={item.file && item.file.uri && item.file.uri}
            onSelectOption={(index: number) => mediaOptionSelect(index, item)}
            options={
              props.imageBoxOptions && props.imageBoxOptions.length
                ? [...option2, ...props.imageBoxOptions]
                : option2
            }
          />
        );
        break;
      case 'video':
        box = (
          <VideoBox
            lang={lang}
            date={item.date && item.date}
            status={item.status && item.status}
            family={props.family && props.family}
            ionicons={props.ionicons && props.ionicons}
            sender={item.sender && getSender(item.sender)}
            video={item.file && item.file.uri && item.file.uri}
            onSelectOption={(index: number) => mediaOptionSelect(index, item)}
            options={
              props.imageBoxOptions && props.imageBoxOptions.length
                ? [...option2, ...props.imageBoxOptions]
                : option2
            }
          />
        );
        break;
      case 'purchase_location':
      case 'delivery_location':
        box = (
          <LocationBox
            lang={lang}
            date={item.date && item.date}
            status={item.status && item.status} // 0: not sent, 1: sent, 2: received, 3:read
            family={props.family && props.family}
            entypo={props.entypo && props.entypo}
            ionicons={props.ionicons && props.ionicons}
            sender={item.sender && getSender(item.sender)}
            materialIcons={props.materialIcons && props.materialIcons}
            text={item.data && item.data.address && item.data.address}
            onSelectOption={(index: number) =>
              props.locationBoxOnSelectOption &&
              props.locationBoxOnSelectOption(index, item)
            }
            location_type={
              item.data && item.data.location_type && item.data.location_type
            }
            options={
              props.errandLocationOptions && props.errandLocationOptions.length
                ? [...errandLocationOption, ...props.errandLocationOptions]
                : errandLocationOption
            }
          />
        );
        break;
      case 'fleet':
        box = (
          <FleetBox
            lang={lang}
            date={item.date && item.date}
            family={props.family && props.family}
            sender={item.sender && getSender(item.sender)}
            index={item.data && item.data.index && item.data.index}
            options={
              props.fleetBoxOptions && props.fleetBoxOptions.length
                ? [...fleetOption, ...props.fleetBoxOptions]
                : fleetOption
            }
            onSelectOption={(index: number) =>
              props.fleetBoxOnSelectOption &&
              props.fleetBoxOnSelectOption(index, item)
            }
          />
        );
        break;
      case 'status':
        box = (
          <StatusBox
            text={item.text && item.text}
            family={props.family && props.family}
            color={item.data && item.data.color && item.data.color}
            loading={item.data && item.data.loading && item.data.loading}
          />
        );
        break;
      case 'new_runner':
        box = (
          <NewRunner
            lang={lang}
            text={item.text && item.text}
            family={props.family && props.family}
            antDesign={props.antDesign && props.antDesign}
            press={props.newRunnerPress && props.newRunnerPress}
            name={item.data && item.data.name && item.data.name}
            runs={item.data && item.data.runs && item.data.runs}
            rate={item.data && item.data.rate && item.data.rate}
            image={item.data && item.data.image && item.data.image}
          />
        );
        break;
      case 'invoice':
        box = (
          <InvoiceBox
            lang={lang}
            text={item.text && item.text}
            date={item.date && item.date}
            family={props.family && props.family}
            price={item.data && item.data.price && item.data.price}
            invoiceID={item.data && item.data.invoiceID && item.data.invoiceID}
            press={() => props.invoiceBoxPress && props.invoiceBoxPress(item)}
          />
        );
        break;
      case 'tracker':
        box = (
          <TrackBox
            lang={lang}
            text={item.text && item.text}
            date={item.date && item.date}
            family={props.family && props.family}
            feather={props.feather && props.feather}
            region={item.data && item.data.region && item.data.region}
            position={item.data && item.data.position && item.data.position}
            press={() => props.trackBoxPress && props.trackBoxPress(item)}
          />
        );
        break;
      default:
        box = null;
    }

    return (
      <ListAnimate
        outAnimation={'fadeOut'}
        inAnimation={'zoomInDown'}
        duration={300}
        isDeleted={false}
        id={item.id && item.id}
      >
        <BoxWrap sender={item.sender && getSender(item.sender)}>
          {item.type && box}
        </BoxWrap>
      </ListAnimate>
    );
  };

  let renderFooter = () => {
    let msg =
      props.messages && props.messages.length ? [...props.messages] : [];

    let footer = (
      <Footer
        lang={lang}
        send={send}
        reply={reply}
        runner={props.runner && props.runner}
        family={props.family && props.family}
        loading={props.loading && props.loading}
        closeReply={() => {
          setReply(null);
          LayoutAnimation.spring();
        }}
        ionicons={props.ionicons && props.ionicons}
        antDesign={props.antDesign && props.antDesign}
        options={props.footerOptions && props.footerOptions}
        onError={props.footerOnError && props.footerOnError}
        setTyping={props.footerSetTyping && props.footerSetTyping}
        placeholder={props.footerPlaceholder && props.footerPlaceholder}
        setRecording={props.footerSetRecording && props.footerSetRecording}
        onChangeText={props.footerOnChangeText && props.footerOnChangeText}
        defaultOptions={
          props.footerDefaultOptions && props.footerDefaultOptions
        }
        materialCommunityIcons={
          props.materialCommunityIcons && props.materialCommunityIcons
        }
        onSelectOption={
          props.footerOnSelectOption && props.footerOnSelectOption
        }
        onSelectDefaultOption={
          props.footerOnSelectDefaultOption && props.footerOnSelectDefaultOption
        }
      />
    );
    let fleet = <FleetFooter select={selectFleet} />;
    let options = (
      <FooterOptions
        lang={props.lang && props.lang}
        family={props.family && props.family}
        press={props.footerOptionsPress && props.footerOptionsPress}
        options={
          msg.length &&
          msg[msg.length - 1] &&
          msg[msg.length - 1].data &&
          msg[msg.length - 1].data.options &&
          msg[msg.length - 1].data.options.length
            ? msg[msg.length - 1].data.options
            : []
        }
      />
    );
    if (props.footerType) {
      footer =
        props.footerType === 'fleet'
          ? fleet
          : props.footerType === 'options'
          ? options
          : footer;
    } else {
      if (
        msg.length &&
        msg[msg.length - 1].data &&
        msg[msg.length - 1].data.footer
      ) {
        footer =
          msg[msg.length - 1].data.footer === 'fleet'
            ? fleet
            : msg[msg.length - 1].data.footer === 'options'
            ? options
            : footer;
      }
    }
    return footer;
  };

  return (
    <Wrap color={Helper.getColor().background} scheme={scheme}>
      <Inner source={pattern}>
        <Header
          lang={lang}
          entypo={props.entypo && props.entypo}
          family={props.family && props.family}
          detail={props.headerDetail && props.headerDetail}
          title={props.headerTitle ? props.headerTitle : 'SendErrand'}
          onSelectOption={
            props.headerOnSelectOption && props.headerOnSelectOption
          }
          options={
            props.headerOptions && props.headerOptions.length
              ? props.headerOptions
              : []
          }
        />
        <Avoid behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <List
            inverted={true}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            keyboardDismissMode={'on-drag'}
            ref={(ref: any) => (list = ref)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={others.listContainer}
            data={props.messages && props.messages.length ? props.messages : []}
          />
          {renderFooter()}
        </Avoid>
      </Inner>
    </Wrap>
  );
};

const others = StyleSheet.create({
  listContainer: {
    paddingBottom: 10,
    flexDirection: 'column-reverse',
  },
});

export let UID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    let r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

let emptyMessage = {
  text: '',
  file: null,
  reply: null,
  data: null,
  sender: null,
  id: null,
  status: 0,
  date: +new Date(),
};
