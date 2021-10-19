import React from 'react';
import LottieView from 'lottie-react-native';

import PuzzleAnimation from '../../assets/puzzle-animation.json';

import { Container, Text } from './styles';

export function LoadingAnimation(): JSX.Element {
  return (
    <Container>
      <LottieView
        source={PuzzleAnimation}
        autoPlay
        style={{ height: 180 }}
        speed={1.5}
        resizeMode="contain"
        loop
      />
      <Text>Buscando dados...</Text>
    </Container>
  );
}
