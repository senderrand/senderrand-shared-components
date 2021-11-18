import * as React from 'react';
import Route from './route';
import { useEffect } from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
// @ts-ignore
// import { XmppClient } from 'senderrand-shared-components';

export default function App() {
  useEffect(() => {
    loadAsset().then();
  }, []);

  let loadAsset = async () => {
    await Asset.loadAsync([
      require('../../assets/media/splash.png'),
      require('../../assets/media/pattern.png'),
      require('../../assets/media/blue.png'),
      require('../../assets/media/recieved.wav'),
      require('../../assets/media/Spinner.svg'),
    ]);
    await Font.loadAsync({
      ExtraLight: require('../../assets/font/Niramit/Niramit-ExtraLight.ttf'),
      Light: require('../../assets/font/Niramit/Niramit-Light.ttf'),
      Regular: require('../../assets/font/Niramit/Niramit-Regular.ttf'),
      RegularItalic: require('../../assets/font/Niramit/Niramit-Italic.ttf'),
      Medium: require('../../assets/font/Niramit/Niramit-Medium.ttf'),
      SemiBold: require('../../assets/font/Niramit/Niramit-SemiBold.ttf'),
      Bold: require('../../assets/font/Niramit/Niramit-Bold.ttf'),
    });
  };

  return (
    <>
      <Route />
      {/*<XmppClient*/}
      {/*  user={{*/}
      {/*    id: 1,*/}
      {/*    jabber_id: '',*/}
      {/*    phone: '',*/}
      {/*  }}*/}
      {/*  service={''}*/}
      {/*  domain={''}*/}
      {/*  change={(res: any) => console.log(res, 'hello there')}*/}
      {/*/>*/}
    </>
  );
}
