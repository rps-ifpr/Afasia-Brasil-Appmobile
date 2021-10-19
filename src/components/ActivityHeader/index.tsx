import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'styled-components';
import { Container, BackButton, Info, Label, Title } from './styles';

interface IActivityHeader {
  label?: string;
  title: string;
}

export function ActivityHeader({ label, title }: IActivityHeader): JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <BackButton onPress={handleGoBack}>
        <Feather
          name="arrow-left"
          size={RFValue(24)}
          color={theme.colors.white}
        />
      </BackButton>
      <Info>
        {label && <Label>{label}</Label>}
        <Title>{title}</Title>
      </Info>
    </Container>
  );
}
