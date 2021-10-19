import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IAnonymsButton {
  selected: boolean;
}

interface IAnonymsButtonImage {
  opacity: number;
}

interface IModalTaskOptionText {
  active: boolean;
}

interface ISatisfactionSurvey {
  disabled: boolean;
}

interface ISatisfactionSurveyButtonSvg {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: ${RFValue(42)}px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const AntonymsButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<IAnonymsButton>`
  margin-bottom: 24px;
  border-width: 2px;
  border-color: transparent;
  padding: 8px;

  ${({ selected, theme }) =>
    selected &&
    css`
      border-color: ${theme.colors.black};
    `}
`;

export const AntonymsButtonImage = styled.Image<IAnonymsButtonImage>`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  opacity: ${({ opacity }) => opacity};
`;

export const ModalTask = styled.Modal``;

export const ModalTaskContent = styled.View`
  width: 100%;
  flex: 1;
`;

export const ModalTaskCloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-self: flex-start;
  margin-bottom: 12px;
  padding: 24px 0 0 24px;
`;

export const ModalTaskBody = styled.View`
  margin-top: 32px;
  padding: 0 24px;
`;

export const ModalTaskTitle = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
`;

export const ModalTaskInfoContent = styled.View``;

export const ModalTaskInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(42)}px;
`;

export const ModalTaskInfoText = styled.Text`
  color: ${({ theme }) => theme.colors.heading_shape};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  margin-left: 16px;
`;

export const ModalTaskInfoResultText = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-left: auto;
`;

export const ModalTaskOptions = styled.View`
  margin-top: ${RFValue(42)}px;
  align-items: flex-start;
`;

export const ModalTaskOptionsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-bottom: 6px;
`;

export const ModalTaskOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  margin-top: 18px;
`;

export const ModalTaskOptionText = styled.Text<IModalTaskOptionText>`
  color: ${({ active, theme }) =>
    active ? theme.colors.green_dark : theme.colors.heading_shape};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  margin-left: 16px;
`;

export const ModalTaskSatisfactionSurvey = styled.View`
  margin-top: ${RFValue(42)}px;
  margin-bottom: ${RFValue(60)}px;
`;

export const ModalTaskSatisfactionSurveyTitle = styled.Text<ISatisfactionSurvey>`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
    `}
`;

export const ModalTaskSatisfactionSurveyActions = styled.View`
  flex-direction: row;
  margin-top: 24px;
`;

export const ModalTaskSatisfactionSurveyActionButton = styled.TouchableOpacity.attrs(
  {
    activeOpacity: 0.7,
  },
)`
  margin-right: 42px;
`;

export const ModalTaskSatisfactionSurveyActionButtonSvg = styled.View<ISatisfactionSurveyButtonSvg>`
  opacity: 0.4;

  ${({ selected }) =>
    selected &&
    css`
      opacity: 1;
    `}
`;

export const ModalTaskSatisfactionSurveyAlert = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  margin-top: 16px;
`;
