import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Form = styled.View`
  flex: 1;
  margin-top: ${RFPercentage(10)}px;
  padding: 0 24px;
`;

export const Fields = styled.View`
  margin-top: ${RFValue(32)}px;
`;

export const Modal = styled.Modal``;

export const ModalContent = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 32px 24px 24px;
`;

export const ModalBody = styled.View`
  align-items: flex-start;
`;

export const Loading = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.Text`
  margin-top: ${RFValue(60)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;
