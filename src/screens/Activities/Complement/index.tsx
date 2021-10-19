import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

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

interface ISentencesData {
  id: string;
  name: string;
  thumbnail: string;
  sentence: string;
}

export function Complement(): JSX.Element {
  const [sentences, setSentences] = useState<ISentencesData[]>([]);

  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get<ISentencesData[]>(
          '/activities/complement',
        );

        setSentences(data);
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

      <ActivityHeader
        label="Atividades"
        title={`Complemento de${'\n'}Sentença`}
      />

      {loading ? (
        <LoadingAnimation />
      ) : hasError ? (
        <LoadingError />
      ) : (
        <CommunicationList
          data={sentences}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ActivityCard
              onPress={() =>
                navigation.navigate('ComplementTask', {
                  activityId: item.id,
                  sentence: item.sentence,
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
