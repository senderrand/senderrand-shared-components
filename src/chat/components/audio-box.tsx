import { Audio } from 'expo-av';
import styled from 'styled-components';
import Helper from '../../config/helper';
import Slider from 'react-native-sliders';
import React, { useState, useEffect } from 'react';
import ActionSheet from 'react-native-actionsheet';
import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';

const Wrap = styled.View`
  width: 81%;
`;
const AudioWrap = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props: any) => props.background};
  padding: 0 8px;
  border-radius: 6px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  shadow-opacity: 1;
  shadow-color: rgba(0, 0, 0, 0.08);
  shadow-offset: 2px 2px;
`;
const PlayTouch = styled.TouchableOpacity``;
const SliderBox = styled.View`
  width: 68%;
`;
const SliderBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ImgBox = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: beige;
`;
const TickTime2 = styled.View`
  flex-direction: row;
  align-items: center;
`;
const TimeTxt = styled.Text`
  font-family: ${(props: any) =>
    props.family && props.family.regular ? props.family.regular : 'Regular'};
  color: ${(props: any) => (props.sender ? '#fff' : 'rgb(176,191,162)')};
  font-size: 10px;
`;
const Icon = styled.Text``;

let lastStatus = false;
export default (props: any) => {
  let scheme = useColorScheme();
  const [sound] = useState(new Audio.Sound());
  let [playing, setPlaying] = useState(false);
  let [first, setFirst] = useState(false);
  let [position, setPosition] = useState(0);
  let [duration, setDuration] = useState(0);
  let [minimumValue] = useState(0);
  let [maximumValue, setMaximumValue] = useState(1);
  let [loading, setLoading] = useState(false);
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
    let loadAudio = async () => {
      try {
        await Audio.setAudioModeAsync(mode);
        setLoading(true);
        props.audio &&
          (await sound
            .loadAsync({ uri: props.audio })
            .then(() => setLoading(false)));
        await sound
          .getStatusAsync()
          .then((res) => {
            if (res.isLoaded) {
              setDuration(res.durationMillis as number);
              setMaximumValue(
                Math.floor((res.durationMillis as number) * 0.001)
              );
            }
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    loadAudio().then();
  }, [props.audio, sound]);

  let onStartPlay = async (post?: number) => {
    try {
      sound.setOnPlaybackStatusUpdate(playUpdate);
      post && (await sound.setPositionAsync(post));
      await sound.playAsync();
      setFirst(true);
      setPlaying(true);
      lastStatus = false;
    } catch (error) {
      console.log(error);
    }
  };

  let playUpdate = (status: any) => {
    !lastStatus && status.positionMillis && setPosition(status.positionMillis);
    if (status.didJustFinish) {
      setPlaying(false);
      setPosition(0);
      setDuration(status.positionMillis);
      lastStatus = true;
      setMaximumValue(Math.floor(status.positionMillis * 0.001));
    }
  };

  let onPausePlay = async () => {
    lastStatus = false;
    if (first && !playing && position === 0) {
      await sound.setPositionAsync(0);
      sound.replayAsync().then(() => setPlaying(true));
    } else {
      if (playing) sound.pauseAsync().then(() => setPlaying(false));
      else sound.playAsync().then(() => setPlaying(true));
    }
  };

  let seekPlay = async (value: Array<number>) => {
    if (!playing) await onStartPlay(value[0] / 0.001);
    else {
      setPosition(value[0] / 0.001);
      await sound.setPositionAsync(value[0] / 0.001);
    }
  };

  let select = (index: number) => {
    props.onSelectOption && props.onSelectOption(index);
  };

  const TickIcon = styled(props.ionicons ? props.ionicons : Icon)`
    color: ${(prop: any) => (prop.read ? '#37ff00' : '#FFFDD0')};
    margin-left: 1px;
  `;
  const PauseIcon = styled(props.ionicons ? props.ionicons : Icon)`
    color: ${props.sender ? '#fff' : Helper.getColor().secondaryTxt};
    font-size: 30px;
  `;
  const PlayIcon = styled(props.entypo ? props.entypo : Icon)`
    color: ${props.sender ? '#fff' : Helper.getColor().secondaryTxt};
    font-size: 30px;
  `;

  let sheet: any;
  return (
    <Wrap scheme={scheme}>
      <AudioWrap
        sender={props.sender && props.sender}
        onLongPress={() => sheet.show()}
        background={
          props.sender
            ? Helper.getColor().chatBoxTwo
            : Helper.getColor().chatBoxOne
        }
      >
        <PlayTouch
          onPress={loading ? null : first ? onPausePlay : () => onStartPlay()}
        >
          {loading ? (
            <ActivityIndicator size={'small'} />
          ) : playing ? (
            <PauseIcon name={'pause'} />
          ) : (
            <PlayIcon name={'controller-play'} />
          )}
        </PlayTouch>
        <SliderBox>
          <Slider
            style={others.slide}
            animateTransitions={true}
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            onSlidingComplete={seekPlay}
            thumbStyle={others.thumbStyle}
            thumbTintColor={'#fff'}
            value={Math.floor(position * 0.001)}
            animationConfig={{ useNativeDriver: false }}
            minimumTrackTintColor={'rgb(222,221,221)'}
            trackStyle={others.trackStyle}
          />
          <SliderBottom>
            <TimeTxt
              family={props.family && props.family}
              sender={props.sender && props.sender}
            >
              {Helper.millisToTime(playing ? position : duration)}
            </TimeTxt>
            <TickTime2>
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
            </TickTime2>
          </SliderBottom>
        </SliderBox>
        <ImgBox source={props.image && { uri: props.image }} />
      </AudioWrap>
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

let mode = {
  allowsRecordingIOS: false,
  playsInSilentModeIOS: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  shouldDuckAndroid: true,
  playThroughEarpieceAndroid: false,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
};

const others = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowColor: 'rgba(0,0,0,0.08)',
  },
  thumbStyle: {
    width: 10,
    height: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1.0,
    shadowColor: 'rgba(0,0,0,0.01)',
  },
  slide: {
    height: 10,
    marginBottom: 4,
    marginTop: 17,
  },
  trackStyle: {
    backgroundColor: 'rgb(222,221,221)',
  },
});
