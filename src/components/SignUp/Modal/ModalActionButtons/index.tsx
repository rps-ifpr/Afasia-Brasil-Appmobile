import React from 'react';

import {
  Container,
  ConfirmButton,
  ConfirmButtonText,
  CancelButton,
  CancelButtonText,
} from './styles';

interface IModalActionButtons {
  disabled: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ModalActionButtons({
  disabled,
  onCancel,
  onConfirm,
}: IModalActionButtons): JSX.Element {
  return (
    <Container>
      <CancelButton onPress={onCancel}>
        <CancelButtonText>Cancelar</CancelButtonText>
      </CancelButton>
      <ConfirmButton disabled={disabled} active={disabled} onPress={onConfirm}>
        <ConfirmButtonText>Confirmar</ConfirmButtonText>
      </ConfirmButton>
    </Container>
  );
}
