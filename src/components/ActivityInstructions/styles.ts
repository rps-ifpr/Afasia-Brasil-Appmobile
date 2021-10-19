import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: ${RFValue(42)}px;
  padding-bottom: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-bottom: 6px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.heading_shape};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  line-height: ${RFValue(20)}px;
  text-align: justify;
`;
