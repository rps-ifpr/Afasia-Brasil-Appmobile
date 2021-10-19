import React, { ComponentProps, useState, forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';

import { Input } from '../Input';
import { ErrorMessage } from '../ErrorMessage';

import { Container } from './styles';

interface IFormInputProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
  icon: ComponentProps<typeof Feather>['name'];
}

function FormInput(
  { control, name, error, icon, ...rest }: IFormInputProps,
  inputRef: any,
): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  function handleOnBlur() {
    setIsFocused(false);
  }

  function handleOnFocus() {
    setIsFocused(true);
  }

  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input
            inputRef={inputRef}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            focused={isFocused}
            filled={!!value}
            onChangeText={onChange}
            value={value}
            icon={icon}
            {...rest}
          />
        )}
      />
      {error && <ErrorMessage message={error} />}
    </Container>
  );
}

export default forwardRef(FormInput);
