import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';

import { ActivityHeader } from '../../../components/ActivityHeader';
import { LoadingAnimation } from '../../../components/LoadingAnimation';
import { LoadingError } from '../../../components/LoadingError';

import {
  Container,
  CommunicationList,
  SeparatorList,
  ActivityCard,
  ActivityImage,
  ActivityLegend,
} from './styles';

interface IAntonymsData {
  id: string;
  name: string;
  thumbnail: string;
  activityId: string;
}

export function Antonyms(): JSX.Element {
  const [antonyms, setAntonyms] = useState<IAntonymsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/activities/antonym');

        setAntonyms(response.data);
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

      <ActivityHeader label="Atividades" title="Antônimos" />

      {loading ? (
        <LoadingAnimation />
      ) : hasError ? (
        <LoadingError />
      ) : (
        <CommunicationList
          data={antonyms}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ActivityCard
              onPress={() =>
                navigation.navigate('AntonymsTask', {
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
