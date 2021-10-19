import React, { useState, useRef, useEffect } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AphasiaGame from '../../assets/aphasia-game.svg';
import logoIFP from '../../assets/logo-ifp.png';

import FormInput from '../../components/Form/FormInput';
import { FormButton } from '../../components/Form/FormButton';

import { useAuth } from '../../hooks/auth';
import { toastConfig } from '../../global/config/toast';

import {
  Container,
  AboutButton,
  AboutButtonText,
  Content,
  AphasiaGameContent,
  Title,
  Description,
  Support,
  SupportText,
  SupportImage,
  ButtonsGroup,
  SignInButton,
  SignInButtonText,
  SignUpButton,
  SignUpButtonText,
  OrText,
  GuestButton,
  GuestButtonText,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalTitle,
  CreateAccountContent,
  CreateAccountQuestion,
  CreateAccountButton,
  CreateAccountButtonText,
  ModalFields,
  ModalFooter,
  AlertModalContent,
  AlertModalBody,
  AlertModalBadge,
  AlertModalTitle,
  AlertModalTitleText,
  AlertModalDescription,
  AlertModalButtons,
  AlertModalCloseButton,
  AlertModalCloseButtonText,
  AlertModalPermanentCloseButton,
  AlertModalPermanentCloseButtonText,
} from './styles';

interface ISignInFormData {
  email: string;
  password: string;
}

interface IInputElementRef {
  focus: () => void;
}

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
});

export function Welcome(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);

  const passwordInputRef = useRef<IInputElementRef>(null);

  const theme = useTheme();
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function loadStorage() {
      const hideAlertModalWelcome = await AsyncStorage.getItem(
        '@AfasicosBrasil:hideAlertModalWelcome',
      );

      if (!hideAlertModalWelcome) {
        setAlertModalVisible(true);
      }
    }

    loadStorage();
  }, []);

  function handleOpenModal() {
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleSignIn(form: ISignInFormData) {
    const { email, password } = form;

    await signIn({ email, password });
  }

  function handleCreateAccount() {
    if (modalVisible) {
      setModalVisible(false);
    }
    navigation.navigate('SignUpFirstStep');
  }

  async function handleHidePermanentAlertModal() {
    await AsyncStorage.setItem(
      '@AfasicosBrasil:hideAlertModalWelcome',
      JSON.stringify(true),
    );

    setAlertModalVisible(false);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={theme.colors.green_dark}
      />

      <AboutButton onPress={() => navigation.navigate('About')}>
        <AboutButtonText>Sobre</AboutButtonText>
      </AboutButton>

      <Content>
        <AphasiaGameContent>
          <AphasiaGame width={RFValue(280)} height={186} />
        </AphasiaGameContent>

        <Title>Afásicos Brasil</Title>
        <Description>
          Uma ferramenta de apoio na reabilitação da afasia baseada na
          comunicação alternativa e aumentativa (CAA)
        </Description>

        <Support>
          <SupportText>Apoio</SupportText>
          <SupportImage source={logoIFP} />
        </Support>

        <ButtonsGroup>
          <SignInButton onPress={handleOpenModal}>
            <SignInButtonText>Acessar minha conta</SignInButtonText>
          </SignInButton>
          <SignUpButton onPress={handleCreateAccount}>
            <SignUpButtonText>Cadastrar usuário</SignUpButtonText>
          </SignUpButton>
          <OrText>ou</OrText>
          <GuestButton onPress={() => navigation.navigate('Guest')}>
            <GuestButtonText>Continuar como convidado</GuestButtonText>
          </GuestButton>
        </ButtonsGroup>
      </Content>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton onPress={handleCloseModal}>
              <Feather
                name="x"
                size={RFValue(24)}
                color={theme.colors.heading_shape}
              />
            </ModalCloseButton>
          </ModalHeader>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <ModalBody>
              <ModalTitle>
                Informe seus dados {'\n'}
                para poder acessar {'\n'}
                sua conta
              </ModalTitle>
              <CreateAccountContent>
                <CreateAccountQuestion>
                  Não possui uma conta?{' '}
                </CreateAccountQuestion>
                <CreateAccountButton onPress={handleCreateAccount}>
                  <CreateAccountButtonText>Criar uma</CreateAccountButtonText>
                </CreateAccountButton>
              </CreateAccountContent>

              <ModalFields>
                <FormInput
                  control={control}
                  name="email"
                  error={errors.email && errors.email.message}
                  icon="mail"
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />

                <FormInput
                  ref={passwordInputRef}
                  control={control}
                  name="password"
                  error={errors.password && errors.password.message}
                  icon="lock"
                  placeholder="Digite sua senha"
                  secureTextEntry
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleSignIn)}
                />
              </ModalFields>
            </ModalBody>
          </ScrollView>
          <ModalFooter>
            <FormButton
              title={isSubmitting ? 'ENVIANDO DADOS' : 'ENTRAR'}
              disabled={isSubmitting}
              onPress={handleSubmit(handleSignIn)}
            />
          </ModalFooter>
        </ModalContent>

        <Toast ref={ref => Toast.setRef(ref)} config={toastConfig} />
      </Modal>

      <Modal visible={alertModalVisible} animationType="slide" transparent>
        <AlertModalContent>
          <AlertModalBody>
            <AlertModalBadge onPress={() => setAlertModalVisible(false)} />
            <AlertModalTitle>
              <Feather
                name="alert-circle"
                size={RFValue(24)}
                color={theme.colors.green_dark}
              />
              <AlertModalTitleText>Importante</AlertModalTitleText>
            </AlertModalTitle>

            <AlertModalDescription>
              Você pode acessar e conhecer o aplicativo navegando como
              convidado, mas para registrar suas atividades e obter um
              relatório, é necessário criar uma conta.
            </AlertModalDescription>

            <AlertModalButtons>
              <AlertModalCloseButton
                onPress={() => setAlertModalVisible(false)}
              >
                <AlertModalCloseButtonText>Entendi</AlertModalCloseButtonText>
              </AlertModalCloseButton>

              <AlertModalPermanentCloseButton
                onPress={handleHidePermanentAlertModal}
              >
                <AlertModalPermanentCloseButtonText>
                  Entendi, e não exibir novamente
                </AlertModalPermanentCloseButtonText>
              </AlertModalPermanentCloseButton>
            </AlertModalButtons>
          </AlertModalBody>
        </AlertModalContent>
      </Modal>
    </Container>
  );
}
