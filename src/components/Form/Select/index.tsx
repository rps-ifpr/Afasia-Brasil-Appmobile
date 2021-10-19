import React, { ComponentProps } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface ISelectProps extends TouchableOpacityProps {
  icon: ComponentProps<typeof Feather>['name'];
  title: string;
  active: boolean;
  onPress: () => void;
}

export function Select({
  icon,
  title,
  active,
  onPress,
}: ISelectProps): JSX.Element {
  const theme = useTheme();

  return (
    <Container onPress={onPress}>
      <Feather
        name={icon}
        size={24}
        color={active ? theme.colors.heading : theme.colors.placeholder}
      />
      <Title active={active}>{title}</Title>
      <Feather
        name="chevron-down"
        size={24}
        color={active ? theme.colors.heading : theme.colors.placeholder}
      />
    </Container>
  );
}
