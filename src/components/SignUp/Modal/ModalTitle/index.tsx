import React from 'react';

import { Title } from './styles';

interface IModalTitleProps {
  title: string;
}

export function ModalTitle({ title }: IModalTitleProps): JSX.Element {
  return <Title>{title}</Title>;
}
