import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import Helper from '../../config/helper';

function SvgComponent(props: any) {
  return (
    <Svg
      width={props.width ? props.width : 52}
      height={props.height ? props.height : 25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.647 13.716a5.245 5.245 0 105.245 5.244 5.25 5.25 0 00-5.245-5.244zm0 7.665a2.42 2.42 0 110-4.842 2.42 2.42 0 010 4.842zM41.693 13.716a5.245 5.245 0 105.244 5.244 5.25 5.25 0 00-5.244-5.244zm0 7.665a2.42 2.42 0 110-4.842 2.42 2.42 0 010 4.842z"
        fill={Helper.getColor().chatBoxTwo}
      />
      <Path
        d="M48.692 9.383l-9.42-1.718-8.019-6.654A4.449 4.449 0 0028.433 0H16.62a4.416 4.416 0 00-3.465 1.665l-5.122 6H4.579a3.635 3.635 0 00-3.63 3.63v4.438a4.442 4.442 0 004.437 4.438h.922a6.455 6.455 0 1112.678 0h16.368a6.456 6.456 0 1112.678 0h.116a3.635 3.635 0 003.63-3.631v-3.567a3.61 3.61 0 00-3.086-3.59zM18.7 6.455a1.21 1.21 0 01-1.21 1.21h-5.321a.605.605 0 01-.46-.999l3.521-4.125a1.21 1.21 0 01.92-.423h1.34a1.21 1.21 0 011.21 1.21v3.127zm6.05 5.647h-1.613a1.21 1.21 0 110-2.42h1.614a1.21 1.21 0 010 2.42zm9.53-4.408l-11.55-.026a1.21 1.21 0 01-1.206-1.21v-3.13a1.21 1.21 0 011.21-1.21h5.803c.273 0 .537.092.75.26l5.368 4.236a.605.605 0 01-.376 1.08z"
        fill={Helper.getColor().chatBoxTwo}
      />
    </Svg>
  );
}

export default SvgComponent;