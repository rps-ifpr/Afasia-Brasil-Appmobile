import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${RFValue(54)}px;
`;

export const FieldInput = styled(TextInput)`
  flex: 1;
  padding-left: 16px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`;
