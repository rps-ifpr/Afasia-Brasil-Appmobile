import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

interface IActivityOptionText {
  active: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const HeaderActivityDetails = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(42)}px;
  padding: 0 24px;
`;

export const TitleContent = styled.View``;

export const TitleLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
`;

export const TitleName = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
  margin-top: 4px;
  margin-bottom: 16px;
`;

export const FilterButton = styled(BorderlessButton)``;

export const Content = styled.View`
  padding: 0 24px 24px;
  flex: 1;
`;

export const PieGraphicsGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PieGraphicContent = styled.View`
  margin-top: 16px;
`;

export const PieGraphic = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const PieGraphicLabel = styled.Text`
  position: absolute;
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
`;

export const PieGraphicLegend = styled.Text`
  text-align: center;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;

export const ChartGraphicContent = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 24px;
`;

export const ChartGraphicLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;

export const ActivityList = styled.View`
  width: 100%;
  margin-top: ${RFValue(42)}px;
`;

export const ActivityTotal = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-bottom: 8px;
`;

export const ActivityCard = styled(RectButton)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 8px;
  padding: 24px;
  margin-top: 16px;
`;

export const ActivityDate = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ActivityDateText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-left: 10px;
`;

export const ActivityOptions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export const ActivityOptionText = styled.Text<IActivityOptionText>`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};

  ${({ active }) =>
    !active &&
    css`
      opacity: 0.4;
    `}
`;

export const OpenMoreDetailsText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-top: 24px;
`;

export const Modal = styled.Modal``;

export const ModalContent = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px 24px 0;
`;

export const ModalCloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding-bottom: 16px;
  align-self: flex-start;
`;

export const ModalBody = styled.View`
  margin-top: 32px;
  padding-bottom: 24px;
`;

export const ModalTitle = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
`;

export const ModalActivityDetailsInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(42)}px;
`;

export const ModalActivityDetailsInfoText = styled.Text`
  color: ${({ theme }) => theme.colors.heading_shape};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  margin-left: 16px;
`;

export const ModalActivityDetailsInfoResultText = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-left: auto;
`;

export const ModalFilterContent = styled.View`
  flex: 1;
  padding-top: 24px;
`;

export const ModalFilterCloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin-left: 24px;
  align-self: flex-start;
`;

export const ModalFilterBody = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: 32px;
`;
export const ModalFilterFooter = styled.View`
  margin-top: auto;
`;

export const Form = styled.View`
  margin-top: ${RFValue(42)}px;
`;

export const ModalOptionsContent = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 32px 24px 24px;
`;

export const ModalOptionsBody = styled.View`
  align-items: flex-start;
`;
