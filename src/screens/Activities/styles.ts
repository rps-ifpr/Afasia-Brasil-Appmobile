import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  padding: 24px 24px 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(26)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.heading_shape};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  margin-top: 4px;
`;

export const MenuList = styled.View``;
