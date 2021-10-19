import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Form = styled.View`
  flex: 1;
  margin-top: ${RFPercentage(10)}px;
  padding: 0 24px;
`;

export const Fields = styled.View`
  margin-top: ${RFValue(32)}px;
`;
