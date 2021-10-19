import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Title,
  Description,
  RetryButton,
  RetryButtonText,
} from './styles';

export function LoadingError(): JSX.Element {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Title>Ocorreu um erro :/</Title>
      <Description>
        Por algum motivo não foi possível buscar os dados, volte e tente
        novamente!
      </Description>

      <RetryButton onPress={handleGoBack}>
        <RetryButtonText>Voltar</RetryButtonText>
      </RetryButton>
    </Container>
  );
}
