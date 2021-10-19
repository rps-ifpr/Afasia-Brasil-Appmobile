import React from 'react';

import { Message } from './styles';

interface IErrorMessage {
  message: string;
}

export function ErrorMessage({ message }: IErrorMessage): JSX.Element {
  return <Message>{message}</Message>;
}
