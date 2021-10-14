import React, { useMemo } from 'react';
import styled from 'styled-components';
import Helper from '../../config/helper';
import { Txt } from '../styles';
import Image from 'react-native-remote-svg';
import { Animated, PanResponder, useColorScheme } from 'react-native';

const Modal = styled.Modal``;
const WrapTouch = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.17);
  padding: 10px 0;
  align-items: center;
  justify-content: center;
`;
const Inner = styled(Animated.View)`
  width: 70%;
  height: 327.92px;
  align-items: center;
  justify-content: center;
  border-radius: 16.6879px;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
`;

export default (props: any) => {
  let scheme = useColorScheme();

  let dummyPanHandler = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (_evt: any, _gestureState: any) => true,
        onPanResponderMove: (_evt: any, _gestureState: any) => {},
        onPanResponderRelease: (_event: any, _gestureState: any) => {},
      }),
    []
  );

  return (
    <Modal
      transparent={'true'}
      visible={props.visible}
      animationType={'slide'}
      onRequestClose={() => {}}
    >
      <WrapTouch
        scheme={scheme}
        activeOpacity={1.0}
        onPress={props.close && props.close}
      >
        <Inner
          {...dummyPanHandler.panHandlers}
          background={Helper.getColor().plane}
        >
          <Image source={require('../../assets/media/Spinner.svg')} />
          <Txt
            size={15}
            align={'center'}
            viewMargin={[25, 0, 0, 0]}
            color={Helper.getColor().primaryTxt}
            family={props.family && props.family.bold}
          >
            {props.text && props.text}
          </Txt>
        </Inner>
      </WrapTouch>
    </Modal>
  );
};
