import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
  disabled: boolean;
}

export const Container = styled.View<IProps>`
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.stroke};
  padding: 20px 0 24px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      border-top-color: ${theme.colors.shape};
    `}
`;

export const Button = styled.TouchableOpacity`
  padding: 0 16px;
`;

export const ButtonText = styled.Text<IProps>`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBlack};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.colors.shape};
    `}
`;
