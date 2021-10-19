import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  width: 100%;
  padding: 24px;
  border-radius: 8px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.green_shape};
`;

export const Header = styled.View``;

export const IconsGroup = styled.View`
  flex-direction: row;
  width: 30%;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
  margin-top: 16px;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.heading_shape};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  margin-top: 8px;
`;
