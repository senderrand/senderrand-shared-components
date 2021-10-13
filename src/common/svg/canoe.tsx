import * as React from 'react';
import Helper from '../../config/helper';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg
      width={props.width ? props.width : 30}
      height={props.height ? props.height : 33}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M27 29.998c-2.085 0-4.17-.705-6-1.98-3.66 2.565-8.339 2.565-11.999 0-1.83 1.275-3.914 1.98-6 1.98H.003v3h3c2.07 0 4.11-.525 6-1.485a13.127 13.127 0 0011.999 0c1.89.975 3.93 1.485 6 1.485H30v-3h-3zm-24.073-3h.075c2.4 0 4.53-1.32 6-3 1.47 1.68 3.6 3 5.999 3 2.4 0 4.53-1.32 6-3 1.47 1.68 3.6 3 6 3h.074l2.835-10.02c.12-.39.09-.81-.09-1.169-.18-.36-.51-.63-.9-.75l-1.92-.63v-6.93c0-1.65-1.35-3-3-3h-4.5V0h-8.999v4.5h-4.5c-1.65 0-3 1.35-3 3v6.929l-1.934.63a1.51 1.51 0 00-.99 1.92l2.85 10.02zM6.002 7.5H24v5.954L15.001 10.5l-9 2.955V7.5z"
        fill={Helper.getColor().chatBoxTwo}
      />
    </Svg>
  );
}

export default SvgComponent;
