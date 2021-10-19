import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { IPatients } from '.';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const SearchContent = styled.View`
  flex-direction: row;
  padding: 0 24px;
  margin-top: 32px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.input};
  height: ${RFValue(60)}px;
  border-radius: 8px;
`;

export const SearchButton = styled(RectButton)`
  height: ${RFValue(60)}px;
  width: ${RFValue(60)}px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  background-color: ${({ theme }) => theme.colors.green_dark};
`;

export const PatientsList = styled(
  FlatList as new () => FlatList<IPatients>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 24,
  },
})`
  margin-top: 32px;
`;

export const PatientContent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const PatientInfo = styled.View`
  flex: 1;
`;

export const PatientName = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.robotoBold};
  text-transform: capitalize;
`;

export const PatientLocation = styled.Text`
  color: ${({ theme }) => theme.colors.placeholder};
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.robotoRegular};
  margin-top: 4px;
`;

export const PatientDetailsButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin-left: 16px;
`;

export const PatientDetailsButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.heading_shape};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
`;
