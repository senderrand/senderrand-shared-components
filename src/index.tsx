import Header from './chat/components/header';
import Footer from './chat/components/footer/footer';
import SuccessModal from './common/modals/success-modal';
import TextBox from './chat/components/text-box';
import VoiceNote from './chat/components/audio-box';
import ImageBox from './chat/components/image-box';
import VideoBox from './chat/components/video-box';
import ListAnimate from './common/list-animate';
import SuccessModal2 from './common/modals/success-modal2';
import NewRunner from './chat/components/new-runner';
import {
  FooterOptions,
  LocationBox,
  StatusBox,
} from './chat/components/options';
import { FleetFooter, FleetBox } from './chat/components/fleet';
import { InvoiceBox } from './chat/components/invoice';
import TrackBox from './chat/components/track-box';
import SwipeUp from './common/modals/swipe-up';
import Header2 from './common/header';
import LoadingModal from './common/modals/loading-modal';
import InvoiceModal from './common/modals/invoice-modal';
import ReasonSwipe from './chat/components/footer/reason-swipe';
import LocationSwipe from './chat/components/footer/locations-swipe';
import {
  getInvoiceMessage,
  getTrackerMessage,
  getStatusMessage,
} from './chat/functions';
import Chat from './chat';
import {
  WebView,
  WebViewProps,
  WebViewNavigation,
  WebViewMessageEvent,
  FileDownload,
} from 'react-native-webview';
import SvgImage from 'react-native-remote-svg';
import { Asset, useAssets, AssetMetadata } from 'expo-asset';
import {
  Audio,
  Video,
  AVPlaybackStatus,
  AVPlaybackStatusToSet,
  AVPlaybackNativeSource,
  VideoNativeProps,
  VideoProps,
  VideoNaturalSize,
  VideoState,
  VideoFullscreenUpdateEvent,
  VideoReadyForDisplayEvent,
  ResizeMode,
} from 'expo-av';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import Moment from 'moment';
import ActionSheet from 'react-native-actionsheet';
import * as Animatable from 'react-native-animatable';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
  MAP_TYPES,
  Camera,
  Address,
} from 'react-native-maps';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Slider from 'react-native-sliders';
import Svg from 'react-native-svg';
import ZigzagLines from 'react-native-zigzag-lines';
import SwipeableViews from 'react-swipeable-views-native';
import styled from 'styled-components';

export default Chat;

export {
  Header,
  Footer,
  SuccessModal,
  TextBox,
  VoiceNote,
  ImageBox,
  VideoBox,
  ListAnimate,
  SuccessModal2,
  FooterOptions,
  LocationBox,
  FleetFooter,
  FleetBox,
  StatusBox,
  NewRunner,
  InvoiceBox,
  TrackBox,
  SwipeUp,
  Header2,
  LoadingModal,
  InvoiceModal,
  ReasonSwipe,
  LocationSwipe,
  getInvoiceMessage,
  getTrackerMessage,
  getStatusMessage,
  // react-native-webview
  WebView,
  WebViewProps,
  WebViewNavigation,
  WebViewMessageEvent,
  FileDownload,
  // react-native-remote-svg
  SvgImage,
  // expo-asset
  AssetMetadata,
  Asset,
  useAssets,
  // expo-av
  AVPlaybackNativeSource,
  AVPlaybackStatusToSet,
  AVPlaybackStatus,
  Audio,
  Video,
  VideoNaturalSize,
  VideoProps,
  VideoNativeProps,
  VideoReadyForDisplayEvent,
  VideoFullscreenUpdateEvent,
  VideoState,
  ResizeMode,
  // expo-constants
  Constants,
  // expo-document-picker
  DocumentPicker,
  // expo-file-system
  FileSystem,
  // expo-font
  Font,
  // expo-image-manipulator
  ImageManipulator,
  // expo-image-picker
  ImagePicker,
  // moment
  Moment,
  // react-native-actionsheet
  ActionSheet,
  // react-native-animatable
  Animatable,
  // react-native-maps
  MapView,
  MAP_TYPES,
  Camera,
  Region,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Address,
  Marker,
  // react-native-size-matters
  scale,
  moderateScale,
  verticalScale,
  // react-native-sliders
  Slider,
  // react-native-svg
  Svg,
  // react-native-zigzag-lines
  ZigzagLines,
  // react-swipeable-views-native
  SwipeableViews,
  // styled-components
  styled,
};

/* TODO: Libraries with warning
 * react-native-remote-svg
 * react-native-sliders
 * react-swipeable-views-native
 */
