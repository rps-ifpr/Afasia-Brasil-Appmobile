import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;
