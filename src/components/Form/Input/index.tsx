import React from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Container, FieldInput } from './styles';

interface IInputProps extends TextInputProps {
  icon: React.ComponentProps<typeof Feather>['name'];
  filled: boolean;
  focused: boolean;
  inputRef: any;
}

export function Input({
  icon,
  filled,
  focused,
  inputRef,
  ...rest
}: IInputProps): JSX.Element {
  const theme = useTheme();

  return (
    <Container>
      <Feather
        name={icon}
        size={RFValue(24)}
        color={
          filled || focused ? theme.colors.heading : theme.colors.placeholder
        }
      />
      <FieldInput
        ref={inputRef}
        {...rest}
        placeholderTextColor={theme.colors.placeholder}
      />
    </Container>
  );
}
