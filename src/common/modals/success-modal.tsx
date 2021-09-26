import React from 'react';
import Button from '../form/button';
import Helper from '../../config/helper';
import styled from 'styled-components';
import { View, Txt } from '../styles';

const Wrap = styled.Modal`
  flex: 1;
`;
const Icon = styled.Text``;

export default (props: any) => {
  const Check = styled(props.entypo ? props.entypo : Icon)`
    color: #e0faff;
    font-size: 30px;
  `;

  return (
    <Wrap
      transparent={true}
      animationType={props.animationType ? props.animationType : 'slide'}
      visible={props.visible}
      onRequestClose={() => console.log()}
    >
      <View
        flex={1}
        direction={'column'}
        align={'center'}
        justify={'center'}
        pad={[0, 20, 0, 20]}
        background={props.color ? props.color : Helper.getColor().primary}
      >
        <View
          height={164}
          width={164}
          background={'#E0FAFF'}
          radius={82}
          directio={'row'}
          align={'center'}
          justify={'center'}
        >
          <View
            height={100}
            width={100}
            background={'#66CF4A'}
            radius={50}
            directio={'row'}
            align={'center'}
            justify={'center'}
          >
            <Check name={'check'} />
          </View>
        </View>
        <Txt
          size={30}
          family={props.fontFamily && props.fontFamily.bold}
          color={'#fff'}
          viewMargin={[39, 0, 17, 0]}
          align={'center'}
        >
          {props.title && props.title}
        </Txt>
        <Txt
          family={props.fontFamily && props.fontFamily.regular}
          size={18}
          color={'#fff'}
          viewMargin={[0, 0, 40, 0]}
          align={'center'}
        >
          {props.content && props.content}
        </Txt>
        <Button
          fontFamil={props.fontFamily}
          background={'#fff'}
          press={props.close && props.close}
          color={Helper.getColor().primary}
          title={props.btnTitle && props.btnTitle}
        />
      </View>
    </Wrap>
  );
};
