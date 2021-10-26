import styled from 'styled-components';
import Helper from '../../config/helper';
import React, { useEffect, useState } from 'react';
import ActionSheet from 'react-native-actionsheet';
import SingleImage from '../../common/image-viewer';
import {
  Animated,
  Image,
  Dimensions,
  useColorScheme,
  StyleSheet,
} from 'react-native';

const Wrap = styled(Animated.View)`
  width: 70%;
`;
const ImgWrap = styled.TouchableOpacity`
  width: 100%;
  height: ${(props: any) => props.height + 6}px;
  padding: 3px;
  background-color: ${(props: any) => props.background};
  border-radius: 4px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 2px 2px;
`;
const TickTime = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 6px;
  right: 6px;
`;
const TimeTxt = styled.Text`
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  color: ${(props: any) => (props.sender ? '#fff' : 'rgb(176,191,162)')};
  font-size: 10px;
`;
const Icon = styled.Text``;

//react-native-fast-image
export default (props: any) => {
  const TickIcon = styled(props.ionicons ? props.ionicons : Icon)`
    color: ${(prop: any) => (prop.read ? '#37ff00' : '#FFFDD0')};
    margin-left: 1px;
  `;

  let scheme = useColorScheme();
  let [imgHeight, setImageHeight] = useState(300);
  let [lang] = useState(props.lang ? props.lang : 'en');
  let [options] = useState(
    props.options && props.options.length
      ? [
          ...props.options,
          props.cancelTxt ? props.cancelTxt : Helper.t('cancel', lang),
        ]
      : [Helper.t('cancel', lang)]
  );

  useEffect(() => {
    Image.getSize(
      props.image,
      (_width, height) => {
        if (height + 50 >= Dimensions.get('window').height) setImageHeight(300);
        else setImageHeight(height / 2);
      },
      (error) => console.log(error)
    );
  }, [props.image]);

  let select = (index: number) => {
    props.onSelectOption && props.onSelectOption(index);
  };

  let sheet: any;
  return (
    <Wrap scheme={scheme}>
      <ImgWrap
        sender={props.sender && props.sender}
        height={imgHeight}
        onLongPress={() => sheet.show()}
        background={
          props.sender
            ? Helper.getColor().chatBoxTwo
            : Helper.getColor().chatBoxOne
        }
      >
        <SingleImage
          imgHeight={imgHeight}
          uri={props.image && props.image}
          longPress={() => sheet.show()}
          style={{ ...others.imageRadius, height: imgHeight }}
        />
        <TickTime>
          <TimeTxt
            family={props.family && props.family}
            sender={props.sender && props.sender}
          >
            {props.date && typeof props.date === 'object'
              ? Helper.getDate(props.date)
              : props.date && typeof props.date === 'number'
              ? Helper.getDate(new Date(props.date))
              : props.date && props.date}
          </TimeTxt>
          {props.sender && (
            <TickIcon
              read={props.status && props.status === 3}
              name={
                props.status && props.status > 1
                  ? 'ios-checkmark-done'
                  : 'ios-checkmark'
              }
            />
          )}
        </TickTime>
      </ImgWrap>
      <ActionSheet
        options={options}
        ref={(o: any) => (sheet = o)}
        cancelButtonIndex={options.length - 1}
        title={
          props.optionTitle ? props.optionTitle : Helper.t('options', lang)
        }
        onPress={(index: number) =>
          index !== options.length - 1 && select(index)
        }
      />
    </Wrap>
  );
};

let others = StyleSheet.create({
  imageRadius: {
    borderRadius: 4,
  },
});
