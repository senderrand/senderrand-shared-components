import styled from 'styled-components';
import React, { useState, useMemo, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
} from 'react-native';
import Helper from '../../config/helper';

let screenHeight = Dimensions.get('window').height;
let modalHeight = screenHeight / 2;

const Content = styled(Animated.View)`
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: ${(props: any) =>
    props.newHeight ? props.newHeight + 'px' : modalHeight + 'px'};
  shadow-opacity: 1;
  shadow-color: #000;
  shadow-offset: 1px 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default (props: any) => {
  let [height, setHeight] = useState(
    props.containerHeight ? props.containerHeight : modalHeight
  );
  useEffect(
    () =>
      setHeight(props.containerHeight ? props.containerHeight : modalHeight),
    [props.containerHeight, props.visible]
  );

  let panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (_evt, _gestureState) => true,
        onPanResponderMove: (_evt, gestureState) => {
          let val = screenHeight - gestureState.moveY;
          if (val < 200) {
            props.close && props.close();
            props.close &&
              setHeight(
                props.containerHeight ? props.containerHeight : modalHeight
              );
          } else {
            setHeight(val);
            LayoutAnimation.spring();
          }
        },
        onPanResponderRelease: (_event, _gestureState) => {
          if (props.swipeable && height < 200) {
            props.close && props.close();
            setHeight(
              props.containerHeight ? props.containerHeight : modalHeight
            );
          }
        },
      }),
    [height, props]
  );

  return (
    <Content
      {...panResponder.panHandlers}
      style={props.containerStyle ? props.containerStyle : {}}
      newHeight={height}
    >
      {props.children && props.children}
    </Content>
  );
};
