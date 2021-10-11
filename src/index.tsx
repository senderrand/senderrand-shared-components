import React from 'react';
import { View } from 'react-native';
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
  WebView,
  WebViewProps,
  WebViewNavigation,
  WebViewMessageEvent,
  FileDownload,
} from 'react-native-webview';
import SvgImage from 'react-native-remote-svg';

export default () => {
  return <View />;
};

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
  // WebView Components
  WebView,
  WebViewProps,
  WebViewNavigation,
  WebViewMessageEvent,
  FileDownload,
  // React Native Remote SVG
  SvgImage,
};

/* TODO: Libraries with warning
 * react-native-remote-svg
 * react-native-sliders
 * react-swipeable-views-native
 */
