import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface IModalSelectionOption {
  title: string;
  active: boolean;
  onSelect: () => void;
}

export function ModalSelectionOption({
  title,
  active,
  onSelect,
}: IModalSelectionOption): JSX.Element {
  const theme = useTheme();

  return (
    <Container onPress={onSelect}>
      <Feather
        name={active ? 'check-square' : 'square'}
        size={24}
        color={active ? theme.colors.heading : theme.colors.heading_shape}
      />
      <Title active={active}>{title}</Title>
    </Container>
  );
}
