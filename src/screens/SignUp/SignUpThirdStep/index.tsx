import React, { useRef } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { Header } from '../../../components/SignUp/Header';
import FormInput from '../../../components/Form/FormInput';
import { FormButton } from '../../../components/Form/FormButton';

import api from '../../../services/api';
import { FormTitle } from '../../../components/Form/FormTitle';

import { Container, Form, Fields } from './styles';

interface IFormData {
  home_address: string;
  neighborhood: string;
  state: string;
  city: string;
}

interface IParams {
  secondStepData: {
    birthDate: string;
    email: string;
    fullName: string;
    phone: string;
    gender: string;
    occupation: string;
    password: string;
    professionalId?: string;
    profession?: string;
  };
}

interface IInputElementRef {
  focus: () => void;
}

const schema = Yup.object().shape({
  home_address: Yup.string().required('Campo obrigatório'),
  neighborhood: Yup.string().required('Campo obrigatório'),
  state: Yup.string()
    .required('Campo obrigatório')
    .matches(/^([A-Z]{2})$/, 'Informe 2 letras'),
  city: Yup.string().required('Campo obrigatório'),
});

export function SignUpThirdStep(): JSX.Element {
  const neighborhoodInputRef = useRef<IInputElementRef>(null);
  const stateInputRef = useRef<IInputElementRef>(null);
  const cityInputRef = useRef<IInputElementRef>(null);

  const route = useRoute();
  const navigation = useNavigation();

  const { secondStepData } = route.params as IParams;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleRegister(form: IFormData) {
    try {
      const birthDateFormatted = secondStepData.birthDate
        .split('/')
        .reverse()
        .join('/');

      const data = {
        name: secondStepData.fullName,
        email: secondStepData.email,
        phone: Number(secondStepData.phone),
        birth_date: birthDateFormatted,
        password: secondStepData.password,
        gender: secondStepData.gender.toLowerCase(),
        occupation: secondStepData.profession
          ? secondStepData.profession
          : secondStepData.occupation,
        professional_id: secondStepData.professionalId
          ? secondStepData.professionalId
          : null,
        place: form.home_address,
        district: form.neighborhood,
        uf: form.state,
        city: form.city,
      };

      await api.post('/users', data);

      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Cadastro realizado, agora é só acessar sua conta!',
        topOffset: 50,
        visibilityTime: 4000,
      });

      navigation.navigate('Welcome');
    } catch (error: any) {
      if (error.response.data.message === 'User already exists!') {
        Toast.show({
          type: 'error',
          text1: 'Falha',
          text2: 'Usuário já cadastrado!',
          topOffset: 50,
          visibilityTime: 4000,
        });
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Falha',
        text2: 'Ocorreu um erro ao fazer cadastro, tente novamente!',
        topOffset: 50,
        visibilityTime: 4000,
      });
    }
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header thirdBulletActive />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Form>
          <FormTitle supTitle="Cadastro de usuário" title="03.Endereço" />

          <Fields>
            <FormInput
              control={control}
              name="home_address"
              error={errors.home_address && errors.home_address.message}
              icon="home"
              placeholder="Endereço residencial"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => neighborhoodInputRef.current?.focus()}
            />

            <FormInput
              ref={neighborhoodInputRef}
              control={control}
              name="neighborhood"
              error={errors.neighborhood && errors.neighborhood.message}
              icon="map"
              placeholder="Bairro"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => stateInputRef.current?.focus()}
            />

            <FormInput
              ref={stateInputRef}
              control={control}
              name="state"
              error={errors.state && errors.state.message}
              icon="map"
              placeholder="UF"
              autoCapitalize="characters"
              maxLength={2}
              returnKeyType="next"
              onSubmitEditing={() => cityInputRef.current?.focus()}
            />

            <FormInput
              ref={cityInputRef}
              control={control}
              name="city"
              error={errors.city && errors.city.message}
              icon="map-pin"
              placeholder="Cidade"
              autoCapitalize="words"
              returnKeyType="send"
              onSubmitEditing={handleSubmit(handleRegister)}
            />
          </Fields>
        </Form>
      </ScrollView>
      <FormButton
        title={isSubmitting ? 'ENVIANDO DADOS' : 'FINALIZAR CADASTRO'}
        disabled={isSubmitting}
        onPress={handleSubmit(handleRegister)}
      />
    </Container>
  );
}
