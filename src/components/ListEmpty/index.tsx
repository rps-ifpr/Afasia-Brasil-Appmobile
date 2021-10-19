import React from 'react';

import { Container, Title } from './styles';

interface IListEmptyProps {
  title: string;
}

export function ListEmpty({ title }: IListEmptyProps): JSX.Element {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}
