import React from 'react';
import { StatusBar, ScrollView, Linking } from 'react-native';

import { Header } from '../../components/SignUp/Header';

import authorImg from '../../assets/author.jpeg';
import logoAafasImg from '../../assets/logo-aafas.png';
import ifpImg from '../../assets/img-ifp.png';

import {
  Container,
  Content,
  Title,
  Description,
  DescriptionLink,
  AuthorImage,
  PartnershipImage,
  PartnershipText,
} from './styles';

export function About(): JSX.Element {
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header hasBullet={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <Title>Sobre o aplicativo de CAA para pacientes com afasia</Title>

          <Description>
            A afasia é uma alteração adquirida na linguagem, provocada por
            traumatismos ou um acidente vascular cerebral (AVC). Os
            comprometimentos são variados e impossibilitam que as pessoas com
            afasia possam se comunicar de maneira eficaz. Uma forma de
            intervenção que ajude no processo de reabilitação linguística
            acontece por meio da Comunicação Aumentativa e Alternativa (CAA).
            Esta técnica considera as estratégias que envolvem desde tecnologias
            simples, bem como, dispositivos eletrônicos ou sistemas baseados em
            computador. Este aplicativo será distribuído de forma gratuita e seu
            código fonte disponibilizada no GitHub do autor{' '}
            <DescriptionLink
              onPress={() =>
                Linking.openURL('https://github.com/ROGERIOPDOSSANTOS')
              }
            >
              https://github.com/ROGERIOPDOSSANTOS
            </DescriptionLink>{' '}
            para que outros colaboradores ajudem na criação de novas atividades
            ou formas de comunicação, neste sentido contribuir para a
            reabilitação do indivíduo afásico e colocar à disposição de
            profissionais ferramentas de CAA. Inicialmente a solução foi
            desenvolvida na forma de um site responsivo, otimizado para
            dispositivos móveis, acessível por meio de qualquer smartphone, a
            partir de um navegador pode acessar o link{' '}
            <DescriptionLink
              onPress={() => Linking.openURL('https://appafasia.com.br/')}
            >
              www.appafasia.com.br
            </DescriptionLink>
            , mas agora também disponibilizada no Google Play Store para
            smartphones android.{'\n\n'}Para mais informações{' '}
            <DescriptionLink
              onPress={() =>
                Linking.openURL('https://pt.wikibooks.org/wiki/AFASIABRASIL')
              }
            >
              clique aqui
            </DescriptionLink>
            .
          </Description>

          <Title>Sobre o autor</Title>
          <AuthorImage source={authorImg} />
          <Description>
            Rogério Pereira dos Santos atua como Professor do Ensino Básico,
            Técnico e Tecnológico no Instituto Federal do Paraná - IFPR.
            Doutorando em Informática pela Universidade Lusófona em Portugal
            desde 2021, Mestrado em Computação Aplicada pela Universidade do
            Vale do Itajaí, UNIVALI, Especialista em Ciência de Dados pela Data
            Science Academy, Graduado em Sistema de Informação pela faculdade
            IESUR. Tem experiências na área da Ciência da Computação -
            desenvolve trabalhos com seguintes tecnologias/temas: Web Scraping,
            Data Analytics com R e Microsoft Azure, Big Data Real-Time Analytics
            com Python e Spark, Engenharia de Dados com Hadoop e Spark, Machine
            Learning, Internet das Coisas, Robótica, Comunicação Aumentativa e
            Alternativa (CAA) e Tecnologias Assistivas. Projetou e programou o
            site{' '}
            <DescriptionLink
              onPress={() => Linking.openURL('https://appafasia.com.br/')}
            >
              www.appafasia.com.br
            </DescriptionLink>{' '}
            (ativo desde 2018), com apoio da Associação de Afásicos de Itajaí e
            Região e do professor Dr. Alejandro Rafael Garcia Ramirez, para
            ajudar profissionais fonoaudiólogos envolvidos com público afásico.
            Apresenta uma nova versão do APP para Android e disponibilizadas no
            Google Play Store. Como educador acredita que a tecnologia estará
            cada vez mais presente no cotidiano das pessoas. Profissionais de
            variadas áreas poderão fazer uso dessas tecnologias e levá-las para
            dentro da sua atuação ou negócio. Contato por email:{' '}
            <DescriptionLink
              onPress={() =>
                Linking.openURL('mailto:rogerio.dosantos@ifpr.edu.br')
              }
            >
              rogerio.dosantos@ifpr.edu.br
            </DescriptionLink>
          </Description>

          <Title>Parcerias</Title>
          <PartnershipImage source={logoAafasImg} />
          <PartnershipImage source={ifpImg} resizeMode="contain" />
          <PartnershipText>
            Professor Dr. Alejandro Rafael Garcia Ramirez
          </PartnershipText>
        </Content>
      </ScrollView>
    </Container>
  );
}
