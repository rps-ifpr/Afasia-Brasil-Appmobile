import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ITitleProps {
  active: boolean;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: ${RFValue(54)}px;
  margin-bottom: 12px;
`;

export const Title = styled.Text<ITitleProps>`
  flex: 1;
  padding-left: 16px;
  color: ${({ active, theme }) =>
    active ? theme.colors.heading : theme.colors.placeholder};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`;
