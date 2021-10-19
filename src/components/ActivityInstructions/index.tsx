import React from 'react';

import { Container, Title, Description } from './styles';

interface IActivityInstructions {
  description: string;
}

export function ActivityInstructions({
  description,
}: IActivityInstructions): JSX.Element {
  return (
    <Container>
      <Title>Instruções</Title>
      <Description>{description}</Description>
    </Container>
  );
}
