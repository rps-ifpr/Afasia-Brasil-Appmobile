import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import ClipboardWhiteSvg from '../../assets/clipboard-white.svg';

import { Container, Title, Button } from './styles';

interface ITaskHeaderProps {
  title: string;
  onOpenModal: () => void;
}

export function TaskHeader({
  title,
  onOpenModal,
}: ITaskHeaderProps): JSX.Element {
  return (
    <Container>
      <Title>{title}</Title>
      <Button onPress={onOpenModal}>
        <ClipboardWhiteSvg width={RFValue(30)} height={RFValue(30)} />
      </Button>
    </Container>
  );
}
