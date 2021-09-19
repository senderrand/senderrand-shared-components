import React from 'react';
import styled from 'styled-components';
import { ActivityIndicator } from 'react-native';
import { verticalScale, moderateScale } from 'react-native-size-matters';

const Wrap = styled.TouchableOpacity`
  width: 100%;
  height: ${verticalScale(50) + 'px'};
  background-color: ${(props: any) =>
    props.background ? props.background : '#3BAFDA'};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${(props: any) => (props.disabled ? '0.4' : '1')};
  shadow-opacity: ${(props: any) => (props.shadow ? '1.0' : '0')};
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: ${(props: any) => (props.shadow ? '5px' : '0px')}
    ${(props: any) => (props.shadow ? '5px' : '0px')};
`;

const Txt = styled.Text.attrs((props: any) => {
  let style = {};
  if (props.family && props.family.Medium)
    style = { ...style, fontFamily: props.family.Medium };
  return style;
})`
  font-family: ${(props: any) =>
    props.family && props.family.Medium ? props.family.medium : 'Medium'};
  font-size: ${moderateScale(16) + 'px'};
  color: ${(props: any) => (props.color ? props.color : '#fff')};
  letter-spacing: 1px;
`;

export default (props: any) => (
  <Wrap
    background={props.background}
    shadow={props.shadow}
    onPress={props.loading ? null : props.press}
    disabled={props.disabled}
    family={props.fontFamily}
  >
    {props.loading ? (
      <ActivityIndicator
        size={'small'}
        color={props.color ? props.color : '#4299E8'}
      />
    ) : (
      <Txt color={props.color} family={props.fontFamily}>
        {props.title}
      </Txt>
    )}
  </Wrap>
);
