import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IConfirmButtonProps {
  active: boolean;
}

export const Container = styled.View`
  width: 100%;
  margin-top: 36px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: auto;
`;

export const ConfirmButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<IConfirmButtonProps>`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.green};
  width: 48%;
  height: ${RFValue(52)}px;
  align-items: center;
  justify-content: center;

  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.colors.green_disabled};
    `}
`;

export const ConfirmButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;

export const CancelButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.heading_shape};
  border-radius: 8px;
  width: 48%;
  height: ${RFValue(52)}px;
  align-items: center;
  justify-content: center;
`;

export const CancelButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;
