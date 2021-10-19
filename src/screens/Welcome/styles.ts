import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
})`
  background-color: ${({ theme }) => theme.colors.green_dark};
`;

export const AboutButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin-top: 20px;
  align-self: flex-end;
`;

export const AboutButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`;

export const Content = styled.View`
  padding-top: 32px;
`;

export const AphasiaGameContent = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: ${RFValue(50)}px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
  text-align: center;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  text-align: center;
  margin-top: 14px;
  line-height: ${RFValue(24)}px;
`;

export const Support = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(30)}px;
`;

export const SupportText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  margin-right: 16px;
`;

export const SupportImage = styled.Image``;

export const ButtonsGroup = styled.View`
  margin-top: ${RFValue(30)}px;
  padding: 0 16px;
`;

export const SignInButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.9;
  width: 100%;
  height: ${RFValue(53)}px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const SignInButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;

export const SignUpButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.heading};
  opacity: 0.9;
  width: 100%;
  height: ${RFValue(53)}px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const SignUpButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;

export const OrText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  text-align: center;
  margin: 16px 0;
`;

export const GuestButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-self: center;
`;

export const GuestButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`;

export const Modal = styled.Modal``;

export const ModalContent = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ModalHeader = styled.View`
  padding: 24px 0 8px 24px;
  align-self: flex-start;
`;

export const ModalCloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const ModalBody = styled.View`
  flex: 1;
  padding: 0 24px 24px;
`;

export const ModalTitle = styled.Text`
  margin-top: ${RFPercentage(4)}px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
`;

export const CreateAccountContent = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

export const CreateAccountQuestion = styled.Text`
  color: ${({ theme }) => theme.colors.heading_shape};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`;

export const CreateAccountButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const CreateAccountButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.green};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;

export const ModalFields = styled.View`
  margin-top: ${RFValue(60)}px;
  padding: 0 16px;
`;

export const ModalFooter = styled.View``;

export const AlertModalContent = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: transparent;
`;

export const AlertModalBody = styled.View`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const AlertModalBadge = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${RFValue(144)}px;
  height: 8px;
  border-radius: 4px;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.green_dark};
`;

export const AlertModalTitle = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(32)}px;
`;

export const AlertModalTitleText = styled.Text`
  color: ${({ theme }) => theme.colors.green_dark};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-left: 12px;
`;

export const AlertModalDescription = styled.Text`
  color: ${({ theme }) => theme.colors.heading_shape};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  text-align: justify;
  margin-top: 12px;
`;

export const AlertModalButtons = styled.View`
  margin-top: 32px;
`;

export const AlertModalCloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: ${({ theme }) => theme.colors.green_dark};
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const AlertModalCloseButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;

export const AlertModalPermanentCloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

export const AlertModalPermanentCloseButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  text-align: center;
`;
