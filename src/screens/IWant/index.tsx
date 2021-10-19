import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import Toast from 'react-native-toast-message';

import { ActivityHeader } from '../../components/ActivityHeader';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { LoadingError } from '../../components/LoadingError';

import api from '../../services/api';
import { IYesOrNoDTO } from '../../dtos/YesOrNoDTO';

import {
  Container,
  CommunicationList,
  SeparatorList,
  ActivityCard,
  ActivityImage,
  ActivityLegend,
} from './styles';

export function IWant(): JSX.Element {
  const [data, setData] = useState<IYesOrNoDTO[]>();
  const [soundState, setSoundState] = useState<Audio.Sound>();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/communication/iwant');

        setData(response.data);
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

  useEffect(() => {
    return soundState
      ? () => {
          soundState.unloadAsync();
        }
      : undefined;
  }, [soundState]);

  async function handlePlaySound(item: IYesOrNoDTO) {
    const { sound } = await Audio.Sound.createAsync({ uri: item.sound });
    setSoundState(sound);

    await sound.playAsync();

    Toast.show({
      type: 'legend',
      text1:
        item.legend !== 'BANHEIRO'
          ? `EU QUERO ${item.legend}`
          : `EU QUERO IR AO ${item.legend}`,
      topOffset: 50,
      visibilityTime: 1000,
    });
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ActivityHeader label="Eu quero" title="Comunicação" />

      {loading ? (
        <LoadingAnimation />
      ) : hasError ? (
        <LoadingError />
      ) : (
        <CommunicationList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ActivityCard onPress={() => handlePlaySound(item)}>
              <ActivityImage source={{ uri: item.image }} resizeMode="cover" />
              <ActivityLegend>{item.legend}</ActivityLegend>
            </ActivityCard>
          )}
          ItemSeparatorComponent={SeparatorList}
        />
      )}
    </Container>
  );
}
