import React, { useState } from 'react';
import styled from 'styled-components';
import Helper from '../../config/helper';

const Wrap = styled.View``;
const Box = styled.TouchableOpacity`
  width: 190px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 2px 2px;
`;
const Box1 = styled.View`
  padding: 10px 20px;
  width: 100%;
  border: 1px solid ${Helper.getColor().chatBoxTwo};
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const Box2 = styled.View`
  background-color: #66cf4a;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const Box2Text = styled.Text`
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().plane};
  font-size: 14px;
  font-family: ${(props: any) =>
    props.family && props.family.medium ? props.family.medium : 'Medium'};
`;
const TitleWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const Title = styled.Text`
  font-family: ${(props: any) =>
    props.family && props.family.medium ? props.family.medium : 'Medium'};
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  font-size: 20px;
`;
const InvoiceID = styled.Text`
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().chatBoxTwo};
  font-family: ${(props: any) =>
    props.family && props.family.medium ? props.family.regular : 'Regular'};
  font-size: 15px;
`;
const TotalWrap = styled.View``;
const TotalTxt = styled(Title)`
  font-size: 24px;
  margin-top: 3px;
`;
const TimeTxt = styled.Text`
  margin-top: 4px;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().secondaryTxt};
  font-size: 12px;
  font-family: ${(props: any) =>
    props.family && props.family.medium ? props.family.light : 'Light'};
  text-align: ${(props: any) => (props.sender ? 'right' : 'left')};
`;

export const InvoiceBox = (props: any) => {
  let [lang] = useState(props.lang ? props.lang : 'en');
  return (
    <Wrap>
      <Box onPress={props.press && props.press}>
        <Box1 background={Helper.getColor().plane}>
          <TitleWrap>
            <Title
              color={Helper.getColor().primaryTxt}
              family={props.family && props.family}
            >
              {props.txt1 ? props.txt1 : Helper.t('invoice', lang)}
            </Title>
            <InvoiceID
              color={Helper.getColor().chatBoxTwo}
              family={props.family && props.family}
            >
              {props.invoiceID && props.invoiceID}
            </InvoiceID>
          </TitleWrap>
          <TotalWrap>
            <InvoiceID
              color={Helper.getColor().chatBoxTwo}
              family={props.family && props.family}
            >
              {props.txt2 ? props.txt2 : Helper.t('grand_total', lang)}
            </InvoiceID>
            <TotalTxt
              color={Helper.getColor().primaryTxt}
              family={props.family && props.family}
            >
              {props.price && props.price}
            </TotalTxt>
          </TotalWrap>
        </Box1>
        <Box2>
          <Box2Text family={props.family && props.family} color={'#fff'}>
            {props.txt3 ? props.txt3 : Helper.t('view_invoice', lang)}
          </Box2Text>
        </Box2>
      </Box>
      <TimeTxt
        family={props.family && props.family}
        sender={props.sender && props.sender}
      >
        {props.date && typeof props.date === 'object'
          ? Helper.getDate(props.date)
          : props.date && typeof props.date === 'number'
          ? Helper.getDate(new Date(props.date))
          : props.date && props.date}
      </TimeTxt>
    </Wrap>
  );
};
