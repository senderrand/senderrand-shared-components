import { Audio } from 'expo-av';
import styled from 'styled-components';
import Helper from '../../config/helper';
import * as FileSystem from 'expo-file-system';
import { ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

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
  const [duration, setDuration] = useState(0);
  const [record] = useState(new Audio.Recording());

  let reportError = (error: string) => {
    props.onError && props.onError(error);
  };

  useEffect(() => {
    Audio.getPermissionsAsync().then((res) => {
      if (res.status === 'granted') startRecording().then();
      else {
        Audio.requestPermissionsAsync().then((res2) => {
          if (res2.status === 'granted') startRecording().then();
          else reportError(permitError);
        });
      }
    });
  }, []);

  let startRecording = async () => {
    await Audio.setAudioModeAsync(audioSettings);
    await record.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_LOW_QUALITY);
    record.setOnRecordingStatusUpdate((e: any) =>
      setDuration(e.durationMillis)
    );
    await record.startAsync();
  };

  let onStopRecord = async (type: string) => {
    if (type === 'cancel') {
      try {
        await record.stopAndUnloadAsync();
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
        await record.stopAndUnloadAsync();
      } catch (error) {
        console.log(error, 'playback error');
      }
    }

    setDuration(0);
    props.changeType('default');
  };

  return (
    <RecordWrap>
      <MicBox>
        {props.recordIcon && props.recordIcon}
        <DurationTxt family={props.fontFamily}>
          {millisToTime(duration)}
        </DurationTxt>
      </MicBox>
      <CancelAudio onPress={() => onStopRecord('cancel')}>
        <CancelAudioTxt family={props.fontFamily}>
          {props.cancelTxt ? props.cancelTxt : 'Cancel'}
        </CancelAudioTxt>
      </CancelAudio>
      <SendBtn
        background={Helper.getColor().primary}
        onPress={props.loading ? null : () => onStopRecord('send')}
      >
        {props.loading ? (
          <ActivityIndicator size={'small'} color={'#fff'} />
        ) : (
          props.sendIcon && props.sendIcon
        )}
      </SendBtn>
    </RecordWrap>
  );
};

let permitError =
  'Permission is required to be granted to record audio, go to settings to grant permission.';

export const millisToTime = (millis: number, addition?: number) => {
  let minutes = Math.floor(millis / 60000);
  let seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
  if (addition) seconds = parseInt(String(seconds), 10) + addition;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
