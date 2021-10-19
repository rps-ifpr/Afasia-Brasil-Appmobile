import React from 'react';

import { Container, SupTitle, Title } from './styles';

interface IFormTitle {
  supTitle: string;
  title: string;
}

export function FormTitle({ supTitle, title }: IFormTitle): JSX.Element {
  return (
    <Container>
      <SupTitle>{supTitle}</SupTitle>
      <Title>{title}</Title>
    </Container>
  );
}
