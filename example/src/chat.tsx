import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import { Header, Footer } from 'senderrand-shared-components';
import { useColorScheme, Platform, Alert } from 'react-native';
import Helper from '../../src/config/helper';
import {
  Entypo,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from '@expo/vector-icons';
import helper from '../../src/config/helper';

const pattern = require('../../assets/media/pattern.png');
const Wrap = styled.View`
  flex: 1;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().background};
`;
const Inner = styled.ImageBackground`
  flex: 1;
`;
const Dot = styled(Entypo)`
  color: ${(props: any) => props.color};
  font-size: 15px;
`;
const Avoid = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: flex-end;
`;
const List = styled.FlatList`
  padding: 15px;
`;
const SendIcon = styled(MaterialCommunityIcons)`
  font-size: 15px;
  margin-left: 2px;
  color: ${(props: any) => (props.color ? props.color : '#fff')};
`;
const AudioIcon = styled(Ionicons)`
  font-size: 20px;
  color: ${(props: any) => (props.color ? props.color : '#fff')};
`;
const PlusIcon = styled(AntDesign)`
  color: ${(props: any) => (props.color ? props.color : '#6A6A6A')};
  font-size: 20px;
`;
const Clip = styled(SendIcon)`
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().secondaryTxt};
  font-size: 20px;
`;

let styles = {
  optionTxtStyle: { fontFamily: 'Regular' },
  titleStyle: { fontFamily: 'Bold' },
  detailStyle: { fontFamily: 'RegularItalic' },
};

export default () => {
  let scheme = useColorScheme();

  return (
    <Wrap scheme={scheme}>
      <Inner source={pattern}>
        <Header
          detail={'Typing..'}
          title={'SendErrand'}
          titleStyle={styles.titleStyle}
          detailStyle={styles.detailStyle}
          optionTxtStyle={styles.optionTxtStyle}
          rightIcon={
            <Dot
              name={'dots-three-vertical'}
              color={Helper.getColor().primaryTxt}
            />
          }
          options={['Errand History', 'Saved Locations', 'Profile', 'FAQs']}
        />
        <Avoid behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <Footer
            fontFamily={family}
            onError={(message) => Alert.alert('Failed', message)}
            onSelectOption={(index) => console.log(index)}
            sendIcon={<SendIcon name={'send'} />}
            audioIcon={<AudioIcon name={'mic-outline'} />}
            recordIcon={
              <AudioIcon
                name={'mic-outline'}
                color={helper.getColor().primaryTxt}
              />
            }
            leftIcon={
              <PlusIcon
                name={'plus'}
                color={scheme === 'dark' ? '#fff' : '#6A6A6A'}
              />
            }
          />
          {/*<Footer*/}
          {/*  runner*/}
          {/*  fontFamily={family}*/}
          {/*  onError={(message) => Alert.alert('Failed', message)}*/}
          {/*  clipIcon={<Clip name={'paperclip'} />}*/}
          {/*  sendIcon={<SendIcon name={'send'} />}*/}
          {/*  onSelectOption={(index) => console.log(index)}*/}
          {/*  audioIcon={<AudioIcon name={'mic-outline'} />}*/}
          {/*  leftIcon={*/}
          {/*    <AudioIcon*/}
          {/*      name={'location-outline'}*/}
          {/*      color={scheme === 'dark' ? '#fff' : '#6A6A6A'}*/}
          {/*    />*/}
          {/*  }*/}
          {/*  recordIcon={*/}
          {/*    <AudioIcon*/}
          {/*      name={'mic-outline'}*/}
          {/*      color={helper.getColor().primaryTxt}*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
        </Avoid>
      </Inner>
    </Wrap>
  );
};

const family = {
  light: 'Light',
  regular: 'Regular',
  bold: 'Bold',
  italic: 'RegularItalic',
};
