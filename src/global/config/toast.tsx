import React from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BaseToast, BaseToastProps } from 'react-native-toast-message';

import { theme } from '../styles/theme';

export const toastConfig = {
  success: ({ text1, text2, ...rest }: BaseToastProps): JSX.Element => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: theme.colors.green, height: 92 }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1={text1}
      text2={text2}
      text1Style={{
        color: theme.colors.green,
        fontSize: RFValue(18),
        fontFamily: theme.fonts.robotoMedium,
      }}
      text2Style={{
        color: theme.colors.shape,
        fontSize: RFValue(15),
        fontFamily: theme.fonts.robotoRegular,
      }}
    />
  ),

  error: ({ text1, text2, ...rest }: BaseToastProps): JSX.Element => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: theme.colors.red, height: 92 }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1={text1}
      text2={text2}
      text1Style={{
        color: theme.colors.red,
        fontSize: RFValue(18),
        fontFamily: theme.fonts.robotoMedium,
      }}
      text2Style={{
        color: theme.colors.placeholder,
        fontSize: RFValue(15),
        fontFamily: theme.fonts.robotoRegular,
      }}
    />
  ),

  legend: ({ text1 }: BaseToastProps): JSX.Element => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        borderRadius: 4,
      }}
    >
      <Text
        style={{
          marginLeft: 16,
          color: theme.colors.heading,
          fontSize: RFValue(16),
          fontFamily: theme.fonts.robotoMedium,
        }}
      >
        {text1}
      </Text>
    </View>
  ),
};
