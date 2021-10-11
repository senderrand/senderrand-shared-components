import React, { useState } from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants';
import Helper from '../config/helper';
import { verticalScale } from 'react-native-size-matters';
import { StatusBar, Platform, useColorScheme } from 'react-native';

const statusBar = Constants.statusBarHeight;
const Outer = styled.View``;
const Wrap = styled.View`
  background-color: ${(props: any) => props.background};
  border-bottom-color: ${(props: any) =>
    props.scheme === 'dark' ? 'rgb(51,50,54)' : 'rgba(173,172,170, 0.6)'};
  border-bottom-width: 0.2px;
  width: 100%;
`;
const StatusWrap = styled.View`
  height: ${statusBar - 10}px;
  width: 100%;
`;
const Head = styled.View`
  height: ${statusBar > 40
    ? verticalScale(40)
    : verticalScale(Platform.OS === 'android' ? 55 : 45)}px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const LeftBox = styled.View`
  height: 100%;
  min-width: 25%;
`;
const RightBox = styled.View`
  height: 100%;
  min-width: 25%;
`;
const LeftBtn = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  padding-left: 20px;
`;
const RightTouch = styled.TouchableOpacity`
  padding-right: 18px;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`;
const Modal = styled.Modal`
  flex: 1;
`;
const Inner = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.17);
  align-items: flex-end;
  padding: 50px 14px;
`;
const MenuWrap = styled.View`
  border-radius: 10px;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  width: 153px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.25);
  shadow-offset: 2px 2px;
`;
const EachMenu = styled.TouchableOpacity`
  height: 47px;
  width: 100%;
  padding: 0 17px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const MenuTxt = styled.Text`
  width: 100%;
  font-size: 14px;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  font-family: ${(props: any) =>
    props.family ? props.family.regular : 'Regular'};
`;
const List = styled.FlatList``;
const Icon = styled.Text``;
const CenterTitle = styled.Text`
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  font-family: ${(props: any) =>
    props.family ? props.family.medium : 'Medium'};
  font-size: 20px;
  text-align: center;
`;

export default (props: any) => {
  let scheme = useColorScheme();
  let [visible, setVisible] = useState(false);

  let menuSelect = (index: number) => {
    setVisible(false);
    props.onPressOption && props.onPressOption(index);
  };

  const Dot = styled(props.entypo ? props.entypo : Icon)`
    color: ${(prop: any) => prop.color};
    font-size: 15px;
    margin-top: 4px;
  `;

  const BackIcon = styled(props.materialIcons ? props.materialIcons : Icon)`
    color: ${(prop: any) =>
      prop.color ? prop.color : Helper.getColor().primaryTxt};
    font-size: 22px;
    margin-top: 4px;
  `;

  return (
    <Outer>
      <Wrap
        style={props.containerStyle ? props.containerStyle : {}}
        background={Helper.getColor().plane}
        scheme={scheme}
      >
        <StatusBar
          barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
        />
        {Platform.OS === 'android' ? null : <StatusWrap />}
        <Head>
          <LeftBox>
            {props.left ? (
              props.left
            ) : props.back ? (
              <LeftBtn onPress={props.back && props.back}>
                <BackIcon name={'keyboard-backspace'} />
              </LeftBtn>
            ) : null}
          </LeftBox>
          <CenterTitle family={props.family && props.family}>
            {props.title && props.title}
          </CenterTitle>
          <RightBox>
            {props.right
              ? props.right
              : props.options
              ? props.options.length && (
                  <RightTouch onPress={() => setVisible(true)}>
                    <Dot
                      name={'dots-three-vertical'}
                      color={Helper.getColor().primaryTxt}
                    />
                  </RightTouch>
                )
              : null}
          </RightBox>
        </Head>
      </Wrap>
      <Modal
        visible={visible}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => console.log()}
      >
        <Inner activeOpacity={1} onPress={() => setVisible(false)}>
          <MenuWrap>
            <List
              data={props.options ? props.options : []}
              keyExtractor={(_item: any, index: number) => index.toString()}
              renderItem={({ item, index }: any) => (
                <EachMenu onPress={() => menuSelect(index)}>
                  <MenuTxt
                    family={props.family && props.family}
                    style={props.optionTxtStyle ? props.optionTxtStyle : {}}
                    color={scheme === 'dark' ? '#fff' : '#184859'}
                  >
                    {item}
                  </MenuTxt>
                </EachMenu>
              )}
            />
          </MenuWrap>
        </Inner>
      </Modal>
    </Outer>
  );
};
