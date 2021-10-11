import { Video } from 'expo-av';
import styled from 'styled-components';
import Helper from '../../config/helper';
import React, { useState } from 'react';
import { Animated, Dimensions, useColorScheme } from 'react-native';

const Wrap = styled(Animated.View)`
  width: 70%;
`;
const TickTime = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 6px;
  right: 6px;
`;
const TimeTxt = styled.Text`
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  color: ${(props: any) => (props.sender ? '#fff' : 'rgb(176,191,162)')};
  font-size: 10px;
`;
const VidWrap = styled.View`
  width: 100%;
  padding: 3px 4px;
  background-color: ${(props: any) => props.background};
  border-radius: 4px;
  height: ${(props: any) => props.height + 6}px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 2px 2px;
`;
const Vid = styled(Video)`
  border-radius: 4px;
  width: 100%;
`;
const Icon = styled.Text``;

let screenWidth = Dimensions.get('window').width - 36;
export default (props: any) => {
  const TickIcon = styled(props.ionicons ? props.ionicons : Icon)`
    color: ${(prop: any) => (prop.read ? '#37ff00' : '#FFFDD0')};
    margin-left: 1px;
  `;

  let scheme = useColorScheme();
  let [vidHeight, setVidHeight] = useState(210.9375);

  return (
    <Wrap scheme={scheme}>
      <VidWrap
        sender={props.sender}
        height={vidHeight}
        background={
          props.sender
            ? Helper.getColor().chatBoxTwo
            : Helper.getColor().chatBoxOne
        }
      >
        <Vid
          useNativeControls
          resizeMode={'contain'}
          style={{ height: vidHeight }}
          source={{ uri: props.video }}
          onReadyForDisplay={(response: any) => {
            let box = (70 / 100) * screenWidth;
            const { width, height } = response.naturalSize;
            const heightScaled = height * (box / width);
            setVidHeight(heightScaled);
          }}
        />
        <TickTime>
          <TimeTxt family={props.family && props.family} sender={props.sender}>
            {typeof props.date === 'object'
              ? Helper.getDate(props.date)
              : props.date}
          </TimeTxt>
          {props.sender && (
            <TickIcon
              read={props.status === 3}
              name={props.status > 1 ? 'ios-checkmark-done' : 'ios-checkmark'}
            />
          )}
        </TickTime>
      </VidWrap>
    </Wrap>
  );
};
