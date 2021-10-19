import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import Toast from 'react-native-toast-message';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

import { useAuth } from '../hooks/auth';
import { toastConfig } from '../global/config/toast';

export function Routes(): JSX.Element {
  const { userData, loading } = useAuth();

  if (loading) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      {userData.token ? <AppRoutes /> : <AuthRoutes />}
      <Toast ref={ref => Toast.setRef(ref)} config={toastConfig} />
    </NavigationContainer>
  );
}
