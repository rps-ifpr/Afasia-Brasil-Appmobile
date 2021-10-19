import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${getStatusBarHeight() + 24}px 24px 24px;
  background-color: ${({ theme }) => theme.colors.green_dark};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
`;

export const Button = styled(BorderlessButton)``;
