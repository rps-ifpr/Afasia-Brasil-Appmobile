import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Header,
  IconsGroup,
  Title,
  Footer,
  SubTitle,
} from './styles';

interface IMenuCard extends RectButtonProps {
  title: string;
  subTitle: string;
  firstIcon: React.FC<SvgProps>;
  secondIcon?: React.FC<SvgProps>;
}

export function MenuCard({
  title,
  subTitle,
  firstIcon: FirstIcon,
  secondIcon: SecondIcon,
  ...rest
}: IMenuCard): JSX.Element {
  const theme = useTheme();

  return (
    <Container {...rest}>
      <Header>
        <IconsGroup>
          <FirstIcon width={RFValue(30)} height={RFValue(30)} />
          {!!SecondIcon && (
            <SecondIcon width={RFValue(30)} height={RFValue(30)} />
          )}
        </IconsGroup>
        <Title>{title}</Title>
      </Header>
      <Footer>
        <SubTitle>{subTitle}</SubTitle>
        <Feather
          name="arrow-right"
          size={RFValue(24)}
          color={theme.colors.heading}
        />
      </Footer>
    </Container>
  );
}
