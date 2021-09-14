import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Chat from './chat';
import Sink from './sink';

import { enableScreens } from 'react-native-screens';
enableScreens();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Sink'}
          component={Sink}
          options={{ title: 'SendErrand Kitchen Sink' }}
        />
        <Stack.Screen
          name={'Chat'}
          component={Chat}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
