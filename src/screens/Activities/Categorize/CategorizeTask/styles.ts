import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ICategoriesData {
  id: string;
  category_id: string;
  is_reference: boolean;
  legend: string;
  image: string;
  sound: string;
}

interface IImageCategoriesButton {
  active: boolean;
  error: boolean;
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

export const Content = styled.View``;

export const ImagesList = styled(
  FlatList as new () => FlatList<ICategoriesData>,
).attrs({
  contentContainerStyle: {
    paddingLeft: 24,
    paddingRight: 8,
  },
})`
  margin-top: 32px;
  height: ${RFValue(140)}px;
`;

export const ImageCategoriesButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<IImageCategoriesButton>`
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: ${RFValue(140)}px;
  height: ${RFValue(140)}px;
  margin-right: 16px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0);

  ${({ active, theme }) =>
    active &&
    css`
      border-color: ${theme.colors.heading};
    `}

  ${({ error, theme }) =>
    error &&
    css`
      border-color: ${theme.colors.red};
    `}
`;

export const ImageCategories = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Columns = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 42px;
`;

export const FirstColumn = styled.View`
  flex: 1;
`;

export const SeparatorColumn = styled.View`
  width: 2px;
  background-color: ${({ theme }) => theme.colors.heading};
`;

export const SecondColumn = styled.View`
  flex: 1;
  align-items: center;
`;

export const ColumnHeader = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  align-items: center;
`;

export const ColumnHeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
  text-align: center;
  margin-bottom: 16px;
`;

export const ColumnHeaderImage = styled.Image`
  width: 80%;
  height: ${RFValue(100)}px;
`;

export const ColumnList = styled(
  FlatList as new () => FlatList<ICategoriesData>,
).attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
})`
  width: 100%;
`;

export const ColumnListImage = styled.Image`
  width: 80%;
  height: ${RFValue(100)}px;
  margin: 0 auto;
  margin-top: 16px;
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
