import React, { useState } from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants';
import Helper from '../../config/helper';
import { verticalScale } from 'react-native-size-matters';
import { StatusBar, Platform, useColorScheme } from 'react-native';

const blue = require('../../assets/media/blue.png');
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
  padding-left: 20px;
`;
const LeftBox = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
`;
const ImgBox = styled.Image`
  height: 33px;
  width: 33px;
  border-radius: 16.5px;
  margin-right: 9px;
`;
const TxtBox = styled.View`
  margin-top: -4px;
`;
const Title = styled.Text`
  font-size: 16px;
  color: ${(props: any) => props.color};
  font-family: ${(props: any) => (props.family ? props.family.bold : 'Bold')};
`;
const Detail = styled.Text`
  font-size: 11px;
  color: ${(props: any) => props.color};
  font-family: ${(props: any) =>
    props.family ? props.family.italic : 'RegularItalic'};
`;
const RightTouch = styled.TouchableOpacity`
  padding-right: 18px;
  height: 100%;
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

export default (props: any) => {
  let scheme = useColorScheme();
  let [visible, setVisible] = useState(false);

  let menuSelect = (index: number) => {
    setVisible(false);
    props.onSelectOption && props.onSelectOption(index);
  };

  const Dot = styled(props.entypo ? props.entypo : Icon)`
    color: ${(prop: any) => prop.color};
    font-size: 15px;
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
            <ImgBox source={props.image ? { uri: props.image } : blue} />
            <TxtBox>
              <Title
                family={props.family && props.family}
                color={Helper.getColor().primaryTxt}
                style={props.titleStyle ? props.titleStyle : {}}
              >
                {props.title ? props.title : ''}
              </Title>
              {props.detail ? (
                <Detail
                  family={props.family && props.family}
                  color={Helper.getColor().secondaryTxt}
                  style={props.detailStyle ? props.detailStyle : {}}
                >
                  {typeof props.detail === 'string' ? props.detail : ''}
                </Detail>
              ) : null}
            </TxtBox>
          </LeftBox>
          {props.options && props.options.length ? (
            <RightTouch onPress={() => setVisible(true)}>
              <Dot
                name={'dots-three-vertical'}
                color={Helper.getColor().primaryTxt}
              />
            </RightTouch>
          ) : null}
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
                    {typeof item === 'string' ? item : ''}
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

/*
 * Header Component Props
 * 1. containerStyle: style the header container
 * 2. image: the url of the header image (Default is SendErrand Logo)
 * 3. titleStyle:
 * */
