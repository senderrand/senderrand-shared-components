import React from 'react';
import styled from 'styled-components';
import Helper from '../../config/helper';
import { View, Txt } from '../styles';
import Image from 'react-native-remote-svg';
import { useColorScheme } from 'react-native';

const Modal = styled.Modal``;

export default (props: any) => {
  let scheme = useColorScheme();
  return (
    <Modal
      transparent={'true'}
      visible={props.visible}
      animationType={'slide'}
      onRequestClose={() => {}}
    >
      <View
        flex={1}
        scheme={scheme}
        align={'center'}
        justify={'center'}
        background={'rgba(0, 0, 0, 0.17)'}
      >
        <View
          height={327.92}
          align={'center'}
          justify={'center'}
          width={'70%'}
          radius={16.6879}
          background={Helper.getColor().plane}
        >
          <Image source={require('../../../assets/media/Spinner.svg')} />
          <Txt
            size={15}
            align={'center'}
            viewMargin={[25, 0, 0, 0]}
            color={Helper.getColor().primaryTxt}
            family={props.fontFamily && props.fontFamily.bold}
          >
            {props.text && props.text}
          </Txt>
        </View>
      </View>
    </Modal>
  );
};
