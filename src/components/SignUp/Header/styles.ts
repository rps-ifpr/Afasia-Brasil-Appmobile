import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

interface IBulletProps {
  active: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${getStatusBarHeight() + 24}px 24px 8px;
`;

export const GoBackButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
`;

export const GoBackButtonText = styled.Text`
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.heading_shape};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`;

export const BulletsGroup = styled.View`
  flex-direction: row;
`;

export const Bullet = styled.View<IBulletProps>`
  width: 5px;
  height: 5px;
  margin-left: 8px;
  border-radius: 3px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.green : theme.colors.shape};
`;
