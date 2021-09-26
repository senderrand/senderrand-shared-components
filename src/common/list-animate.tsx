import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';

class ListAnimate extends Component<any> {
  state = {
    isVisible: true,
    isVisibleView: true,
  };
  private animatedRef: any;

  shouldComponentUpdate(nextProps: any): boolean {
    if (nextProps.isDeleted !== this.props.isDeleted) {
      this.setState({ isVisible: nextProps.isDeleted !== true });
      // this.forceUpdate()
      this.animatedRef.startAnimation();
    }
    return true;
  }

  animationEnded = () => {
    const { isVisible } = this.state;
    if (!isVisible) {
      this.setState({ isVisibleView: false });
    }
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

    if (animation) {
      animationType = animation;
    }

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
