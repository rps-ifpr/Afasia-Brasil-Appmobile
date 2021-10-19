import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View``;

export const SupTitle = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`;

export const Title = styled.Text`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
`;
