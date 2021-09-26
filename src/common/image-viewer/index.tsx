import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  PanResponder,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import PropTypes from 'prop-types';
import ImageCustom from './image-custom';

const ANIM_CONFIG = { duration: 200, useNativeDriver: false };
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class SingleImage extends PureComponent<any, any> {
  static propTypes = {
    uri: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    uri: 'https://avatars2.githubusercontent.com/u/31804215?s=40&v=4',
  };
  public openAnim: Animated.Value;
  public pan: Animated.Value;
  public carouselItems: {};
  public panResponder: any;

  state = {
    index: 0,
    origin: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    target: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    fullscreen: false,
    animating: false,
    panning: false,
    selectedImageHidden: false,
    slidesDown: false,
  };

  constructor(props: any) {
    super(props);
    this.openAnim = new Animated.Value(0);
    this.pan = new Animated.Value(0);

    this.carouselItems = {};

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !this.state.animating,
      onStartShouldSetPanResponderCapture: () => !this.state.animating,
      onMoveShouldSetPanResponder: () => !this.state.animating,
      onMoveShouldSetPanResponderCapture: () => !this.state.animating,
      onPanResponderTerminationRequest: () => true,
      onPanResponderMove: (_evt, gestureState) => {
        this.pan.setValue(gestureState.dy);

        if (Math.abs(gestureState.dy) > 15 && !this.state.panning) {
          this.pan.setValue(0);
          this.setState({ panning: true });
        }
      },
      onPanResponderRelease: this.handlePanEnd,
      onPanResponderTerminate: this.handlePanEnd,
    });
  }

  animateOpenAnimToValue = (toValue: number, onComplete?: any) => {
    Animated.timing(this.openAnim, {
      ...ANIM_CONFIG,
      toValue,
    }).start(() => {
      this.setState({ animating: false });
      if (onComplete) {
        onComplete();
      }
    });
  };

  open = (index: number) => () => {
    // @ts-ignore
    const activeComponent = this.carouselItems[index].carouselItems[index];
    activeComponent.measure(
      (_rx: any, _ry: any, width: any, height: any, x: any, y: any) => {
        this.setState(
          {
            fullscreen: true,
            animating: true,
            origin: { x, y, width, height },
            target: { x: 0, y: 0, opacity: 1 },
            index: index - 1,
          },
          () => {
            this.animateOpenAnimToValue(1);
          }
        );
      }
    );
  };

  close = () => {
    this.setState({ animating: true });
    // @ts-ignore
    this.carouselItems[this.state.index + 1].carouselItems[
      this.state.index + 1
    ].measure(
      (_rx: any, _ry: any, width: number, height: any, x: number, y: any) => {
        this.setState({
          origin: { x, y, width, height },
          slidesDown: x + width < 0 || x > width,
        });

        this.animateOpenAnimToValue(0, () => {
          this.setState({
            fullscreen: false,
            selectedImageHidden: false,
            slidesDown: false,
          });
        });
      }
    );
  };
  handlePanEnd = (_evt: any, gestureState: any) => {
    if (Math.abs(gestureState.dy) > 50) {
      this.setState({
        panning: false,
        target: {
          x: gestureState.dx,
          y: gestureState.dy,
          opacity: 1 - Math.abs(gestureState.dy / screenHeight),
        },
      });
      this.close();
    } else {
      Animated.timing(this.pan, {
        toValue: 0,
        ...ANIM_CONFIG,
      }).start(() => this.setState({ panning: false }));
    }
  };

  getFullscreenOpacity = () => {
    const { panning, target } = this.state;

    return {
      opacity: panning
        ? this.pan.interpolate({
            inputRange: [-screenHeight, 0, screenHeight],
            outputRange: [0, 1, 0],
          })
        : this.openAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, target.opacity],
          }),
    };
  };
  captureCarouselItem = (ref: any, idx: number) => {
    // @ts-ignore
    this.carouselItems[idx] = ref;
  };
  handleModalShow = () => {
    const { animating, selectedImageHidden } = this.state;

    if (!selectedImageHidden && animating) {
      this.setState({ selectedImageHidden: true });
    }
  };
  getSwipeableStyle = () => {
    const { fullscreen, origin, slidesDown, target } = this.state;

    if (!fullscreen) {
      return { flex: 1 };
    }

    const inputRange = [0, 1];

    return !slidesDown
      ? {
          left: this.openAnim.interpolate({
            inputRange,
            outputRange: [origin.x, target.x],
          }),
          top: this.openAnim.interpolate({
            inputRange,
            outputRange: [origin.y, target.y],
          }),
          width: this.openAnim.interpolate({
            inputRange,
            outputRange: [origin.width, screenWidth],
          }),
          height: this.openAnim.interpolate({
            inputRange,
            outputRange: [origin.height, screenHeight],
          }),
        }
      : {
          left: 0,
          right: 0,
          screenHeight,
          top: this.openAnim.interpolate({
            inputRange,
            outputRange: [screenHeight, target.y],
          }),
        };
  };

  renderDefaultHeader = () => (
    <TouchableWithoutFeedback onPress={this.close}>
      <View>
        <Text style={styles.text1Style}>Close</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  renderFullscreenContent = (url: string) => () => {
    const { panning } = this.state;
    const containerStyle = [
      this.getSwipeableStyle(),
      panning && { top: this.pan },
    ];
    return (
      // @ts-ignore
      <Animated.View style={containerStyle} k>
        <ScrollView
          ref={(ref) => {
            if (ref) {
              ref.scrollResponderHandleStartShouldSetResponder = () => true;
            }
          }}
          contentContainerStyle={styles.flex}
          maximumZoomScale={2}
          alwaysBounceVertical={false}
        >
          <Image
            source={{ uri: url }}
            style={styles.flex2}
            {...this.panResponder.panHandlers}
          />
        </ScrollView>
      </Animated.View>
    );
  };
  renderFullscreen = () => {
    const { animating, panning, fullscreen } = this.state;
    const opacity = this.getFullscreenOpacity();
    const { uri } = this.props;
    return (
      <Modal
        transparent
        visible={fullscreen}
        onShow={this.handleModalShow}
        onRequestClose={this.close}
      >
        <Animated.View
          style={[
            styles.blackLayer,
            {
              ...StyleSheet.absoluteFillObject,
            },
            opacity,
          ]}
        />
        <SwipeableViews
          disabled={animating || panning}
          index={this.state.index}
          onChangeIndex={(index: number) => {
            this.setState({
              index,
            });
          }}
        >
          {this.renderFullscreenContent(uri)()}
        </SwipeableViews>
        <Animated.View style={[opacity, styles.absolute]}>
          {this.renderDefaultHeader()}
        </Animated.View>
      </Modal>
    );
  };

  render() {
    const { fullscreen, selectedImageHidden, index } = this.state;
    const { uri, style } = this.props;
    const getOpacity = () => ({
      opacity: selectedImageHidden ? 0 : 1,
    });
    return (
      <View>
        <TouchableOpacity
          onPress={this.open(1)}
          onLongPress={this.props.longPress}
        >
          <View style={index + 1 === 1 ? getOpacity() : null}>
            <ImageCustom
              url={uri}
              style={[styles.resize, style]}
              ref={(ref) => this.captureCarouselItem(ref, index + 1)}
              index={index + 1}
            />
          </View>
        </TouchableOpacity>
        {fullscreen && this.renderFullscreen()}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  text1Style: {
    color: 'white',
    textAlign: 'right',
    padding: 10,
    margin: 30,
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 1,
    resizeMode: 'contain',
  },
  blackLayer: {
    backgroundColor: 'black',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  resize: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
});
