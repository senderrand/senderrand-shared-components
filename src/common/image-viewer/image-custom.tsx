import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

export default class ImageCustom extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    index: PropTypes.number,
    url: PropTypes.string,
  };
  public carouselItems: {} = {};

  constructor(props: any) {
    super(props);
    this.carouselItems = {};
  }
  captureCarouselItem = (ref: any, idx: any) => {
    // @ts-ignore
    this.carouselItems[idx] = ref;
  };

  render() {
    // @ts-ignore
    const { url, style, index } = this.props;
    return (
      <View>
        <Image
          ref={(ref) => this.captureCarouselItem(ref, index)}
          source={{ uri: url }}
          style={style}
        />
      </View>
    );
  }
}
