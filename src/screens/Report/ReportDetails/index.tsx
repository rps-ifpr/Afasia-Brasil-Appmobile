import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import TableSvg from '../../../assets/table.svg';
import LayoutSvg from '../../../assets/layout.svg';
import LayoutGridSvg from '../../../assets/layout-grid.svg';
import ClipboardSvg from '../../../assets/clipboard.svg';

import { Header } from '../../../components/SignUp/Header';
import { MenuCard } from '../../../components/MenuCard';

import {
  Container,
  TitleContent,
  TitleLabel,
  TitleName,
  Content,
} from './styles';

interface IParams {
  userId: string;
  userName: string;
}

export function ReportDetails(): JSX.Element {
  const route = useRoute();
  const navigation = useNavigation();

  const { userId, userName } = route.params as IParams;

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header hasBullet={false} />

      <TitleContent>
        <TitleLabel>Relatórios por atividade</TitleLabel>
        <TitleName>{userName}</TitleName>
      </TitleContent>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <MenuCard
            firstIcon={TableSvg}
            title="Relatório Categorize"
            subTitle="Imagens por categorias"
            onPress={() =>
              navigation.navigate('ReportActivityDetails', {
                userId,
                activityName: 'Categorize',
                activityType: 'categorize',
              })
            }
          />
          <MenuCard
            firstIcon={LayoutSvg}
            title="Relatório Relacione"
            subTitle="Palavras com Imagens"
            onPress={() =>
              navigation.navigate('ReportActivityDetails', {
                userId,
                activityName: 'Relacione',
                activityType: 'relacione',
              })
            }
          />
          <MenuCard
            firstIcon={LayoutGridSvg}
            title="Relatório Complemente"
            subTitle="Sentenças"
            onPress={() =>
              navigation.navigate('ReportActivityDetails', {
                userId,
                activityName: 'Complemente',
                activityType: 'complemento',
              })
            }
          />
          <MenuCard
            firstIcon={ClipboardSvg}
            title="Relatório Sinônimos"
            subTitle="Selecione os sinônimos"
            onPress={() =>
              navigation.navigate('ReportActivityDetails', {
                userId,
                activityName: 'Sinônimos',
                activityType: 'sinonimos',
              })
            }
          />
          <MenuCard
            firstIcon={ClipboardSvg}
            title="Relatório Antônimos"
            subTitle="Selecione os antônimos"
            onPress={() =>
              navigation.navigate('ReportActivityDetails', {
                userId,
                activityName: 'Antônimos',
                activityType: 'antonimos',
              })
            }
          />
        </Content>
      </ScrollView>
    </Container>
  );
}
