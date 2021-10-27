import React from 'react';
import styled from 'styled-components';
import Helper from '../../config/helper';

const Wrap = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const Txt1 = styled.Text`
  text-align: center;
  font-size: 14px;
  margin-left: 4px;
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
`;
const ImgWrap = styled.TouchableOpacity`
  width: 110px;
  height: 110px;
  border: 2px solid ${Helper.getColor().chatBoxTwo};
  border-radius: 55px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;
const Img = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
const RunnerName = styled.Text`
  text-align: center;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  font-family: ${(props: any) =>
    props.family && props.family.bold ? props.family.bold : 'Bold'};
  margin: 5px 0;
`;
const RateWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default (props: any) => {
  return (
    <Wrap>
      <Txt1
        family={props.family && props.family}
        color={Helper.getColor().primaryTxt}
      >
        {props.text && props.text}
      </Txt1>
      <ImgWrap onPress={props.press && props.press}>
        <Img source={props.image && { uri: props.image }} />
      </ImgWrap>
      <RunnerName family={props.family && props.family}>
        {props.name && props.name}
      </RunnerName>
      <RateWrap>
        <Star antDesign={props.antDesign} rate={props.rate} />
        <Txt1 family={props.family && props.family}>
          {props.runs && props.runs}
        </Txt1>
      </RateWrap>
    </Wrap>
  );
};

const StarBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Icon = styled.Text``;

export const Star = (props: any) => {
  const StarIcon = styled(props.antDesign ? props.antDesign : Icon)`
    font-size: 12px;
    color: ${(prop: any) => (prop.active ? '#FFA873' : '#DBDBDB')};
    margin-right: 1px;
  `;

  return (
    <StarBox>
      <StarIcon
        name={props.rate > 0 ? 'star' : 'staro'}
        active={props.rate > 0}
      />
      <StarIcon
        name={props.rate > 1 ? 'star' : 'staro'}
        active={props.rate > 1}
      />
      <StarIcon
        name={props.rate > 2 ? 'star' : 'staro'}
        active={props.rate > 2}
      />
      <StarIcon
        name={props.rate > 3 ? 'star' : 'staro'}
        active={props.rate > 3}
      />
      <StarIcon
        name={props.rate > 4 ? 'star' : 'staro'}
        active={props.rate > 4}
      />
    </StarBox>
  );
};
