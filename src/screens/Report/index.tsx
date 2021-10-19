import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { ActivityHeader } from '../../components/ActivityHeader';
import { ListEmpty } from '../../components/ListEmpty';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { LoadingError } from '../../components/LoadingError';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  SearchContent,
  SearchInput,
  SearchButton,
  PatientsList,
  PatientContent,
  PatientInfo,
  PatientName,
  PatientLocation,
  PatientDetailsButton,
  PatientDetailsButtonText,
} from './styles';

export interface IPatients {
  id: string;
  name: string;
  address: {
    city: string;
    uf: string;
  };
}

export function Report(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchText, setSearchText] = useState('');

  const [patients, setPatients] = useState<IPatients[]>([]);
  const [searchListPatients, setSearchListPatients] = useState<IPatients[]>([]);

  const theme = useTheme();
  const navigation = useNavigation();
  const { signOut } = useAuth();

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get<IPatients[]>('/users/patients');

        setPatients(data);
        setSearchListPatients(data);
      } catch (error: any) {
        if (!!error.response && error.response.status === 401) {
          if (
            error.response.data.message === 'Expired Token/Unauthorized Access!'
          ) {
            Toast.show({
              type: 'error',
              text1: 'Falha',
              text2: 'Sessão expirada, faça login novamente!',
              topOffset: 50,
              visibilityTime: 6000,
            });

            signOut();
            return;
          }
        }

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
  }, [signOut]);

  function handleFilterPatients() {
    const dataSearch = patients.filter(item => item.name.includes(searchText));

    if (!dataSearch) return;

    setSearchListPatients(dataSearch);
  }

  function handleChangeText(text: string) {
    if (text === '') {
      setSearchListPatients(patients);
    }

    setSearchText(text);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ActivityHeader title="Relatórios" />

      {loading ? (
        <LoadingAnimation />
      ) : hasError ? (
        <LoadingError />
      ) : (
        <>
          <SearchContent>
            <SearchInput
              placeholder="Pesquise por nome"
              placeholderTextColor={theme.colors.placeholder}
              value={searchText}
              onChangeText={handleChangeText}
              returnKeyType="search"
              onSubmitEditing={handleFilterPatients}
            />
            <SearchButton onPress={handleFilterPatients}>
              <Feather
                name="search"
                size={RFValue(24)}
                color={theme.colors.white}
              />
            </SearchButton>
          </SearchContent>

          <PatientsList
            data={searchListPatients}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PatientContent>
                <PatientInfo>
                  <PatientName numberOfLines={1}>{item.name}</PatientName>
                  <PatientLocation numberOfLines={1}>
                    {item.address.city}, {item.address.uf}
                  </PatientLocation>
                </PatientInfo>

                <PatientDetailsButton
                  onPress={() =>
                    navigation.navigate('ReportDetails', {
                      userId: item.id,
                      userName: item.name,
                    })
                  }
                >
                  <PatientDetailsButtonText>Detalhes</PatientDetailsButtonText>
                </PatientDetailsButton>
              </PatientContent>
            )}
            ListEmptyComponent={<ListEmpty title="Não encontrado" />}
          />
        </>
      )}
    </Container>
  );
}
