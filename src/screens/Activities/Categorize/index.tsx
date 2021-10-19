import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import { ActivityHeader } from '../../../components/ActivityHeader';
import { LoadingAnimation } from '../../../components/LoadingAnimation';
import { LoadingError } from '../../../components/LoadingError';

import api from '../../../services/api';

import {
  Container,
  CommunicationList,
  SeparatorList,
  ActivityCard,
  ActivityImage,
  ActivityLegend,
} from './styles';

interface ICategoriesData {
  id: string;
  name: string;
  thumbnail: string;
  category_id: string;
  secondary_category: string;
}

export function Categorize(): JSX.Element {
  const [categories, setCategories] = useState<ICategoriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/activities/categorize');

        setCategories(response.data);
      } catch (err) {
        setHasError(true);
        Toast.show({
          type: 'error',
          text1: 'Falha',
          text2: 'Erro ao buscar dados, tente novamente!',
          topOffset: 50,
          visibilityTime: 3000,
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ActivityHeader label="Atividades" title="Categorias" />

      {loading ? (
        <LoadingAnimation />
      ) : hasError ? (
        <LoadingError />
      ) : (
        <CommunicationList
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ActivityCard
              onPress={() =>
                navigation.navigate('CategorizeTask', {
                  activityId: item.id,
                  firstCategoryId: item.category_id,
                  secondCategoryId: item.secondary_category,
                })
              }
            >
              <ActivityImage
                source={{
                  uri: item.thumbnail,
                }}
                resizeMode="cover"
              />
              <ActivityLegend>{item.name}</ActivityLegend>
            </ActivityCard>
          )}
          ItemSeparatorComponent={SeparatorList}
        />
      )}
    </Container>
  );
}
