import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;

export const Description = styled.Text`
  margin-top: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.heading_shape};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  text-align: center;
`;

export const RetryButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const RetryButtonText = styled.Text`
  margin-top: ${RFValue(80)}px;
  color: ${({ theme }) => theme.colors.green_dark};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
`;
