import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TitleContent = styled.View`
  margin-top: ${RFValue(42)}px;
  padding: 0 24px;
`;

export const TitleLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`;

export const TitleName = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
  margin-top: 4px;
  margin-bottom: 16px;
`;

export const Content = styled.View`
  padding: ${RFValue(42)}px 24px 24px;
`;
