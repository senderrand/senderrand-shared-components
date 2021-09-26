import Reply from './reply';
import styled from 'styled-components';
import React, { useState } from 'react';
import Helper from '../../config/helper';
import ActionSheet from 'react-native-actionsheet';
import { Animated, useColorScheme } from 'react-native';

const Wrap = styled(Animated.View)`
  max-width: 85%;
`;
const MessageBox = styled.TouchableOpacity`
  background-color: ${(props: any) => props.background};
  padding: 6px 8px;
  border-radius: 6px;
  min-width: 80px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 2px 2px;
  width: 100%;
`;
const MsgTxt = styled.Text`
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  color: ${(props: any) => props.color};
  line-height: 20px;
  margin-bottom: ${(props: any) => (props.space ? '10px' : '0')};
`;
const TickTime = styled.View`
  position: absolute;
  bottom: 3px;
  right: 4px;
  flex-direction: row;
  align-items: center;
`;
const TimeTxt = styled.Text`
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  color: ${(props: any) => (props.sender ? '#fff' : 'rgb(176,191,162)')};
  font-size: 8px;
`;
const Icon = styled.Text``;

export default (props: any) => {
  let scheme = useColorScheme();
  let sheet: any;
  const [bottomSpace, setBottomSpace] = useState(false);
  let [options] = useState(
    props.options && props.options.length
      ? [...props.options, props.cancelTxt ? props.cancelTxt : 'Cancel']
      : ['Cancel']
  );

  let txtLayout = (res: any) => {
    let box = res.nativeEvent.lines.length && res.nativeEvent.lines[0].width;
    let percent =
      res.nativeEvent.lines.length &&
      (res.nativeEvent.lines[res.nativeEvent.lines.length - 1].width / box) *
        100;
    percent > 75 ? setBottomSpace(true) : setBottomSpace(false);
  };

  let select = (index: number) => {
    props.onSelectOption && props.onSelectOption(index);
  };

  const TickIcon = styled(props.ionicons ? props.ionicons : Icon)`
    color: ${(prop: any) => (prop.read ? '#37ff00' : '#FFFDD0')};
    margin-left: 1px;
  `;

  return (
    <Wrap scheme={scheme}>
      <MessageBox
        sender={props.sender}
        onLongPress={() => sheet.show()}
        background={
          props.sender
            ? Helper.getColor().chatBoxTwo
            : Helper.getColor().chatBoxOne
        }
      >
        {props.reply ? (
          <Reply
            reply={props.reply}
            sender={props.sender}
            toReply={props.toReply}
            ionicons={props.ionicons}
          />
        ) : null}
        <MsgTxt
          space={bottomSpace}
          sender={props.sender}
          onTextLayout={txtLayout}
          family={props.fontFamily}
          color={props.sender ? '#fff' : Helper.getColor().primaryTxt}
        >
          {props.text}
        </MsgTxt>
        <TickTime>
          <TimeTxt family={props.fontFamily} sender={props.sender}>
            {typeof props.date === 'object'
              ? Helper.getDate(props.date)
              : props.date}
          </TimeTxt>
          {props.sender && (
            <TickIcon
              read={props.status === 3}
              name={props.status > 1 ? 'ios-checkmark-done' : 'ios-checkmark'}
            />
          )}
        </TickTime>
      </MessageBox>
      <ActionSheet
        options={options}
        ref={(o: any) => (sheet = o)}
        cancelButtonIndex={options.length - 1}
        title={props.optionTitle ? props.optionTitle : 'Options'}
        onPress={(index: number) =>
          index !== options.length - 1 && select(index)
        }
      />
    </Wrap>
  );
};
