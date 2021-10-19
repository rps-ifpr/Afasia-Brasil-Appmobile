import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex-direction: row;
  padding: ${getStatusBarHeight() + 32}px 24px 16px;
  background-color: ${({ theme }) => theme.colors.green_dark};
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled(BorderlessButton)`
  align-items: flex-end;
`;

export const Info = styled.View`
  align-items: flex-end;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
  text-align: right;
`;
