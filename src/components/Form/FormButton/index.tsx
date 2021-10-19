import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Button, ButtonText } from './styles';

interface IFormButtonProps extends TouchableOpacityProps {
  title: string;
  disabled?: boolean;
}

export function FormButton({
  title,
  disabled = false,
  ...rest
}: IFormButtonProps): JSX.Element {
  return (
    <Container disabled={disabled}>
      <Button activeOpacity={0.7} disabled={disabled} {...rest}>
        <ButtonText disabled={disabled}>{title}</ButtonText>
      </Button>
    </Container>
  );
}
