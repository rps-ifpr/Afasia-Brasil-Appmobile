import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { IYesOrNoDTO } from '../../dtos/YesOrNoDTO';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CommunicationList = styled(
  FlatList as new () => FlatList<IYesOrNoDTO>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
})``;

export const SeparatorList = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.divisor};
  margin: 24px 0;
`;

export const ActivityCard = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100%;
  background-color: transparent;
`;

export const ActivityImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
`;

export const ActivityLegend = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.robotoMedium};
  margin-top: 24px;
  text-align: center;
  text-transform: uppercase;
`;
