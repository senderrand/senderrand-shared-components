import { View, Txt } from '../styles';
import styled from 'styled-components';
import Helper from '../../config/helper';
import React, { useMemo, useState } from 'react';
import ZigzagLines from 'react-native-zigzag-lines';
import { currencyFormat } from '../../chat/functions';
import {
  useColorScheme,
  Dimensions,
  Animated,
  PanResponder,
  ActivityIndicator,
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
const InvoiceMessage = styled.Text`
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  font-size: 15px;
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
`;

export interface InvoiceItems {
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceTotalItems {
  name: string;
  discount?: string;
  value: number;
}

interface Props {
  lang?: string;
  visible: boolean;
  close: () => void;
  family: any;
  txt1?: string;
  txt2?: string;
  txt3?: string;
  titles?: string[];
  currency: string;
  items?: InvoiceItems[];
  totalItems: InvoiceTotalItems[];
  baseFare?: number;
  distanceFare?: number;
  timeFare?: number;
  paymentMethod?: 'cash' | 'card';
  grandTotal: number;
  grandTotalTxt?: string;
  press?: (index: number) => void;
  acceptTxt?: string;
  declineTxt?: string;
  loading?: boolean;
  invoiceMessage?: string;
}
export default (props: Props) => {
  let scheme = useColorScheme();
  let [lang] = useState(props.lang ? props.lang : 'en');
  let dummyTitles = [
    Helper.t('description', lang),
    Helper.t('rate', lang),
    Helper.t('qty', lang),
    Helper.t('subtotal', lang),
  ];

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
      transparent={true}
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
            {props.txt1 ? props.txt1 : Helper.t('received_invoice', lang)}
          </Txt>
          <Txt
            size={10}
            align={'center'}
            viewMargin={[0, 0, 0, 0]}
            color={Helper.getColor().chatBoxTwo}
            family={props.family && props.family.regular}
          >
            {props.txt2 ? props.txt2 : Helper.t('runner', lang)}
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
            {props.items && props.items.length ? (
              <View width={'100%'} direct={'row'} justify={'space-between'}>
                <TitleRow
                  family={props.family && props.family}
                  titles={
                    props.titles && props.titles.length
                      ? props.titles
                      : dummyTitles
                  }
                />
              </View>
            ) : null}
            {props.items && props.items.length ? (
              props.items.map((item, index: number) => (
                <EachRow
                  key={index}
                  name={item.description}
                  quantity={item.quantity}
                  rate={`${props.currency} ${currencyFormat(
                    Number(item.rate)
                  )}`}
                  subtotal={`${currencyFormat(item.rate * item.quantity)} ${
                    props.currency
                  }`}
                />
              ))
            ) : (
              <InvoiceMessage
                family={props.family}
                color={Helper.getColor().secondaryTxt}
              >
                {props.invoiceMessage && props.invoiceMessage}
              </InvoiceMessage>
            )}
          </InvoiceWrap>
          {props.totalItems && props.totalItems.length ? (
            <InvoiceWrap>
              {props.totalItems.map((item, index: number) => (
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
                    family={props.family && props.family}
                    discount={item.discount && item.discount}
                    title={item.name ? item.name : 'Title'}
                    price={
                      item.value
                        ? `${currencyFormat(Number(item.value))} ${
                            props.currency
                          }`
                        : 'Value'
                    }
                  />
                </View>
              ))}
            </InvoiceWrap>
          ) : null}
          {props.paymentMethod ? (
            <InvoiceWrap>
              <Txt
                size={15}
                viewMargin={[0, 0, 3, 0]}
                color={Helper.getColor().primaryTxt}
                family={props.family && props.family.bold}
              >
                {Helper.t('payment_method', lang)}
              </Txt>
              <Txt
                size={10}
                viewMargin={[0, 0, 3, 0]}
                color={Helper.getColor().primaryTxt}
                family={props.family && props.family.regular}
              >
                {props.paymentMethod.toUpperCase()}
              </Txt>
            </InvoiceWrap>
          ) : null}
          <InvoiceWrap>
            <GrandTotal
              currency={props.currency}
              lang={props.lang && props.lang}
              family={props.family && props.family}
              grandTotal={
                props.baseFare &&
                `${currencyFormat(Number(props.baseFare || 0))} ${
                  props.currency
                }`
              }
              grandTotalTxt={Helper.t('base_fare', lang)}
            />
            <GrandTotal
              currency={props.currency}
              lang={props.lang && props.lang}
              family={props.family && props.family}
              grandTotal={
                props.distanceFare &&
                `${currencyFormat(Number(props?.distanceFare || 0))} ${
                  props.currency
                }`
              }
              grandTotalTxt={Helper.t('distance_fare', lang)}
            />
            <GrandTotal
              currency={props.currency}
              lang={props.lang && props.lang}
              family={props.family && props.family}
              grandTotal={
                props.timeFare &&
                `${currencyFormat(Number(props.timeFare || 0))} ${
                  props.currency
                }`
              }
              grandTotalTxt={Helper.t('time_fare', lang)}
            />
            <GrandTotal
              currency={props.currency}
              lang={props.lang && props.lang}
              family={props.family && props.family}
              isTotal={true}
              grandTotal={
                props.grandTotal &&
                `${currencyFormat(Number(props.grandTotal || 0))} ${
                  props.currency
                }`
              }
              grandTotalTxt={props.grandTotalTxt && props.grandTotalTxt}
            />
          </InvoiceWrap>
          <InvoiceWrap borderless>
            {props.press ? (
              <CTA
                press={props.press}
                loading={props.loading}
                lang={props.lang && props.lang}
                family={props.family && props.family}
                acceptTxt={props.acceptTxt && props.acceptTxt}
                declineTxt={props.declineTxt && props.declineTxt}
              />
            ) : (
              <Btn blue onPress={props.close}>
                <BtnTxt family={props.family && props.family} blue>
                  {Helper.t('close', lang)}
                </BtnTxt>
              </Btn>
            )}
          </InvoiceWrap>
          <ZigzagLines
            position={'bottom'}
            width={zagWidth}
            backgroundColor={scheme === 'dark' ? '#212124' : '#ccc'}
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
    direct={'row'}
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
    direct={'row'}
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
    direct={'row'}
    justify={'space-between'}
  >
    <View direct={'row'} align={'center'}>
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

let GrandTotal = (props: any) => {
  let [lang] = useState(props.lang ? props.lang : 'en');
  return (
    <View align={'center'} direct={'row'} justify={'space-between'}>
      <Txt
        size={12}
        color={props.isTotal ? '#FD5710' : Helper.getColor().primaryTxt}
        family={
          props.family && props.family.medium ? props.family.medium : 'Medium'
        }
      >
        {props.grandTotalTxt
          ? props.grandTotalTxt
          : Helper.t('grand_total2', lang)}
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
};

let CTA = (props: any) => {
  let [lang] = useState(props.lang ? props.lang : 'en');
  return (
    <View direct={'row'} align={'center'} justify={'space-between'}>
      <Btn blue onPress={() => !props.loading && props.press && props.press(1)}>
        {props.loading ? (
          <ActivityIndicator color={'#fff'} size={'small'} />
        ) : (
          <BtnTxt family={props.family && props.family} blue>
            {props.acceptTxt ? props.acceptTxt : Helper.t('accept', lang)}
          </BtnTxt>
        )}
      </Btn>
      <Btn onPress={() => !props.loading && props.press && props.press(2)}>
        {props.loading ? (
          <ActivityIndicator
            color={Helper.getColor().primaryTxt}
            size={'small'}
          />
        ) : (
          <BtnTxt family={props.family && props.family}>
            {props.declineTxt ? props.declineTxt : Helper.t('decline', lang)}
          </BtnTxt>
        )}
      </Btn>
    </View>
  );
};
