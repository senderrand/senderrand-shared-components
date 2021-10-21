import { Video } from 'expo-av';
import styled from 'styled-components';
import Helper from '../../config/helper';
import React, { useState } from 'react';
import ActionSheet from 'react-native-actionsheet';
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
  let [lang] = useState(props.lang ? props.lang : 'en');
  let [options] = useState(
    props.options && props.options.length
      ? [
          ...props.options,
          props.cancelTxt ? props.cancelTxt : Helper.t('cancel', lang),
        ]
      : [Helper.t('cancel', lang)]
  );

  let select = (index: number) => {
    props.onSelectOption && props.onSelectOption(index);
  };

  let sheet: any;
  return (
    <Wrap scheme={scheme}>
      <VidWrap
        onLongPress={() => sheet.show()}
        sender={props.sender && props.sender}
        height={vidHeight}
        background={
          props.sender
            ? Helper.getColor().chatBoxTwo
            : Helper.getColor().chatBoxOne
        }
      >
        {props.video ? (
          <Vid
            useNativeControls
            resizeMode={'contain'}
            style={{ height: vidHeight }}
            source={{ uri: props.video }}
            onReadyForDisplay={(response: any) => {
              let box = (70 / 100) * screenWidth;
              const { width, height } = response.naturalSize;
              const heightScaled = height * (box / width);
              setVidHeight(heightScaled - 6);
            }}
          />
        ) : null}
        <TickTime>
          <TimeTxt
            family={props.family && props.family}
            sender={props.sender && props.sender}
          >
            {props.date && typeof props.date === 'object'
              ? Helper.getDate(props.date)
              : props.date && props.date}
          </TimeTxt>
          {props.sender && (
            <TickIcon
              read={props.status && props.status === 3}
              name={
                props.status && props.status > 1
                  ? 'ios-checkmark-done'
                  : 'ios-checkmark'
              }
            />
          )}
        </TickTime>
      </VidWrap>
      <ActionSheet
        options={options}
        ref={(o: any) => (sheet = o)}
        cancelButtonIndex={options.length - 1}
        title={
          props.optionTitle ? props.optionTitle : Helper.t('options', lang)
        }
        onPress={(index: number) =>
          index !== options.length - 1 && select(index)
        }
      />
    </Wrap>
  );
};
