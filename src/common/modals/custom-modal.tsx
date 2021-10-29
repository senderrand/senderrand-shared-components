import React from 'react';
import styled from 'styled-components';
import Helper from '../../config/helper';
import { View } from '../styles';

const Modal = styled.Modal``;
const Icon = styled.Text``;

const IconWrapper = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  position: absolute;
  top: -70px;
  right: 0px;
  align-items: center;
  justify-content: center;
  background: rgba(24, 72, 89, 1);
`;

const StyledView = styled(View)`
  min-height: 350px;
`;

interface Props {
  children: React.ReactNode;
  antdesign: any;
  close: () => void;
  visible: boolean;
}

export default (props: Props) => {
  const CloseIcon = styled(props.antdesign ? props.antdesign : Icon)`
    color: #fff;
    font-size: 30px;
  `;
  return (
    <Modal
      transparent={'true'}
      visible={props.visible}
      animationType={'slide'}
      onRequestClose={() => {}}
    >
      <View
        flex={1}
        align={'center'}
        justify={'center'}
        background={'rgba(0, 0, 0, 0.17)'}
      >
        <StyledView
          width={'85%'}
          radius={16.6879}
          background={Helper.getColor().plane}
          pad={[20, 25, 20, 25]}
        >
          <IconWrapper onPress={props.close && props.close}>
            <CloseIcon name={'close'} />
          </IconWrapper>
          {props.children}
        </StyledView>
      </View>
    </Modal>
  );
};
