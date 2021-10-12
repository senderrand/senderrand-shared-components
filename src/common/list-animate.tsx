import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';

class ListAnimate extends Component<any, any> {
  state = {
    isVisible: true,
    isVisibleView: true,
  };
  private animatedRef: any;

  componentDidUpdate(
    prevProps: Readonly<any>,
    _prevState: Readonly<any>,
    _snapshot?: any
  ) {
    if (prevProps.isDeleted !== this.props.isDeleted) this.change(prevProps);
  }

  change = (prevProps: any) => {
    this.setState({ isVisible: !prevProps.isDeleted });
    this.animatedRef.startAnimation();
  };

  animationEnded = () => {
    const { isVisible } = this.state;
    if (!isVisible) this.setState({ isVisibleView: false });
  };

  render() {
    const { isVisible, isVisibleView } = this.state;

    if (!isVisibleView) {
      return null;
    }

    const {
      inAnimation = 'fadeIn',
      outAnimation = 'fadeOut',
      easing = null,
      animation = null,
      duration = 300,
    } = this.props;

    let animationType = isVisible ? inAnimation : outAnimation;

    if (animation) animationType = animation;

    const durationInt = parseInt(duration, 10);

    return (
      <Animatable.View
        ref={(c) => {
          this.animatedRef = c;
        }}
        easing={easing}
        animation={animationType}
        onAnimationEnd={this.animationEnded}
        duration={durationInt}
      >
        {this.props.children}
      </Animatable.View>
    );
  }
}

export default ListAnimate;
