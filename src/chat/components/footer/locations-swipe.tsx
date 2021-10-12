import styled from 'styled-components';
import Helper from '../../../config/helper';
import React, { useEffect, useState } from 'react';
import SwipeUp from '../../../common/modals/swipe-up';
import { Dimensions, Keyboard, LayoutAnimation } from 'react-native';

let containerHeight = Dimensions.get('window').height / 3;
const ItemWrap = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  padding: 0 24px;
  border-bottom-color: rgba(119, 134, 158, 0.297312);
  border-bottom-width: ${(props: any) => (props.borderless ? '0px' : '0.5px')};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const LeftItem = styled.View`
  width: 85%;
`;
const RightItem = styled.View`
  width: 15%;
  align-items: flex-end;
`;
const Address = styled.Text`
  width: 100%;
  font-size: 14px;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
`;
const TimingWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
`;
const StatusTxt = styled.Text`
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primary};
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  font-size: 14px;
  margin-right: 3px;
`;
const TimingTxt = styled.Text`
  font-size: 14px;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().secondaryTxt};
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  margin-top: ${(props: any) => (props.space ? '2px' : '0px')};
`;
const List = styled.FlatList`
  max-height: ${containerHeight - 40}px;
`;
const HeadWrap = styled.View`
  height: 40px;
  padding: 0 24px 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: rgba(119, 134, 158, 0.297312);
  border-bottom-width: 0.5px;
`;
const ChooseWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const ChooseTouch = styled.TouchableOpacity``;
const ChooseTxt = styled.Text`
  font-size: 14px;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().secondaryTxt};
  font-family: ${(props: any) =>
    props.family && props.family.medium ? props.family.medium : 'Medium'};
`;
const Icon = styled.Text``;

const EachItem = (props: any) => {
  const StoreIcon = styled(props.materialIcons ? props.materialIcons : Icon)`
    color: ${Helper.getColor().secondaryTxt};
    font-size: 18px;
  `;
  const PinIcon = styled(props.ionicons ? props.ionicons : Icon)`
    color: ${Helper.getColor().secondaryTxt};
    font-size: 18px;
  `;

  let [lang] = useState(props.lang ? props.lang : 'en');

  return (
    <ItemWrap
      onPress={props.press && props.press}
      borderless={props.borderless}
    >
      <LeftItem>
        <Address
          numberOfLines={1}
          ellipsizeMode={'tail'}
          family={props.family && props.family}
        >
          {props.address && props.address}
        </Address>
        <TimingWrap>
          {props.status ? (
            <StatusTxt
              family={props.family && props.family}
              color={
                props.status === 3
                  ? '#D41414'
                  : props.status === 2
                  ? '#FFB816'
                  : '#66CF4A'
              }
            >
              {props.status === 3
                ? Helper.t('closed', lang)
                : props.status === 2
                ? Helper.t('closing_soon', lang)
                : Helper.t('open', lang)}
            </StatusTxt>
          ) : null}
          <TimingTxt
            family={props.family && props.family}
            color={Helper.getColor().secondaryTxt}
          >
            {props.timing && props.timing}
          </TimingTxt>
        </TimingWrap>
      </LeftItem>
      <RightItem>
        {props.status ? (
          <StoreIcon name={'store-mall-directory'} />
        ) : (
          <PinIcon name={'ios-location-outline'} />
        )}
        <TimingTxt
          space
          family={props.family && props.family}
          color={Helper.getColor().secondaryTxt}
        >
          {props.distance && props.distance}
        </TimingTxt>
      </RightItem>
    </ItemWrap>
  );
};

let Header = (props: any) => {
  const LocationIcon = styled(props.ionicons ? props.ionicons : Icon)`
    color: ${Helper.getColor().chatBoxTwo};
    font-size: 18px;
    margin-right: 4px;
  `;
  let [lang] = useState(props.lang ? props.lang : 'en');

  return (
    <HeadWrap>
      <ChooseWrap onPress={props.onPressChoose && props.onPressChoose}>
        <LocationIcon name={'location'} />
        <ChooseTxt
          family={props.family && props.family}
          color={Helper.getColor().chatBoxTwo}
        >
          {props.chooseTxt ? props.chooseTxt : Helper.t('choose_map', lang)}
        </ChooseTxt>
      </ChooseWrap>
      <ChooseTouch onPress={props.onPressSaved && props.onPressSaved}>
        <ChooseTxt
          family={props.family && props.family}
          color={Helper.getColor().chatBoxTwo}
        >
          {props.savedTxt ? props.savedTxt : Helper.t('saved_locations', lang)}
        </ChooseTxt>
      </ChooseTouch>
    </HeadWrap>
  );
};

let keyExtractor = (_item: any, index: number) => index.toString();
export default (props: any) => {
  const [keyboard, setKeyboard] = useState(0);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', (e: any) => {
      setKeyboard(e.endCoordinates.height);
      LayoutAnimation.linear();
    });
    Keyboard.addListener('keyboardWillHide', () => setKeyboard(0));

    return () => {
      Keyboard.removeListener('keyboardWillShow', (e: any) => {
        setKeyboard(e.endCoordinates.height);
        LayoutAnimation.linear();
      });
      Keyboard.addListener('keyboardWillHide', () => setKeyboard(0));
    };
  }, []);

  return (
    <SwipeUp
      lang={props.lang && props.lang}
      disableSwipe
      containerStyle={keyboard ? containerStyle2(keyboard) : containerStyle}
      containerHeight={containerHeight}
    >
      <Header
        lang={props.lang && props.lang}
        family={props.family && props.family}
        ionicons={props.ionicons && props.ionicons}
      />
      <List
        keyboard={keyboard}
        showsVerticalScrollIndicator={false}
        data={props.data && props.data.length ? props.data : []}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps={'always'}
        renderItem={({ item, index }: any) => (
          <EachItem
            lang={props.lang && props.lang}
            borderless={props.data && props.data.length - 1 === index}
            press={() => {
              props.onSelect && props.onSelect(item);
            }}
            materialIcons={props.materialIcons && props.materialIcons}
            ionicons={props.ionicons && props.ionicons}
            address={item.address && item.address}
            timing={item.timing && item.timing}
            distance={item.distance && item.distance}
            status={item.status && item.status}
            family={props.family && props.family}
          />
        )}
      />
    </SwipeUp>
  );
};

let containerStyle = {
  borderColor: 'rgba(119, 134, 158, 0.297312)',
  borderLeftWidth: 0.3,
  borderRightWidth: 0.3,
  borderTopWidth: 0.3,
  shadowColor: 'rgba(0,0,0,0.0)',
  bottom: 66,
};

let containerStyle2 = (height: number) => {
  return { ...containerStyle, bottom: height + 47 };
};
