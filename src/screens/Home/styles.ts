import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(140)}px;
  background-color: ${({ theme }) => theme.colors.green_dark};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${getStatusBarHeight()}px 24px 0;
`;

export const LogoContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-left: 16px;
`;

export const SignOutButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
`;

export const SignOutButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  margin-right: 10px;
`;

export const Content = styled.View`
  padding: 32px 24px 24px;
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

export const MenuList = styled.View`
  margin-top: 32px;
`;
