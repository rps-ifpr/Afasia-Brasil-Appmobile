import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  GoBackButton,
  GoBackButtonText,
  BulletsGroup,
  Bullet,
} from './styles';

interface IHeaderProps {
  firstBulletActive?: boolean;
  secondBulletActive?: boolean;
  thirdBulletActive?: boolean;
  hasBullet?: boolean;
}

export function Header({
  firstBulletActive = false,
  secondBulletActive = false,
  thirdBulletActive = false,
  hasBullet = true,
}: IHeaderProps): JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <GoBackButton onPress={handleGoBack}>
        <Feather
          name="arrow-left"
          size={RFValue(24)}
          color={theme.colors.heading_shape}
        />
        <GoBackButtonText>Voltar</GoBackButtonText>
      </GoBackButton>

      {hasBullet && (
        <BulletsGroup>
          <Bullet active={firstBulletActive} />
          <Bullet active={secondBulletActive} />
          <Bullet active={thirdBulletActive} />
        </BulletsGroup>
      )}
    </Container>
  );
}
