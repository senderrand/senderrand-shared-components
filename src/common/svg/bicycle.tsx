import * as React from 'react';
import Helper from '../../config/helper';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props: any) {
  return (
    <Svg
      width={props.width ? props.width : 35}
      height={props.height ? props.height : 25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M28.436 10.934c-.096 0-.189.011-.284.015L26.51 3.28h4.114V1.093h-5.467a1.094 1.094 0 00-1.07 1.324l.655 3.05H13.55l-1.093-3.28h2.857V0H7.661v2.187h2.493l1.138 3.415-2.81 5.62a6.56 6.56 0 104.548 7.367h2.854a2.178 2.178 0 001.708-.82l7.717-9.649.704 3.285a6.55 6.55 0 102.423-.47zM6.567 21.87a4.374 4.374 0 11.914-8.65L5.59 17.007l.01.005c-.08.15-.123.315-.126.484a1.086 1.086 0 002.061.485l.011.004 1.883-3.77a4.355 4.355 0 01-2.862 7.655zm6.463-5.467a6.56 6.56 0 00-2.595-4.195l1.835-3.672 2.622 7.867H13.03zm3.78-1.16l-2.53-7.588h8.6l-6.07 7.589zm11.626 6.627a4.361 4.361 0 01-1.953-8.266l.884 4.122.022-.005a1.078 1.078 0 001.82.548c.206-.205.32-.483.32-.773a1.036 1.036 0 00-.045-.225l.022-.004-.884-4.126a4.366 4.366 0 01-.186 8.73z"
        fill={Helper.getColor().chatBoxTwo}
      />
    </Svg>
  );
}

export default SvgComponent;
