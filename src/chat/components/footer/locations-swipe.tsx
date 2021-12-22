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
const TimingTxt2 = styled(TimingTxt)`
  width: 100%;
  text-align: right;
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

  let [data, setData] = useState<any>({});

  let [lang] = useState(props.lang ? props.lang : 'en');

  useEffect(() => {
    getData().then();
    return () => setData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.address]);

  let getData = async () => {
    let result = await fetchGeometry(
      props.place_id && props.place_id,
      props.apiKey
    );
    let newCountry = props.country && props.country;
    result.address_components &&
      result.address_components.length &&
      result.address_components.map((item: any) => {
        if (
          item.types &&
          item.types.length &&
          item.types[0] === 'country' &&
          !props.country
        )
          newCountry = item.long_name;
      });
    let newData: any = {
      address: props.address && props.address,
      timing: result.name && result.name,
      latitude: result.geometry && getLatLng(result.geometry).latitude,
      longitude: result.geometry && getLatLng(result.geometry).longitude,
      country: newCountry,
    };
    if (result.opening_hours) {
      newData = {
        ...newData,
        status: result.opening_hours.open_now
          ? getClosing(result.opening_hours.weekday_text).status
          : 3,
        timing: getClosing(result.opening_hours.weekday_text).hours,
      };
    }
    setData(newData);
    if (props.userLocation) {
      let value = {
        origin: formatLocationPayload(props.userLocation),
        destination: formatLocationPayload(newData),
      };
      let geometry = await getDistance(value, props.apiKey);
      setData({ ...newData, ...geometry });
    }
  };

  return (
    <ItemWrap
      onPress={() => props.press && props.press(data)}
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
          {data.status ? (
            <StatusTxt
              family={props.family && props.family}
              color={
                data.status === 3
                  ? '#D41414'
                  : data.status === 2
                  ? '#FFB816'
                  : '#66CF4A'
              }
            >
              {data.status === 3
                ? Helper.t('closed', lang)
                : data.status === 2
                ? Helper.t('closing_soon', lang)
                : Helper.t('open', lang)}
            </StatusTxt>
          ) : null}
          <TimingTxt
            numberOfLines={1}
            ellipsizeMode={'tail'}
            family={props.family && props.family}
            color={Helper.getColor().secondaryTxt}
          >
            {data.timing && data.timing}
          </TimingTxt>
        </TimingWrap>
      </LeftItem>
      <RightItem>
        {data.status ? (
          <StoreIcon name={'store-mall-directory'} />
        ) : (
          <PinIcon name={'ios-location-outline'} />
        )}
        <TimingTxt2
          space
          family={props.family && props.family}
          color={Helper.getColor().secondaryTxt}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >
          {data.distance && data.distance}
        </TimingTxt2>
      </RightItem>
    </ItemWrap>
  );
};

let distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?`;
interface distanceData {
  origin: string;
  destination: string;
}
const getDistance = async (data: distanceData, ApiKey: string) => {
  let url = `origins=${data.origin}&destinations=${data.destination}&key=${ApiKey}`;
  return fetch(distanceUrl + url)
    .then((res) => res.json())
    .then((res) => {
      if (res.rows[0] && res.rows[0].elements[0]) {
        let distance = res.rows[0].elements[0].distance.text;
        let duration = res.rows[0].elements[0].duration.text;
        return { distance: duration, duration, km: distance };
      } else return {};
    })
    .catch(() => {
      return {};
    });
};

export const getClosing = (days: any[]) => {
  let status = 1;
  let today = new Date().getDay();
  let hours = days.length >= today && days[today];
  let split = hours && hours.split(': ', 2);
  let closingSplit = split && split[1].split(' – ', 2);
  let hour24 = convertTo24h(closingSplit[1]);
  if (hour24[0] === 0 && new Date().getHours() === 23) status = 2;
  else {
    let subtract = hour24[0] && hour24[0] - new Date().getHours();
    if (subtract === 1 || subtract === -1) status = 2;
  }
  return {
    hours: split && split.length >= 1 && split[1],
    status: status,
  };
};

let convertTo24h = (timeString: string) => {
  let time = timeString && timeString.match(/(\d+):(\d+) (\w)/);
  let hours = time && Number(time[1]);
  let minutes = time && Number(time[2]);
  let meridian = time && time[3].toLowerCase();

  if (meridian === 'p' && hours && hours < 12) hours += 12;
  else if (meridian === 'a' && hours === 12) hours -= 12;
  return [hours, minutes];
};

const googlePlaceApi =
  'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
let fetchGeometry = async (placeId: string, apiKey: string) => {
  return fetch(`${googlePlaceApi}${placeId}&key=${apiKey}`)
    .then((res) => res.json())
    .then((res) => res.result)
    .catch(() => {
      return {};
    });
};

let formatLocationPayload = (location: any) => {
  return `${location.latitude && location.latitude},${
    location.longitude && location.longitude
  }`;
};

let getLatLng = (geometry: any) => {
  return {
    latitude:
      geometry.location && geometry.location.lat && geometry.location.lat,
    longitude:
      geometry.location && geometry.location.lng && geometry.location.lng,
  };
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
    const showSubscription = Keyboard.addListener(
      'keyboardWillShow',
      (e: any) => {
        setKeyboard(e.endCoordinates.height);
        LayoutAnimation.linear();
      }
    );
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () =>
      setKeyboard(0)
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SwipeUp
      disableSwipe
      lang={props.lang && props.lang}
      containerHeight={containerHeight}
      containerStyle={keyboard ? containerStyle2(keyboard) : containerStyle}
    >
      <Header
        lang={props.lang && props.lang}
        family={props.family && props.family}
        ionicons={props.ionicons && props.ionicons}
        savedTxt={props.savedTxt && props.savedTxt}
        chooseTxt={props.chooseTxt && props.chooseTxt}
        onPressSaved={props.onPressSaved && props.onPressSaved}
        onPressChoose={props.onPressChoose && props.onPressChoose}
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
            press={props.onSelect && props.onSelect}
            materialIcons={props.materialIcons && props.materialIcons}
            ionicons={props.ionicons && props.ionicons}
            address={item.address && item.address}
            timing={item.timing && item.timing}
            distance={item.distance && item.distance}
            status={item.status && item.status}
            family={props.family && props.family}
            place_id={item.place_id && item.place_id}
            apiKey={props.apiKey && props.apiKey}
            userLocation={props.userLocation && props.userLocation}
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
