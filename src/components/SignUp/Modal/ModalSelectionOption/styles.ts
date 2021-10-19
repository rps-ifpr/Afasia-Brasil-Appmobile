import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IGenderProps {
  active: boolean;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  margin-top: 26px;
`;

export const Title = styled.Text<IGenderProps>`
  margin-left: 12px;
  color: ${({ active, theme }) =>
    active ? theme.colors.heading : theme.colors.heading_shape};
  font-size: ${RFValue(16)}px;
`;
