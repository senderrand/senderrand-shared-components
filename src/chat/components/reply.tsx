import React from 'react';
import styled from 'styled-components';
import Helper from '../../config/helper';
import { Dimensions, useColorScheme } from 'react-native';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import helper from '../../config/helper';

let width = Dimensions.get('window').width;
const ReplyBox = styled.TouchableOpacity`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  border-left-color: ${(props: any) => (props.sender ? '#37ff00' : '#ff733e')};
  border-left-width: 4px;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  margin-top: ${verticalScale(width > 400 ? 7 : 3)}px;
  margin-bottom: 5px;
`;
const TxtReply = styled.View`
  padding: ${verticalScale(5)}px ${verticalScale(8)}px;
`;
const TitleReply = styled.Text`
  font-family: ${(props: any) =>
    props.family && props.family.medium ? props.family.medium : 'Medium'};
  font-size: ${moderateScale(11)}px;
  color: ${(props: any) => (props.sender ? '#37ff00' : '#ff733e')};
  margin-bottom: ${verticalScale(width > 400 ? 5 : 3)}px;
`;
const ImgTitle = styled(TitleReply)`
  margin-bottom: 7px;
`;
const ReplyMsg = styled.Text`
  color: ${(props: any) => (props.sender ? '#fff' : '#575D63')};
  font-size: ${moderateScale(10)}px;
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  line-height: 18px;
`;
const ReplyImg = styled.Image`
  height: 100%;
  width: 60px;
`;
const AudioIconWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Icon = styled.Text``;

export default (props: any) => {
  let scheme = useColorScheme();
  const AudioIcon = styled(props.ionicons ? props.ionicons : Icon)`
    font-size: 20px;
    color: ${(prop: any) => (prop.color ? prop.color : '#fff')};
  `;

  return (
    <>
      {props.reply.type === 'text' || props.reply.type === 'audio' ? (
        <ReplyBox
          scheme={scheme}
          sender={props.sender}
          onPress={props.toReply && props.toReply}
        >
          <TxtReply>
            <TitleReply family={props.family} sender={props.sender}>
              {props.reply.sender && props.reply.sender.name
                ? props.reply.sender.name
                : ''}
            </TitleReply>
            {props.reply.type === 'audio' ? (
              <AudioIconWrap>
                <WrapIcon>
                  <AudioIcon
                    name={'mic-outline'}
                    color={props.sender ? '#fff' : helper.getColor().primaryTxt}
                  />
                </WrapIcon>
                <ReplyMsg2
                  family={props.family}
                  sender={props.sender}
                  color={props.sender ? '#fff' : helper.getColor().primaryTxt}
                >
                  {Helper.millisToTime(props.reply.duration)}
                </ReplyMsg2>
              </AudioIconWrap>
            ) : (
              <ReplyMsg family={props.family} sender={props.sender}>
                {props.reply.text}
              </ReplyMsg>
            )}
          </TxtReply>
        </ReplyBox>
      ) : (
        <ReplyBox
          sender={props.sender}
          onPress={props.toReply && props.toReply}
        >
          <TxtReply>
            <ImgTitle family={props.family} sender={props.sender}>
              {props.reply.sender && props.reply.sender.name
                ? props.reply.sender.name
                : ''}
            </ImgTitle>
            <ReplyMsg family={props.family} sender={props.sender}>
              📷 Photo
            </ReplyMsg>
          </TxtReply>
          <ReplyImg
            source={{ uri: props.reply.file && props.reply.file.uri }}
          />
        </ReplyBox>
      )}
    </>
  );
};

const ReplyWrap = styled.View`
  border-left-width: 3px;
  border-left-color: #ff733e;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  height: ${verticalScale(40)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${verticalScale(10)}px;
`;
const TxtReply2 = styled.View`
  width: ${(props: any) => (props.media ? '50%' : '90%')};
`;
const TitleReply2 = styled.Text`
  font-family: ${(props: any) =>
    props.family && props.family.medium ? props.family.medium : 'Medium'};
  font-size: ${moderateScale(12)}px;
  color: #ff733e;
  margin-bottom: ${verticalScale(4)}px;
`;
const ImgTitle2 = styled(TitleReply)`
  margin-bottom: 7px;
`;
const ReplyMsg2 = styled.Text`
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  font-size: ${moderateScale(10)}px;
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  width: 100%;
`;
const ReplyImg2 = styled.Image`
  height: ${verticalScale(35)}px;
  width: ${verticalScale(35)}px;
  background-color: #ff733e;
  border-radius: 4px;
  margin-right: 10px;
`;
const CancelWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CancelTouch = styled.TouchableOpacity``;
const AudioIconWrap2 = styled.View`
  flex-direction: row;
  align-items: center;
`;
const WrapIcon = styled.View`
  margin-right: 5px;
  margin-left: -3px;
`;

export const ReplyFoot = (props: any) => {
  let scheme = useColorScheme();

  const AudioIcon = styled(props.ionicons ? props.ionicons : Icon)`
    font-size: 20px;
    color: ${(prop: any) => (prop.color ? prop.color : '#fff')};
  `;
  const PlusIcon = styled(props.antDesign ? props.antDesign : Icon)`
    color: ${(prop: any) => (prop.color ? prop.color : '#6A6A6A')};
    font-size: 20px;
  `;

  return (
    <ReplyWrap background={Helper.getColor().plane} scheme={scheme}>
      {props.reply.type === 'image' ? (
        <TxtReply2 media={props.reply.type !== 'text'}>
          <ImgTitle2 family={props.family} sender={props.sender}>
            {props.reply.sender && props.reply.sender.name
              ? props.reply.sender.name
              : ''}
          </ImgTitle2>
          <ReplyMsg2 family={props.family}>📷 Photo</ReplyMsg2>
        </TxtReply2>
      ) : (
        <TxtReply2
          media={props.reply.type !== 'text' && props.reply.type !== 'audio'}
        >
          <TitleReply2 sender={props.sender}>
            {props.reply.sender && props.reply.sender.name
              ? props.reply.sender.name
              : ''}
          </TitleReply2>
          {props.reply.type === 'audio' ? (
            <AudioIconWrap2>
              <WrapIcon>
                <AudioIcon
                  name={'mic-outline'}
                  color={helper.getColor().primaryTxt}
                />
              </WrapIcon>
              <ReplyMsg2
                color={Helper.getColor().primaryTxt}
                family={props.family}
                ellipsizeMode={'tail'}
                numberOfLines={1}
              >
                {props.reply.duration &&
                  Helper.millisToTime(props.reply.duration)}
              </ReplyMsg2>
            </AudioIconWrap2>
          ) : (
            <ReplyMsg2
              color={Helper.getColor().primaryTxt}
              family={props.family}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {props.reply.text && props.reply.text}
            </ReplyMsg2>
          )}
        </TxtReply2>
      )}
      <CancelWrap>
        {props.reply.type !== 'text' && props.reply.type !== 'audio' ? (
          <ReplyImg2
            source={{ uri: props.reply.file && props.reply.file.uri }}
          />
        ) : null}
        <CancelTouch onPress={props.close && props.close}>
          <PlusIcon name={'closecircleo'} color={'#ff733e'} />
        </CancelTouch>
      </CancelWrap>
    </ReplyWrap>
  );
};
