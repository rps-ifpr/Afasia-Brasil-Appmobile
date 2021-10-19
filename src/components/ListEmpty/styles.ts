import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: center;
  max-width: 400px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;
