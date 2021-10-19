import React, { useState, useRef } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

import { Header } from '../../../components/SignUp/Header';
import FormInput from '../../../components/Form/FormInput';
import { FormButton } from '../../../components/Form/FormButton';
import { Select } from '../../../components/Form/Select';
import { FormTitle } from '../../../components/Form/FormTitle';
import { ErrorMessage } from '../../../components/Form/ErrorMessage';
import { ModalTitle } from '../../../components/SignUp/Modal/ModalTitle';
import { ModalSelectionOption } from '../../../components/SignUp/Modal/ModalSelectionOption';
import { ModalActionButtons } from '../../../components/SignUp/Modal/ModalActionButtons';

import api from '../../../services/api';

import PuzzleAnimation from '../../../assets/puzzle-animation.json';

import {
  Container,
  Form,
  Fields,
  Modal,
  ModalContent,
  ModalBody,
  Loading,
  LoadingText,
} from './styles';

interface IFormData {
  email: string;
  password: string;
  password_confirmation: string;
}

interface IParams {
  firstStepData: {
    fullName: string;
    phone: string;
    birthDate: string;
    gender: string;
  };
}

interface ISpeechTherapists {
  id: string;
  name: string;
}

interface IInputElementRef {
  focus: () => void;
}

type IOccupationOption = 'Fonoaudiólogo' | 'Paciente' | 'Outro';

export function SignUpSecondStep(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSelectionOption, setModalSelectionOption] = useState<
    IOccupationOption | undefined
  >(undefined);
  const [occupationOptionSelected, setOccupationOptionSelected] = useState<
    IOccupationOption | undefined
  >(undefined);

  const [
    showErrorMessageOccupationSelect,
    setShowErrorMessageOccupationSelect,
  ] = useState(false);
  const [
    showErrorMessageSpeechTherapistSelect,
    setShowErrorMessageSpeechTherapistSelect,
  ] = useState(false);

  const [speechTherapists, setSpeechTherapists] = useState<ISpeechTherapists[]>(
    [],
  );
  const [speechTherapistsModalVisible, setSpeechTherapistsModalVisible] =
    useState(false);
  const [speechTherapistModalSelected, setSpeechTherapistModalSelected] =
    useState<ISpeechTherapists>({} as ISpeechTherapists);
  const [speechTherapistSelected, setSpeechTherapistSelected] =
    useState<ISpeechTherapists>({} as ISpeechTherapists);

  const [loadingSpeechTherapists, setLoadingSpeechTherapists] = useState(false);
  const [loadingSpeechTherapistsFailed, setLoadingSpeechTherapistsFailed] =
    useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const passwordInputRef = useRef<IInputElementRef>(null);
  const passwordConfirmationInputRef = useRef<IInputElementRef>(null);

  const { firstStepData } = route.params as IParams;

  const schema = Yup.object().shape({
    email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
    password: Yup.string()
      .required('Campo obrigatório')
      .min(6, 'No mínimo 6 dígitos'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'As senhas não conhecidem')
      .required('Campo obrigatório'),
    profession: Yup.string().when('$exist', {
      is: (exist: boolean) => exist,
      then: Yup.string().required('Campo obrigatório'),
      otherwise: Yup.string(),
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    context: { exist: occupationOptionSelected === 'Outro' } as any,
  });

  function handleOpenModalSelectTypeUser() {
    setModalVisible(true);
  }

  function handleCloseModalSelectTypeUser() {
    setModalSelectionOption(occupationOptionSelected);
    setModalVisible(false);
  }

  function handleModalSelectionOption(occupation: IOccupationOption) {
    setModalSelectionOption(occupation);
  }

  async function handleConfirmModalSelectionOption() {
    setOccupationOptionSelected(modalSelectionOption);
    if (showErrorMessageOccupationSelect) {
      setShowErrorMessageOccupationSelect(false);
    }
    setModalVisible(false);

    if (modalSelectionOption === 'Paciente' && !speechTherapists.length) {
      try {
        setLoadingSpeechTherapists(true);
        const response = await api.get('users');
        setSpeechTherapists(response.data);

        if (loadingSpeechTherapistsFailed) {
          setLoadingSpeechTherapistsFailed(false);
        }

        if (!response.data.length) {
          setLoadingSpeechTherapistsFailed(true);
          Toast.show({
            type: 'error',
            text1: 'Falha',
            text2: 'Não possui fonoaudiólogo cadastrado!',
            topOffset: 50,
            visibilityTime: 6000,
          });
        }
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Falha',
          text2: 'Erro ao carregar fonoaudiólogos',
          topOffset: 50,
          visibilityTime: 6000,
        });
        setLoadingSpeechTherapistsFailed(true);
      } finally {
        setLoadingSpeechTherapists(false);
      }
    }

    if (modalSelectionOption !== 'Paciente' && speechTherapists.length > 0) {
      setSpeechTherapists([]);
      setShowErrorMessageSpeechTherapistSelect(false);
      setSpeechTherapistModalSelected({} as ISpeechTherapists);
      setSpeechTherapistSelected({} as ISpeechTherapists);
    }
  }

  function handleSpeechTherapistsModalSelectionOption(item: ISpeechTherapists) {
    setSpeechTherapistModalSelected(item);
  }

  function handleCloseModalSelectSpeechTherapist() {
    setSpeechTherapistModalSelected(speechTherapistSelected);
    setSpeechTherapistsModalVisible(false);
  }

  function handleConfirmModalSelectionOptionSpeechTherapist() {
    setSpeechTherapistSelected(speechTherapistModalSelected);
    setShowErrorMessageSpeechTherapistSelect(false);
    setSpeechTherapistsModalVisible(false);
  }

  function handleNextStep(form: IFormData) {
    if (occupationOptionSelected === undefined) {
      setShowErrorMessageOccupationSelect(true);
      return;
    }

    if (!!speechTherapists.length && !speechTherapistSelected.id) {
      setShowErrorMessageSpeechTherapistSelect(true);
      return;
    }

    if (occupationOptionSelected === 'Paciente') {
      const data = {
        ...firstStepData,
        ...form,
        occupation: occupationOptionSelected,
        professionalId: speechTherapistSelected.id,
      };

      navigation.navigate('SignUpThirdStep', { secondStepData: data });
    } else {
      const data = {
        ...firstStepData,
        ...form,
        occupation: occupationOptionSelected,
      };

      navigation.navigate('SignUpThirdStep', { secondStepData: data });
    }
  }

  function onFormError() {
    if (!occupationOptionSelected) {
      setShowErrorMessageOccupationSelect(true);
    }

    if (!!speechTherapists.length && !speechTherapistSelected.id) {
      setShowErrorMessageSpeechTherapistSelect(true);
    }
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Header secondBulletActive />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Form>
          <FormTitle
            supTitle="Cadastro de usuário"
            title="02.Dados de acesso"
          />

          <Fields>
            <FormInput
              control={control}
              name="email"
              error={errors.email && errors.email.message}
              icon="mail"
              placeholder="Endereço de e-mail"
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
              placeholder="Senha"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordConfirmationInputRef.current?.focus()
              }
            />

            <FormInput
              ref={passwordConfirmationInputRef}
              control={control}
              name="password_confirmation"
              error={
                errors.password_confirmation &&
                errors.password_confirmation.message
              }
              icon="lock"
              placeholder="Confirmar senha"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => setModalVisible(true)}
            />

            <Select
              icon="users"
              active={!!occupationOptionSelected}
              title={occupationOptionSelected || 'Tipo de usuário'}
              onPress={handleOpenModalSelectTypeUser}
            />

            {showErrorMessageOccupationSelect && (
              <ErrorMessage message="Seleção obrigatória" />
            )}

            {!!speechTherapists.length && (
              <Select
                icon="user-plus"
                active={!!speechTherapistSelected.id}
                title={speechTherapistSelected.name || 'Fonoaudiólogos'}
                onPress={() => setSpeechTherapistsModalVisible(true)}
              />
            )}

            {showErrorMessageSpeechTherapistSelect && (
              <ErrorMessage message="Seleção obrigatória" />
            )}

            {occupationOptionSelected === 'Outro' && (
              <FormInput
                ref={passwordConfirmationInputRef}
                control={control}
                name="profession"
                error={errors.profession && errors.profession.message}
                icon="users"
                placeholder="Profissão"
                returnKeyType="send"
                onSubmitEditing={handleSubmit(handleNextStep, onFormError)}
              />
            )}
          </Fields>
        </Form>
      </ScrollView>
      <FormButton
        title="CONTINUAR"
        disabled={loadingSpeechTherapistsFailed}
        onPress={handleSubmit(handleNextStep, onFormError)}
      />

      {loadingSpeechTherapists && (
        <Loading>
          <LottieView
            source={PuzzleAnimation}
            autoPlay
            style={{ height: 180 }}
            speed={1.5}
            resizeMode="contain"
            loop
          />
          <LoadingText>Buscando fonoaudiólogos...</LoadingText>
        </Loading>
      )}

      <Modal animationType="slide" visible={modalVisible}>
        <ModalContent>
          <ModalTitle title="Selecione uma opção" />

          <ModalBody>
            <ModalSelectionOption
              active={modalSelectionOption === 'Fonoaudiólogo'}
              title="Fonoaudiólogo"
              onSelect={() => handleModalSelectionOption('Fonoaudiólogo')}
            />
            <ModalSelectionOption
              active={modalSelectionOption === 'Paciente'}
              title="Paciente"
              onSelect={() => handleModalSelectionOption('Paciente')}
            />
            <ModalSelectionOption
              active={modalSelectionOption === 'Outro'}
              title="Outro"
              onSelect={() => handleModalSelectionOption('Outro')}
            />
          </ModalBody>

          <ModalActionButtons
            disabled={modalSelectionOption === undefined}
            onCancel={handleCloseModalSelectTypeUser}
            onConfirm={handleConfirmModalSelectionOption}
          />
        </ModalContent>
      </Modal>

      <Modal animationType="slide" visible={speechTherapistsModalVisible}>
        <ModalContent>
          <ModalTitle title="Selecione uma opção" />

          <ModalBody>
            {speechTherapists.map(item => (
              <ModalSelectionOption
                key={item.id}
                active={speechTherapistModalSelected.id === item.id}
                title={item.name}
                onSelect={() =>
                  handleSpeechTherapistsModalSelectionOption(item)
                }
              />
            ))}
          </ModalBody>

          <ModalActionButtons
            disabled={modalSelectionOption === undefined}
            onCancel={handleCloseModalSelectSpeechTherapist}
            onConfirm={handleConfirmModalSelectionOptionSpeechTherapist}
          />
        </ModalContent>
      </Modal>
    </Container>
  );
}
