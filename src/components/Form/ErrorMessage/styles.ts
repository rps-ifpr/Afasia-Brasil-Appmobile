import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Message = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  color: ${({ theme }) => theme.colors.red};
`;
