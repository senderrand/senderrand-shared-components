import React from 'react';
import styled from 'styled-components';

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

export default (props: any) => (
  <Wrap>
    <Touch onPress={() => props.navigation.navigate('Chat')}>
      <Txt>Chat</Txt>
    </Touch>
    <Touch>
      <Txt>Success Modal</Txt>
    </Touch>
  </Wrap>
);
