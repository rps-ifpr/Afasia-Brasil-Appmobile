import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TableSvg from '../../assets/table.svg';
import LayoutSvg from '../../assets/layout.svg';
import LayoutGridSvg from '../../assets/layout-grid.svg';
import ClipboardSvg from '../../assets/clipboard.svg';

import { MenuCard } from '../../components/MenuCard';
import { ActivityHeader } from '../../components/ActivityHeader';

import { Container, Content, MenuList } from './styles';

export function Activities(): JSX.Element {
  const navigation = useNavigation();

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ActivityHeader title="Atividades" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <MenuList>
            <MenuCard
              firstIcon={TableSvg}
              title="Categorize"
              subTitle="Imagens por categorias"
              onPress={() => navigation.navigate('Categorize')}
            />
            <MenuCard
              firstIcon={LayoutSvg}
              title="Relacione"
              subTitle="Palavras com Imagens"
              onPress={() => navigation.navigate('Relate')}
            />
            <MenuCard
              firstIcon={LayoutGridSvg}
              title="Complemente"
              subTitle="Sentenças"
              onPress={() => navigation.navigate('Complement')}
            />
            <MenuCard
              firstIcon={ClipboardSvg}
              title="Sinônimos"
              subTitle="Selecione os sinônimos"
              onPress={() => navigation.navigate('Synonyms')}
            />
            <MenuCard
              firstIcon={ClipboardSvg}
              title="Antônimos"
              subTitle="Selecione os antônimos"
              onPress={() => navigation.navigate('Antonyms')}
            />
          </MenuList>
        </Content>
      </ScrollView>
    </Container>
  );
}
