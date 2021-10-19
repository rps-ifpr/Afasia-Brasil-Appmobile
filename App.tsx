import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import Toast from 'react-native-toast-message';

import { theme } from './src/global/styles/theme';
import { AuthProvider } from './src/hooks/auth';

import { Routes } from './src/routes';
import { toastConfig } from './src/global/config/toast';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
        <Toast ref={ref => Toast.setRef(ref)} config={toastConfig} />
      </AuthProvider>
    </ThemeProvider>
  );
}
