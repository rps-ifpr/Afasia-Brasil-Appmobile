import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  padding: 8px 24px 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-top: 24px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  line-height: ${RFValue(22)}px;
  text-align: justify;
  margin-top: 16px;
`;

export const DescriptionLink = styled.Text`
  color: ${({ theme }) => theme.colors.blue};
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;

export const AuthorImage = styled.Image`
  margin-top: 16px;
`;

export const PartnershipImage = styled.Image`
  margin-top: 16px;
`;

export const PartnershipText = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-top: 16px;
`;
