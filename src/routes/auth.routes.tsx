import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { Welcome } from '../screens/Welcome';
import { About } from '../screens/About';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { SignUpThirdStep } from '../screens/SignUp/SignUpThirdStep';

import { AppRoutes } from './app.routes';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(): JSX.Element {
  return (
    <Navigator
      headerMode="none"
      initialRouteName="Welcome"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="About" component={About} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="SignUpThirdStep" component={SignUpThirdStep} />
      <Screen name="Guest" component={AppRoutes} />
    </Navigator>
  );
}
