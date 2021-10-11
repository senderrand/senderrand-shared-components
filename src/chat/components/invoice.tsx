import React from 'react';
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
`;

export const InvoiceBox = (props: any) => {
  return (
    <Wrap>
      <Box onPress={props.press && props.press}>
        <Box1 background={Helper.getColor().plane}>
          <TitleWrap>
            <Title
              color={Helper.getColor().primaryTxt}
              family={props.fontFamily}
            >
              {props.txt1 ? props.txt1 : 'Invoice'}
            </Title>
            <InvoiceID
              color={Helper.getColor().chatBoxTwo}
              family={props.fontFamily}
            >
              {props.invoiceID && props.invoiceID}
            </InvoiceID>
          </TitleWrap>
          <TotalWrap>
            <InvoiceID
              color={Helper.getColor().chatBoxTwo}
              family={props.fontFamily}
            >
              {props.txt2 ? props.txt2 : 'Grand Total:'}
            </InvoiceID>
            <TotalTxt
              color={Helper.getColor().primaryTxt}
              family={props.fontFamily}
            >
              {props.price && props.price}
            </TotalTxt>
          </TotalWrap>
        </Box1>
        <Box2>
          <Box2Text family={props.fontFamily} color={'#fff'}>
            {props.txt3 ? props.txt3 : 'View Invoice'}
          </Box2Text>
        </Box2>
      </Box>
      <TimeTxt>
        {typeof props.date === 'object'
          ? Helper.getDate(props.date)
          : props.date}
      </TimeTxt>
    </Wrap>
  );
};