import React from 'react';
import styled from 'styled-components';
import Helper from '../../config/helper';
import { View, Txt } from '../styles';

const Modal = styled.Modal``;
const Icon = styled.Text``;
const Touch = styled.TouchableOpacity`
  width: 100%;
  height: 30px;
  background-color: ${Helper.getColor().primary};
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

export default (props: any) => {
  const CheckIcon = styled(props.entypo ? props.entypo : Icon)`
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
        <View
          height={327.92}
          align={'center'}
          justify={'center'}
          width={'70%'}
          radius={16.6879}
          background={Helper.getColor().plane}
          pad={[0, 25, 0, 25]}
        >
          <View
            background={props.blue ? '#E0FAFF' : 'rgba(102, 207, 74, 0.2)'}
            height={136}
            width={136}
            radius={68}
            align={'center'}
            justify={'center'}
          >
            <View
              background={props.blue ? '#3BAFDA' : '#66CF4A'}
              height={83}
              width={83}
              radius={41.5}
              align={'center'}
              justify={'center'}
            >
              <CheckIcon name={'check'} />
            </View>
          </View>
          <Txt
            size={20}
            align={'center'}
            viewMargin={[25, 0, 18, 0]}
            color={Helper.getColor().primaryTxt}
            family={props.fontFamily && props.fontFamily.bold}
          >
            {props.text && props.text}
          </Txt>
          <Touch onPress={props.press && props.press}>
            <Txt
              size={12}
              color={'#fff'}
              family={props.fontFamily && props.fontFamily.regular}
            >
              {props.btnTitle && props.btnTitle}
            </Txt>
          </Touch>
        </View>
      </View>
    </Modal>
  );
};
