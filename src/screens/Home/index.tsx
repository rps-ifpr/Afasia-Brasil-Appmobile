import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import LogoSvg from '../../assets/logo.svg';
import UserVoiceSvg from '../../assets/user-voice.svg';
import ThumbUpSvg from '../../assets/thumb-up.svg';
import ThumbDownSvg from '../../assets/thumb-down.svg';
import StackSvg from '../../assets/stack.svg';
import ClipboardSvg from '../../assets/clipboard.svg';

import { MenuCard } from '../../components/MenuCard';

import {
  Container,
  Header,
  LogoContent,
  LogoText,
  SignOutButton,
  SignOutButtonText,
  Content,
  Title,
  Description,
  MenuList,
} from './styles';

export function Home(): JSX.Element {
  const theme = useTheme();
  const navigation = useNavigation();
  const { userData, signOut } = useAuth();

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <LogoContent>
          <LogoSvg width={RFValue(30)} height={RFValue(30)} />
          <LogoText>Afásicos Brasil</LogoText>
        </LogoContent>

        <SignOutButton onPress={userData.token ? signOut : navigation.goBack}>
          <SignOutButtonText>Sair</SignOutButtonText>
          <Feather
            name="log-out"
            size={RFValue(20)}
            color={theme.colors.white}
          />
        </SignOutButton>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <Title>Vamos começar</Title>
          <Description>
            Comece escolhendo um{'\n'}
            seguimento abaixo
          </Description>

          <MenuList>
            <MenuCard
              firstIcon={UserVoiceSvg}
              title="Comunicação"
              subTitle="Eu quero"
              onPress={() => navigation.navigate('IWant')}
            />
            <MenuCard
              firstIcon={ThumbUpSvg}
              secondIcon={ThumbDownSvg}
              title="Comunicação"
              subTitle="Sim ou Não"
              onPress={() => navigation.navigate('YesOrNo')}
            />
            <MenuCard
              firstIcon={StackSvg}
              title="Atividades"
              subTitle="Categorize, relacione..."
              onPress={() => navigation.navigate('Activities')}
            />
            {userData.token && userData.user.occupation !== 'paciente' && (
              <MenuCard
                firstIcon={ClipboardSvg}
                title="Acompanhamento"
                subTitle="Fonoaudiólogos"
                onPress={() => navigation.navigate('Report')}
              />
            )}
          </MenuList>
        </Content>
      </ScrollView>
    </Container>
  );
}
