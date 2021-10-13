import React from 'react';
import TextBox from './text-box';
import styled from 'styled-components';
import Helper from '../../config/helper';
import { ActivityIndicator } from 'react-native';

const OptionsWrap = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px 30px 20px;
`;
const Btn = styled.TouchableOpacity`
  min-width: 149.06px;
  height: 38.65px;
  border: 1.10417px solid
    ${(props: any) =>
      props.blue ? Helper.getColor().chatBoxTwo : Helper.getColor().primaryTxt};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props: any) =>
    props.blue ? Helper.getColor().chatBoxTwo : 'transparent'};
  border-radius: 33.125px;
`;
const BtnTxt = styled.Text`
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  font-size: 14px;
  color: ${(props: any) =>
    props.blue ? '#fff' : Helper.getColor().primaryTxt};
`;

export const FooterOptions = (props: any) => (
  <OptionsWrap>
    {props.options && props.options.length
      ? props.options.map((item: any, index: number) => (
          <Btn
            key={index}
            blue={index === 0}
            onPress={() => props.press && props.press(index)}
          >
            <BtnTxt family={props.family && props.family} blue={index === 0}>
              {item.title && item.title}
            </BtnTxt>
          </Btn>
        ))
      : null}
  </OptionsWrap>
);

const Wrap2 = styled.View`
  flex-direction: ${(props: any) => (props.sender ? 'row-reverse' : 'row')};
  align-items: center;
`;
const Icon = styled.Text``;

export const LocationBox = (props: any) => {
  const PinIcon = styled(props.entypo ? props.entypo : Icon)`
    color: #fd5710;
    font-size: 20px;
    margin-right: ${(prop: any) => (prop.sender ? '10px' : '0px')};
    margin-left: ${(prop: any) => (prop.sender ? '0px' : '10px')};
  `;
  const StoreIcon = styled(props.materialIcons ? props.materialIcons : Icon)`
    color: #fd5710;
    font-size: 20px;
    margin-right: ${(prop: any) => (prop.sender ? '10px' : '0px')};
    margin-left: ${(prop: any) => (prop.sender ? '0px' : '10px')};
  `;

  return (
    <Wrap2 sender={props.sender}>
      <TextBox {...props} />
      {props.location_type && props.location_type === 'store' ? (
        <StoreIcon name={'store-mall-directory'} sender={props.sender} />
      ) : (
        <PinIcon name={'location'} sender={props.sender} />
      )}
    </Wrap2>
  );
};

const StatWrap = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const StatTxt = styled.Text`
  font-size: ${(props: any) => (props.loading ? '14px' : '12px')};
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  color: ${(props: any) =>
    props.color
      ? props.color
      : props.loading
      ? Helper.getColor().primaryTxt
      : Helper.getColor().secondaryTxt};
`;
const Activity = styled(ActivityIndicator)`
  margin-right: 5px;
`;
export const StatusBox = (props: any) => (
  <StatWrap>
    {props.loading && <Activity color={'#3BAFDA'} />}
    <StatTxt
      family={props.family && props.family}
      loading={props.loading}
      color={props.color}
    >
      {props.text && props.text}
    </StatTxt>
  </StatWrap>
);
