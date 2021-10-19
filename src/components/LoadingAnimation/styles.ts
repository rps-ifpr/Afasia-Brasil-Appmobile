import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  margin-top: ${RFValue(60)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;
