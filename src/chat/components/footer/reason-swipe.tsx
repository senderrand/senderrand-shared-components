import React, { useState } from 'react';
import styled from 'styled-components';
import Helper from '../../../config/helper';
import SwipeUp from '../../../common/modals/swipe-up';
import { useColorScheme } from 'react-native';

const ItemWrap = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  padding: 0 24px;
  border-bottom-color: rgba(119, 134, 158, 0.297312);
  border-bottom-width: 0.5px;
  justify-content: center;
`;
const ItemTxt = styled.Text`
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  font-size: 14px;
`;
const List = styled.FlatList``;
let FootWrap = styled.View`
  padding: 15px 24px 10px 24px;
`;
const OthersTxt = styled.Text`
  font-size: 12px;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().secondaryTxt};
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  margin-bottom: 4px;
`;
const InputWrap = styled.View`
  min-height: 35px;
  width: 100%;
  border-radius: 100px;
  border: 0.5px solid rgba(119, 134, 158, 0.297312);
  flex-direction: row;
  align-items: flex-end;
  padding: 0 10px;
`;
const Input = styled.TextInput`
  height: 100%;
  width: 90%;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().secondaryTxt};
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
`;
const SendTouch = styled.TouchableOpacity`
  height: 35px;
  width: 10%;
  justify-content: center;
  align-items: flex-end;
`;
const Icon = styled.Text``;

const EachItem = (props: any) => (
  <ItemWrap onPress={props.press && props.press}>
    <ItemTxt
      color={Helper.getColor().primaryTxt}
      family={props.family && props.family}
    >
      {props.text && props.text}
    </ItemTxt>
  </ItemWrap>
);

const Footer = (props: any) => {
  const SendIcon = styled(props.ionicons ? props.ionicons : Icon)`
    color: ${Helper.getColor().chatBoxTwo};
    font-size: 18px;
  `;

  let [value, setValue] = useState('');
  let [lang] = useState(props.lang ? props.lang : 'en');

  return (
    <FootWrap>
      <OthersTxt
        family={props.family && props.family}
        color={Helper.getColor().secondaryTxt}
      >
        {props.othersTxt ? props.othersTxt : Helper.t('others_colon', lang)}
      </OthersTxt>
      <InputWrap>
        <Input value={value} onChangeText={(val: string) => setValue(val)} />
        <SendTouch onPress={() => value !== '' && props.send(value)}>
          <SendIcon name={'send'} />
        </SendTouch>
      </InputWrap>
    </FootWrap>
  );
};

let keyExtractor = (_item: any, index: number) => index.toString();
export default (props: any) => {
  let scheme = useColorScheme();
  return (
    <SwipeUp
      avoid
      lang={props.lang && props.lang}
      containerStyle={containerStyle}
      containerHeight={
        props.data && props.data.length ? props.data.length * 50 + 100 : 200
      }
    >
      <List
        scheme={scheme}
        data={props.data && props.data.length ? props.data : []}
        keyExtractor={keyExtractor}
        keyboardDismissMode={'on-drag'}
        keyboardShouldPersistTaps={'always'}
        renderItem={({ item }: any) => (
          <EachItem
            press={() => {
              props.onSelect && props.onSelect(item);
            }}
            lang={props.lang && props.lang}
            text={item[props.textKey] ? item[props.textKey] : ''}
            family={props.family && props.family}
          />
        )}
        ListFooterComponent={
          <Footer
            lang={props.lang && props.lang}
            send={props.onSend && props.onSend}
            family={props.family && props.family}
            ionicons={props.ionicons && props.ionicons}
            othersTxt={props.othersTxt && props.othersTxt}
          />
        }
      />
    </SwipeUp>
  );
};

let containerStyle = {
  borderColor: 'rgba(119, 134, 158, 0.297312)',
  borderLeftWidth: 0.3,
  borderRightWidth: 0.3,
  borderTopWidth: 0.3,
  left: 20,
  right: 20,
  shadowColor: 'rgba(0,0,0,0.4)',
};
