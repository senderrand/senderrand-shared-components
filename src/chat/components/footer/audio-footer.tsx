import { Audio } from 'expo-av';
import styled from 'styled-components';
import Helper from '../../../config/helper';
import helper from '../../../config/helper';
import * as FileSystem from 'expo-file-system';
import { ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import type { RecordingOptions } from 'expo-av/build/Audio/Recording.types';

const RecordWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: any) =>
    props.background ? props.background : Helper.getColor().plane};
  padding: 10px 12px 40px 10px;
`;
const MicBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const DurationTxt = styled.Text.attrs((props: any) => {
  let style = {};
  if (props.family && props.family.regular)
    style = { ...style, fontFamily: props.family.regular };
  return style;
})`
  font-size: 22px;
  margin-left: 5px;
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
`;
const CancelAudio = styled.TouchableOpacity`
  margin-left: -20px;
`;
const CancelAudioTxt = styled.Text.attrs((props: any) => {
  let style = {};
  if (props.family && props.family.regular)
    style = { ...style, fontFamily: props.family.regular };
  return style;
})`
  color: ${(props: any) =>
    props.color ? props.color : Helper.getColor().primaryTxt};
  font-size: 23px;
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
const Icon = styled.Text``;

const RECORDING_OPTIONS_PRESET_LOW_QUALITY = {
  android: {
    extension: '.aac',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AAC_ADTS,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.aac',
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};
let audioSettings = {
  allowsRecordingIOS: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  playThroughEarpieceAndroid: false,
  staysActiveInBackground: true,
};
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

  const [duration, setDuration] = useState(0);
  const [record] = useState(new Audio.Recording());
  let [lang] = useState(props.lang ? props.lang : 'en');

  let reportError = (error: string, close?: boolean) => {
    props.onError && props.onError(error);
    close && setDuration(0);
    close && props.changeType && props.changeType('default');
  };

  useEffect(() => {
    Audio.setAudioModeAsync(audioSettings).then();
    Audio.getPermissionsAsync().then((res) => {
      if (res.status === 'granted') startRecording().then();
      else {
        Audio.requestPermissionsAsync().then((res2) => {
          if (res2.status === 'granted') startRecording().then();
          else reportError(Helper.t('audio_permission_error', lang), true);
        });
      }
    });
    return () => {
      record.setOnRecordingStatusUpdate(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let startRecording = async () => {
    await Audio.setAudioModeAsync(audioSettings);
    await record.prepareToRecordAsync(
      RECORDING_OPTIONS_PRESET_LOW_QUALITY as RecordingOptions
    );
    record.setOnRecordingStatusUpdate((e: any) =>
      setDuration(e.durationMillis)
    );
    await record.startAsync();
  };

  let onStopRecord = async (type: string) => {
    if (type === 'cancel') {
      try {
        await FileSystem.deleteAsync(record.getURI() as string, {
          idempotent: true,
        });
      } catch (error) {
        console.log(error, 'stop error');
      }
    } else {
      try {
        const info = await FileSystem.getInfoAsync(record.getURI() as string);
        props.send({
          type: 'audio',
          text: '',
          file: Helper.formatFile(info),
          duration,
        });
      } catch (error) {
        console.log(error, 'playback error');
      }
    }
    try {
      await record.stopAndUnloadAsync();
      setDuration(0);
      props.changeType && props.changeType('default');
    } catch (e) {
      setDuration(0);
      props.changeType && props.changeType('default');
    }
  };

  return (
    <RecordWrap>
      <MicBox>
        <AudioIcon name={'mic-outline'} color={helper.getColor().primaryTxt} />
        <DurationTxt family={props.family && props.family}>
          {Helper.millisToTime(duration)}
        </DurationTxt>
      </MicBox>
      <CancelAudio onPress={() => onStopRecord('cancel')}>
        <CancelAudioTxt family={props.family && props.family}>
          {props.cancelTxt ? props.cancelTxt : Helper.t('cancel', lang)}
        </CancelAudioTxt>
      </CancelAudio>
      <SendBtn
        background={Helper.getColor().primary}
        onPress={props.loading ? null : () => onStopRecord('send')}
      >
        {props.loading ? (
          <ActivityIndicator size={'small'} color={'#fff'} />
        ) : (
          <SendIcon name={'send'} />
        )}
      </SendBtn>
    </RecordWrap>
  );
};
