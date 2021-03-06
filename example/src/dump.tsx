import React, { useState } from 'react';
import { family } from './chat';
import styled from 'styled-components';
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import {
  Header2,
  LoadingModal,
  CustomModal,
  InvoiceModal, // @ts-ignore
} from 'senderrand-shared-components';

const Wrap = styled.View`
  flex: 1;
`;
const Inner = styled.View`
  padding: 20px;
`;
const Touch = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: cornflowerblue;
  width: 100%;
  height: 50px;
  border-radius: 6px;
  margin-bottom: 20px;
`;
const Txt = styled.Text`
  font-size: 15px;
  color: #fff;
`;
const TxtBlack = styled.Text`
  font-size: 15px;
  color: #000;
`;

export default (props: any) => {
  let [loading, setLoading] = useState(false);
  let [invoice, setInvoice] = useState(false);
  let [custom, setCustom] = useState(false);
  return (
    <Wrap>
      <Header2
        lang={'en'}
        entypo={Entypo}
        title={'Earnings'}
        family={family}
        back={() => props.navigation.goBack()}
        options={['One', 'Two']}
        materialIcons={MaterialIcons}
      />
      <Inner>
        <Touch onPress={() => setLoading(true)}>
          <Txt>Loading Modal</Txt>
        </Touch>
        <Touch onPress={() => setInvoice(true)}>
          <Txt>Invoice Modal</Txt>
        </Touch>
        <Touch onPress={() => setCustom(true)}>
          <Txt>Custom Modal</Txt>
        </Touch>
      </Inner>
      <CustomModal
        visible={custom}
        close={() => setCustom(false)}
        antdesign={AntDesign}
      >
        <TxtBlack>Hello You can put anything here really!</TxtBlack>
      </CustomModal>
      <LoadingModal
        lang={'en'}
        visible={loading}
        family={family}
        text={'Processing Payment..'}
        close={() => setLoading(false)}
      />
      <InvoiceModal
        lang={'en'}
        currency={'AED'}
        visible={invoice}
        family={family}
        totalItems={totals}
        items={dummyInvoice}
        grandTotal={610}
        txt2={"Runner's Name: YINKA"}
        txt3={'#12345673'}
        invoiceMessage={
          'The runner was unable to compute invoice but sent the total price as 610 AED.'
        }
        close={() => setInvoice(false)}
        press={(index: number) => console.log(index)}
      />
    </Wrap>
  );
};

let dummyInvoice = [
  {
    description: 'Brake pads for Honda accord 2009 Front and Rear',
    quantity: 1,
    rate: 200,
  },
  {
    description: 'Brake discs for Honda accord 2009. Front and Rear',
    quantity: 2,
    rate: 400,
  },
  {
    description: 'Brake Oil',
    quantity: 2,
    rate: 20,
  },
  {
    description: 'Errand cost',
    quantity: 1,
    rate: 100,
  },
];

let totals = [
  { name: 'SUBTOTAL', value: 720 },
  { name: 'DISCOUNT', value: 110, discount: '3%' },
];
