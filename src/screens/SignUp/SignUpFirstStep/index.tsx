import React, { useState, useRef } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../../components/SignUp/Header';
import { FormTitle } from '../../../components/Form/FormTitle';
import FormInput from '../../../components/Form/FormInput';
import { FormButton } from '../../../components/Form/FormButton';
import { Select } from '../../../components/Form/Select';
import { ErrorMessage } from '../../../components/Form/ErrorMessage';
import { ModalTitle } from '../../../components/SignUp/Modal/ModalTitle';
import { ModalActionButtons } from '../../../components/SignUp/Modal/ModalActionButtons';
import { ModalSelectionOption } from '../../../components/SignUp/Modal/ModalSelectionOption';

import {
  Container,
  Form,
  Fields,
  Modal,
  ModalContent,
  ModalBody,
} from './styles';

interface IFormData {
  fullName: string;
  phone: string;
  birthDate: string;
}

interface IInputElementRef {
  focus: () => void;
}

type IGenderOption = 'Masculino' | 'Feminino';

const schema = Yup.object().shape({
  fullName: Yup.string().required('Campo obrigatório'),
  phone: Yup.string()
    .required('Campo obrigatório')
    .matches(/^([0-9]{11})$/, 'Informe os 11 dígitos'),
  birthDate: Yup.string()
    .required('Campo obrigatório')
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      'Data inválida',
    ),
});

export function SignUpFirstStep(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSelectionOption, setModalSelectionOption] = useState<
    IGenderOption | undefined
  >(undefined);
  const [genderOptionSelected, setGenderOptionSelected] = useState<
    IGenderOption | undefined
  >(undefined);

  const [showErrorMessageGenderSelect, setShowErrorMessageGenderSelect] =
    useState(false);

  const navigation = useNavigation();
  const phoneInputRef = useRef<IInputElementRef>(null);
  const birthDateInputRef = useRef<IInputElementRef>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleOpenModalSelectGender() {
    setModalVisible(true);
  }

  function handleCloseModalSelectGender() {
    setModalSelectionOption(genderOptionSelected);
    setModalVisible(false);
  }

  function handleModalSelectionOption(gender: IGenderOption) {
    setModalSelectionOption(gender);
  }

  function handleConfirmModalSelectionOption() {
    setGenderOptionSelected(modalSelectionOption);
    setShowErrorMessageGenderSelect(false);
    setModalVisible(false);
  }

  function handleNextStep(form: IFormData) {
    if (genderOptionSelected === undefined) {
      setShowErrorMessageGenderSelect(true);
      return;
    }

    const data = {
      ...form,
      gender: genderOptionSelected,
    };

    navigation.navigate('SignUpSecondStep', { firstStepData: data });
  }

  function onFormError() {
    if (!genderOptionSelected) {
      setShowErrorMessageGenderSelect(true);
    }
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header firstBulletActive />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Form>
          <FormTitle
            supTitle="Cadastro de usuário"
            title="01. Dados pessoais"
          />

          <Fields>
            <FormInput
              control={control}
              name="fullName"
              error={errors.fullName && errors.fullName.message}
              icon="user"
              placeholder="Nome completo"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => phoneInputRef.current?.focus()}
            />

            <FormInput
              ref={phoneInputRef}
              control={control}
              name="phone"
              error={errors.phone && errors.phone.message}
              icon="phone"
              maxLength={11}
              placeholder="Telefone (somente números)"
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => birthDateInputRef.current?.focus()}
            />

            <FormInput
              ref={birthDateInputRef}
              control={control}
              name="birthDate"
              error={errors.birthDate && errors.birthDate.message}
              icon="calendar"
              placeholder="Data de nascimento (ex: 01/02/2021)"
              returnKeyType="next"
              onSubmitEditing={() => setModalVisible(true)}
            />

            <Select
              icon="users"
              active={!!genderOptionSelected}
              title={genderOptionSelected || 'Sexo'}
              onPress={handleOpenModalSelectGender}
            />

            {showErrorMessageGenderSelect && (
              <ErrorMessage message="Seleção obrigatória" />
            )}
          </Fields>
        </Form>
      </ScrollView>

      <FormButton
        title="CONTINUAR"
        onPress={handleSubmit(handleNextStep, onFormError)}
      />

      <Modal animationType="slide" visible={modalVisible}>
        <ModalContent>
          <ModalTitle title="Selecione uma opção" />

          <ModalBody>
            <ModalSelectionOption
              active={modalSelectionOption === 'Masculino'}
              title="Masculino"
              onSelect={() => handleModalSelectionOption('Masculino')}
            />
            <ModalSelectionOption
              active={modalSelectionOption === 'Feminino'}
              title="Feminino"
              onSelect={() => handleModalSelectionOption('Feminino')}
            />
          </ModalBody>

          <ModalActionButtons
            disabled={modalSelectionOption === undefined}
            onCancel={handleCloseModalSelectGender}
            onConfirm={handleConfirmModalSelectionOption}
          />
        </ModalContent>
      </Modal>
    </Container>
  );
}
