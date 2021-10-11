import React from 'react';
import styled from 'styled-components';
import Helper from '../../config/helper';
import MapView, { Marker } from 'react-native-maps';
import Fleetless from '../../common/svg/fleetless';

const Wrap = styled.View``;
const Box = styled.TouchableOpacity`
  width: 190px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 2px 2px;
  height: 176px;
`;
const Box1 = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  border-radius: 10px;
  overflow: hidden;
`;
const Box2 = styled.View`
  height: 30%;
  width: 100%;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().chatBoxTwo};
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
const Box2Text = styled.Text`
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().plane};
  font-size: 14px;
  font-family: ${(props: any) =>
    props.family && props.family.medium ? props.family.medium : 'Medium'};
`;
const TimeTxt = styled.Text`
  margin-top: 4px;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().secondaryTxt};
  font-size: 12px;
  font-family: ${(props: any) =>
    props.family && props.family.medium ? props.family.light : 'Light'};
`;
const Map = styled(MapView)`
  width: 100%;
  height: 85%;
`;

export default (props: any) => {
  return (
    <Wrap>
      <Box onPress={props.press && props.press}>
        <Box1>
          {props.region && props.position ? (
            <Map
              region={
                props.region.latitudeDelta
                  ? props.region
                  : {
                      ...props.region,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }
              }
            >
              <Marker coordinate={props.position}>
                <Fleetless />
              </Marker>
            </Map>
          ) : null}
          <Box2>
            <Box2Text family={props.fontFamily} color={'#fff'}>
              {props.text ? props.text : 'Track Delivery'}
            </Box2Text>
          </Box2>
        </Box1>
      </Box>
      <TimeTxt>
        {typeof props.date === 'object'
          ? Helper.getDate(props.date)
          : props.date}
      </TimeTxt>
    </Wrap>
  );
};
