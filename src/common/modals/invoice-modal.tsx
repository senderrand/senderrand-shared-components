import React, { useMemo } from 'react';
import { View, Txt } from '../styles';
import styled from 'styled-components';
import Helper from '../../config/helper';
import ZigzagLines from 'react-native-zigzag-lines';
import {
  useColorScheme,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

let zagWidth = (80 / 100) * Dimensions.get('window').width;
const Modal = styled.Modal``;
const WrapTouch = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.17);
  padding: 10px 0;
  align-items: center;
  justify-content: center;
`;
const Inner = styled(Animated.View)`
  width: 80%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px 0 0 0;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
`;
const InvoiceWrap = styled.View`
  border-bottom-width: ${(props: any) => (props.borderless ? '0px' : '0.3px')};
  border-bottom-color: rgba(119, 134, 158, 0.297312);
  width: 100%;
  padding: 12px 25px 12px 25px;
`;
const TitleTxt = styled.Text`
  width: ${(props: any) => (props.width ? props.width : '20%')};
  font-size: 10px;
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().secondaryTxt};
  text-align: ${(props: any) => (props.align ? props.align : 'left')};
`;
const InvoiceTxt = styled.Text`
  width: ${(props: any) => (props.width ? props.width : '20%')};
  font-size: 9px;
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  background-color: ${(props: any) =>
    props.background ? props.background : 'transparent'};
  text-align: ${(props: any) => (props.align ? props.align : 'left')};
`;
const Btn = styled.TouchableOpacity`
  min-width: 120px;
  height: 32px;
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
  font-size: 12px;
  color: ${(props: any) =>
    props.blue ? '#fff' : Helper.getColor().primaryTxt};
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
        <Inner {...dummyPanHandler.panHandlers}>
          <Txt
            size={15}
            align={'center'}
            viewMargin={[0, 0, 3, 0]}
            color={Helper.getColor().primaryTxt}
            family={props.family && props.family.bold}
          >
            {props.txt1 ? props.txt1 : 'You’ve received an invoice'}
          </Txt>
          <Txt
            size={10}
            align={'center'}
            viewMargin={[0, 0, 0, 0]}
            color={Helper.getColor().chatBoxTwo}
            family={props.family && props.family.regular}
          >
            {props.txt2 ? props.txt2 : 'Runner'}
          </Txt>
          <Txt
            size={10}
            align={'center'}
            viewMargin={[0, 0, 3, 0]}
            color={Helper.getColor().chatBoxTwo}
            family={props.family && props.family.regular}
          >
            {props.txt3 ? props.txt3 : '#12345678'}
          </Txt>
          <InvoiceWrap>
            <View width={'100%'} direction={'row'} justify={'space-between'}>
              <TitleRow
                family={props.family && props.family}
                titles={
                  props.titles && props.titles.length
                    ? props.titles
                    : dummyTitles
                }
              />
            </View>
            {props.items &&
              props.items.length &&
              props.items.map((item: any, index: number) => (
                <EachRow
                  key={index}
                  name={
                    props.nameKey && item[props.nameKey]
                      ? item[props.nameKey]
                      : ''
                  }
                  quantity={
                    props.qtyKey && item[props.qtyKey] ? item[props.qtyKey] : ''
                  }
                  rate={
                    props.rateKey && item[props.rateKey]
                      ? `${props.currency ? props.currency : 'AED'} ${
                          item[props.rateKey]
                        }`
                      : ''
                  }
                  subtotal={
                    props.rateKey &&
                    props.qtyKey &&
                    item[props.rateKey] &&
                    item[props.qtyKey]
                      ? `${props.currency ? props.currency : 'AED'} ${
                          item[props.rateKey] * item[props.qtyKey]
                        }`
                      : ''
                  }
                />
              ))}
          </InvoiceWrap>
          <InvoiceWrap>
            {props.totalItems &&
              props.totalItems.length &&
              props.totalItems.map((item: any, index: number) => (
                <View
                  key={index}
                  viewMargin={[
                    0,
                    0,
                    index + 1 === props.totalItems.length ? 0 : 8,
                    0,
                  ]}
                >
                  <TotalItem
                    family={props.family}
                    discount={item.discount && item.discount}
                    title={item.title ? item.title : 'Title'}
                    price={item.value ? item.value : 'Value'}
                  />
                </View>
              ))}
          </InvoiceWrap>
          <InvoiceWrap>
            <GrandTotal
              family={props.family}
              grandTotal={props.grandTotal && props.grandTotal}
              grandTotalTxt={props.grandTotalTxt && props.grandTotalTxt}
            />
          </InvoiceWrap>
          <InvoiceWrap borderless>
            {props.press ? (
              <CTA
                family={props.family}
                press={props.press}
                acceptTxt={props.acceptTxt && props.acceptTxt}
                declineTxt={props.declineTxt && props.declineTxt}
              />
            ) : null}
          </InvoiceWrap>
          <ZigzagLines
            position={'bottom'}
            width={zagWidth}
            backgroundColor={'#ccc'}
            color={Helper.getColor().plane}
          />
        </Inner>
      </WrapTouch>
    </Modal>
  );
};

const TitleRow = (props: any) => (
  <View
    width={'100%'}
    align={'center'}
    direction={'row'}
    justify={'space-between'}
    viewMargin={[0, 0, 19, 0]}
  >
    {props.titles &&
      props.titles.length &&
      props.titles.map((item: string, index: number) => (
        <TitleTxt
          width={index !== 0 ? '20%' : '40%'}
          align={index !== 0 ? 'center' : 'left'}
          key={index}
          color={Helper.getColor().secondaryTxt}
          family={props.family && props.family}
        >
          {item}
        </TitleTxt>
      ))}
  </View>
);

const EachRow = (props: any) => (
  <View
    width={'100%'}
    align={'center'}
    direction={'row'}
    justify={'space-between'}
    viewMargin={[0, 0, 15, 0]}
  >
    <InvoiceTxt
      width={'40%'}
      multiline={true}
      color={Helper.getColor().primaryTxt}
      family={props.family && props.family}
    >
      {props.name && props.name}
    </InvoiceTxt>
    <InvoiceTxt
      align={'center'}
      multiline={true}
      color={Helper.getColor().primaryTxt}
      family={props.family && props.family}
    >
      {props.rate && props.rate}
    </InvoiceTxt>
    <InvoiceTxt
      align={'center'}
      multiline={true}
      color={Helper.getColor().primaryTxt}
      family={props.family && props.family}
    >
      {props.quantity && props.quantity}
    </InvoiceTxt>
    <InvoiceTxt
      align={'center'}
      multiline={true}
      color={Helper.getColor().primaryTxt}
      family={props.family && props.family}
    >
      {props.subtotal && props.subtotal}
    </InvoiceTxt>
  </View>
);

const TotalItem = (props: any) => (
  <View
    width={'100%'}
    align={'center'}
    direction={'row'}
    justify={'space-between'}
  >
    <View direction={'row'} align={'center'}>
      <Txt
        size={12}
        color={Helper.getColor().secondaryTxt}
        family={
          props.family && props.family.medium ? props.family.medium : 'Medium'
        }
      >
        {props.title && props.title}
      </Txt>
      {props.discount ? (
        <View
          pad={[2, 3, 2, 3]}
          radius={2}
          viewMargin={[0, 0, 0, 2]}
          background={Helper.getColor().primary}
        >
          <Txt
            color={'#fff'}
            size={7}
            family={
              props.family && props.family.medium
                ? props.family.medium
                : 'Medium'
            }
          >
            {props.discount && props.discount}
          </Txt>
        </View>
      ) : null}
    </View>
    <Txt
      size={12}
      color={Helper.getColor().secondaryTxt}
      family={
        props.family && props.family.medium ? props.family.medium : 'Medium'
      }
    >
      {props.price && props.price}
    </Txt>
  </View>
);

let GrandTotal = (props: any) => (
  <View align={'center'} direction={'row'} justify={'space-between'}>
    <Txt
      size={12}
      color={'#FD5710'}
      family={
        props.family && props.family.medium ? props.family.medium : 'Medium'
      }
    >
      {props.grandTotalTxt ? props.grandTotalTxt : 'GRAND TOTAL'}
    </Txt>
    <Txt
      size={12}
      color={Helper.getColor().secondaryTxt}
      family={
        props.family && props.family.medium ? props.family.medium : 'Medium'
      }
    >
      {props.grandTotal ? props.grandTotal : ''}
    </Txt>
  </View>
);

let CTA = (props: any) => (
  <View direction={'row'} align={'center'} justify={'space-between'}>
    <Btn blue onPress={() => props.press && props.press(1)}>
      <BtnTxt family={props.family} blue>
        {props.acceptTxt ? props.acceptTxt : 'Accept'}
      </BtnTxt>
    </Btn>
    <Btn onPress={() => props.press && props.press(2)}>
      <BtnTxt family={props.family}>
        {props.declineTxt ? props.declineTxt : 'Decline'}
      </BtnTxt>
    </Btn>
  </View>
);

let dummyTitles = ['DESCRIPTION', 'RATE', 'QTY', 'SUBTOTAL'];