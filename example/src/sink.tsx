import React, { useState } from 'react';
import styled from 'styled-components';
import { family } from './chat';
// @ts-ignore
import { SuccessModal } from 'senderrand-shared-components';
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
const Check = styled(Entypo)`
  color: #e0faff;
  font-size: 30px;
`;

export default (props: any) => {
  let [success1, setSuccess1] = useState(false);

  return (
    <Wrap>
      <Touch onPress={() => props.navigation.navigate('Chat')}>
        <Txt>Chat</Txt>
      </Touch>
      <Touch onPress={() => setSuccess1(true)}>
        <Txt>Success Modal</Txt>
      </Touch>
      <SuccessModal
        fontFamily={family}
        visible={success1}
        title={'Congratulations'}
        close={() => setSuccess1(false)}
        btnTitle={'Order Kits'}
        checkIcon={<Check name={'check'} />}
        content={
          'We are exited to have you join our team! Next, you have to order your official Send Errand Kits'
        }
      />
    </Wrap>
  );
};
