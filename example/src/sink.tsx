import React, { useState } from 'react';
import styled from 'styled-components';
import { family } from './chat';
// @ts-ignore
import { SuccessModal, SuccessModal2 } from 'senderrand-shared-components';
import { Entypo } from '@expo/vector-icons';

const Wrap = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
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

export default (props: any) => {
  let [success1, setSuccess1] = useState(false);
  let [success2, setSuccess2] = useState(false);

  return (
    <Wrap>
      <Touch onPress={() => props.navigation.navigate('Chat')}>
        <Txt>Chat</Txt>
      </Touch>
      <Touch onPress={() => setSuccess1(true)}>
        <Txt>Success Modal</Txt>
      </Touch>
      <Touch onPress={() => setSuccess2(true)}>
        <Txt>Success Modal 2</Txt>
      </Touch>
      <SuccessModal
        fontFamily={family}
        visible={success1}
        title={'Congratulations'}
        close={() => setSuccess1(false)}
        btnTitle={'Order Kits'}
        entypo={Entypo}
        content={
          'We are exited to have you join our team! Next, you have to order your official Send Errand Kits'
        }
      />
      <SuccessModal2
        entypo={Entypo}
        fontFamily={family}
        visible={success2}
        text={'Verified Successfully'}
        press={() => setSuccess2(false)}
        btnTitle={'Continue'}
      />
    </Wrap>
  );
};
