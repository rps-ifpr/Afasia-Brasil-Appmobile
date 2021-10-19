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

interface IRelatesData {
  id: string;
  name: string;
  thumbnail: string;
}

export function Relate(): JSX.Element {
  const [relates, setRelates] = useState<IRelatesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/activities/relate');

        setRelates(response.data);
      } catch {
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

      <ActivityHeader label="Atividades" title="Relacione" />

      {loading ? (
        <LoadingAnimation />
      ) : hasError ? (
        <LoadingError />
      ) : (
        <CommunicationList
          data={relates}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ActivityCard
              onPress={() =>
                navigation.navigate('RelateTask', {
                  activityId: item.id,
                })
              }
            >
              <ActivityImage
                source={{
                  uri: item.thumbnail,
                }}
                resizeMode="contain"
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
