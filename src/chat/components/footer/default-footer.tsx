import styled from 'styled-components';
import Helper from '../../../config/helper';
import React, { useEffect, useState } from 'react';
import { MediaTypeOptions } from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';
import {
  useColorScheme,
  Keyboard,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { ReplyFoot } from '../reply';

const Wrap = styled.View``;
const InputBox = styled.View`
  background-color: ${(props: any) => props.background};
  flex-direction: row;
  justify-content: space-between;
  border-top-color: ${(props: any) =>
    props.scheme === 'dark' ? 'rgb(51,50,54)' : 'rgba(173,172,170, 0.6)'};
  border-top-width: 0.3px;
  padding: 6px 12px ${(props: any) => (props.pad ? '6px' : '25px')} 12px;
`;
const TxtInputWrap = styled.View`
  border-radius: 15px;
  border: 0.3px solid
    ${(props: any) =>
      props.scheme === 'dark' ? 'rgb(51,50,54)' : 'rgba(173,172,170, 0.6)'};
  background-color: ${(props: any) => props.background};
  width: 76%;
  flex-direction: row;
  justify-content: space-between;
`;
const NewInput = styled.TextInput.attrs((props: any) => {
  let style = {};
  if (props.family && props.family.regular)
    style = { ...style, fontFamily: props.family.regular };
  return style;
})`
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  width: ${(props: any) => (props.runner ? '89%' : '100%')};
  color: ${(props: any) => props.color};
  padding: 7px 12px;
  margin-top: ${(props: any) => (props.space ? '2px' : '0px')};
`;
const PlusWrap = styled(Animated.View)`
  width: 12%;
`;
const SendWrap = styled(Animated.View)`
  width: 12%;
  flex-direction: row;
  justify-content: flex-end;
`;
const SendBtn = styled.TouchableOpacity`
  height: 35px;
  width: 35px;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().primary};
  border-radius: 17.5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const PaperClipTouch = styled.TouchableOpacity`
  width: 11%;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 35px;
  align-items: flex-start;
  justify-content: center;
`;
const Icon = styled.Text``;

export default (props: any) => {
  const SendIcon = styled(
    props.materialCommunityIcons ? props.materialCommunityIcons : Icon
  )`
    font-size: 15px;
    margin-left: 2px;
    color: ${(prop: any) => (prop.color ? prop.color : '#fff')};
  `;
  const AudioIcon = styled(props.ionicons ? props.ionicons : Icon)`
    font-size: 20px;
    color: ${(prop: any) => (prop.color ? prop.color : '#fff')};
  `;
  const PlusIcon = styled(props.antDesign ? props.antDesign : Icon)`
    color: ${(prop: any) => (prop.color ? prop.color : '#6A6A6A')};
    font-size: 20px;
  `;
  const LocationIcon = styled(props.ionicons ? props.ionicons : Icon)`
    color: ${(prop: any) => (prop.color ? prop.color : '#6A6A6A')};
    font-size: 20px;
  `;
  const Clip = styled(SendIcon)`
    color: ${(prop: any) =>
      prop.color ? prop.color : Helper.getColor().secondaryTxt};
    font-size: 20px;
  `;

  let inputRef: any;
  let sheet: any, sheet2: any;
  let scheme = useColorScheme();
  let [text, setText] = useState('');
  let [loading, setLoading] = useState(false);
  let [options, setOptions] = useState<string[]>([]);
  let [lang] = useState(props.lang ? props.lang : 'en');
  let [typing, setTyping] = useState(false);
  let [defaultOptions] = useState(
    props.defaultOptions && props.defaultOptions.length
      ? props.defaultOptions
      : [Helper.t('camera', lang), Helper.t('photo_library', lang)]
  );

  useEffect(() => {
    let opt: string[] = [
      props.cancetTxt ? props.cancetTxt : Helper.t('cancel', lang),
    ];
    if (props.runner) {
      if (props.options && props.options.length)
        opt = [...props.options, ...opt];
    } else {
      if (props.options && props.options.length)
        opt = [...defaultOptions, ...props.options, ...opt];
      else opt = [...defaultOptions, ...opt];
    }
    setOptions(opt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.options]);

  useEffect(() => {
    if (props.reply) inputRef.focus();
  }, [inputRef, props.reply]);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    return () => {
      // cleanup function
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
  }, []);
  const [keyboardShown, setKeyboardShown] = useState(false);
  const keyboardWillShow = () => setKeyboardShown(true);
  const keyboardWillHide = () => setKeyboardShown(false);

  let send = (file?: any) => {
    let newFile = file ? Helper.formatFile(file) : null;
    let message = { type: 'text', text, file: newFile };
    if (file) message.type = file.type;
    props.send && props.send(message);
    setText('');
  };

  let reportError = (error: string) => {
    props.onError && props.onError(error);
  };

  // let recordError = () => reportError(Helper.t('hold_down', lang));

  let selectOption = (index: number) => {
    if (props.runner) {
      props.onSelectOption && props.onSelectOption(index);
    } else {
      if (index === 0 || index === 1) selectOptions2(index);
      else {
        if (props.onSelectOption) props.onSelectOption(index);
      }
    }
  };

  let selectOptions2 = (index: number) => {
    if (!props.defaultOptions) {
      setLoading(true);
      Helper.mediaPicker(index === 0 ? 'camera' : 'library', {
        mediaTypes: MediaTypeOptions.All,
        allowsMultipleSelection: true,
      }).then(handleMedia);
    } else {
      if (props.runner)
        props.onSelectDefaultOption && props.onSelectDefaultOption(index);
      else props.onSelectOption && props.onSelectOption(index);
    }
  };

  let handleMedia = (res: any) => {
    setLoading(false);
    if (!res.cancelled) {
      if (res.error) reportError(res.message);
      else send(res);
    }
  };

  let handleChange = (value: React.SetStateAction<string>) => {
    setText(value);
    props.onChangeText && props.onChangeText(value);
    !typing && setTyping(true);
    !typing && props.setTyping && props.setTyping(true);
  };

  let endEditing = () => {
    setTyping(false);
    props.setTyping && props.setTyping(false);
  };

  return (
    <Wrap>
      {props.reply && <ReplyFoot {...props} />}
      <InputBox
        background={Helper.getColor().plane}
        scheme={scheme}
        pad={keyboardShown}
      >
        <PlusWrap>
          <SendBtn
            onPress={loading || props.loading ? null : () => sheet.show()}
            background={Helper.getColor().background}
          >
            {props.runner ? (
              <LocationIcon
                name={'md-location-outline'}
                color={scheme === 'dark' ? '#fff' : '#6A6A6A'}
              />
            ) : (
              <PlusIcon
                name={'plus'}
                color={scheme === 'dark' ? '#fff' : '#6A6A6A'}
              />
            )}
          </SendBtn>
        </PlusWrap>
        <TxtInputWrap background={Helper.getColor().plane} scheme={scheme}>
          <NewInput
            value={text}
            space={text === ''}
            runner={props.runner}
            family={props.family && props.family}
            ref={(ref: any) => (inputRef = ref)}
            color={Helper.getColor().primaryTxt}
            underlineColorAndroid={'transparent'}
            multiline={props.multiline ? props.multiline : true}
            placeholder={props.placeholder ? props.placeholder : ''}
            keyboardType={props.keyboardType ? props.keyboardType : 'default'}
            onChangeText={handleChange}
            onEndEditing={endEditing}
          />
          {props.runner && (
            <PaperClipTouch
              onPress={loading || props.loading ? null : () => sheet2.show()}
            >
              <Clip name={'paperclip'} />
            </PaperClipTouch>
          )}
        </TxtInputWrap>
        <SendWrap>
          <SendBtn
            onPress={
              loading || props.loading
                ? null
                : text === ''
                ? () => props.changeType('audio') //recordError
                : () => send()
            }
            onLongPress={
              !loading && !props.loading && text === ''
                ? () => props.changeType('audio')
                : null
            }
            background={text === '' ? '#FD5710' : Helper.getColor().chatBoxTwo}
          >
            {loading || props.loading ? (
              <ActivityIndicator size={'small'} color={'#fff'} />
            ) : text === '' ? (
              <AudioIcon name={'mic-outline'} />
            ) : (
              <SendIcon name={'send'} />
            )}
          </SendBtn>
        </SendWrap>
      </InputBox>
      <ActionSheet
        options={options}
        ref={(o: any) => (sheet = o)}
        cancelButtonIndex={options.length && options.length - 1}
        title={
          props.sheetOneTitle ? props.sheetOneTitle : Helper.t('options', lang)
        }
        onPress={(index: number) =>
          index !== options.length - 1 && selectOption(index)
        }
      />
      <ActionSheet
        cancelButtonIndex={defaultOptions.length}
        options={[
          ...defaultOptions,
          props.cancelTxt ? props.cancelTxt : Helper.t('cancel', lang),
        ]}
        ref={(o: any) => (sheet2 = o)}
        title={
          props.sheetTwoTitle ? props.sheetTwoTitle : Helper.t('options', lang)
        }
        onPress={(index: number) =>
          index !== defaultOptions.length && selectOptions2(index)
        }
      />
    </Wrap>
  );
};
