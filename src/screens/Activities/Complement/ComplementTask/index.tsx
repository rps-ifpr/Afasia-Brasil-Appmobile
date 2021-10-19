import React, { useEffect, useState, useMemo } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Toast from 'react-native-toast-message';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import ThumbUpSatisfactionSvg from '../../../../assets/thumb-up-satisfaction.svg';
import ThumbDownSatisfactionSvg from '../../../../assets/thumb-down-satisfaction.svg';

import { TaskHeader } from '../../../../components/TaskHeader';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import { LoadingError } from '../../../../components/LoadingError';
import { FormButton } from '../../../../components/Form/FormButton';
import { ActivityInstructions } from '../../../../components/ActivityInstructions';

import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import { getSuggestionsActivity } from '../../../../utils/getSuggestionsActivity';

import {
  Container,
  Content,
  ComplementList,
  ComplementListButton,
  ComplementListButtonImage,
  Painting,
  PaintingText,
  PaintingImage,
  ModalTask,
  ModalTaskContent,
  ModalTaskCloseButton,
  ModalTaskBody,
  ModalTaskTitle,
  ModalTaskInfoContent,
  ModalTaskInfo,
  ModalTaskInfoText,
  ModalTaskInfoResultText,
  ModalTaskOptions,
  ModalTaskOptionsTitle,
  ModalTaskOption,
  ModalTaskOptionText,
  ModalTaskSatisfactionSurvey,
  ModalTaskSatisfactionSurveyTitle,
  ModalTaskSatisfactionSurveyActions,
  ModalTaskSatisfactionSurveyActionButton,
  ModalTaskSatisfactionSurveyActionButtonSvg,
  ModalTaskSatisfactionSurveyAlert,
} from './styles';

interface IParams {
  activityId: string;
  sentence: string;
}

interface IComplementItems {
  id: string;
  legend: string;
  image: string;
  sound: string;
  is_response: boolean;
}

interface IComplementData {
  id: string;
  items: IComplementItems[];
}

type ISatisfactionSurvey = 'gostou' | 'nao gostou';

let taskTime: NodeJS.Timeout;

export function ComplementTask(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [taskStarted, setTaskStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskFinalized, setTaskFinalized] = useState(false);

  const [soundState, setSoundState] = useState<Audio.Sound>();

  const [complementData, setComplementData] = useState<IComplementItems[]>([]);

  const [paintingSelectedError, setPaintingSelectedError] = useState(false);
  const [paintingSelected, setPaintingSelected] = useState(false);
  const [paintingImageUrl, setPaintingImageUrl] = useState('');

  const [modalTaskVisible, setModalTaskVisible] = useState(true);
  const [modalOptionSound, setModalOptionSound] = useState(false);
  const [modalOptionSupervised, setModalOptionSupervised] = useState(false);
  const [modalOptionLegend, setModalOptionLegend] = useState(false);

  const [timerIsActive, setTimerIsActive] = useState(false);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const [acerts, setAcerts] = useState(0);
  const [errors, setErrors] = useState(0);

  const [satisfactionSurvey, setSatisfactionSurvey] =
    useState<ISatisfactionSurvey>();
  const [satisfactionSurveyDisabled, setSatisfactionSurveyDisabled] =
    useState(true);

  const route = useRoute();
  const theme = useTheme();
  const { userData, signOut } = useAuth();

  const { activityId, sentence } = route.params as IParams;

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get<IComplementData[]>(
          '/activities/complement/details',
          {
            params: { activity_id: activityId },
          },
        );

        setComplementData(data[0].items);
      } catch {
        setHasError(true);
        Toast.show({
          type: 'error',
          text1: 'Falha',
          text2: 'Erro ao buscar dados, tente novamente!',
          topOffset: 50,
          visibilityTime: 3000,
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [activityId]);

  useEffect(() => {
    if (timerIsActive) {
      taskTime = setTimeout(() => {
        if (second <= 58) {
          setSecond(second + 1);
        } else if (minute <= 58) {
          setSecond(0);
          setMinute(minute + 1);
        } else {
          setSecond(0);
          setMinute(0);
          setHour(hour + 1);
        }
      }, 1000);
    }
  }, [timerIsActive, minute, second, hour]);

  useEffect(() => {
    return () => {
      clearTimeout(taskTime);
    };
  }, []);

  useEffect(() => {
    if (paintingImageUrl) {
      setTimerIsActive(false);
      setSatisfactionSurveyDisabled(false);
      setModalTaskVisible(true);
    }
  }, [paintingImageUrl]);

  useEffect(() => {
    return soundState
      ? () => {
          soundState.unloadAsync();
        }
      : undefined;
  }, [soundState]);

  const taskTimeFormatted = useMemo(() => {
    return `${hour > 0 ? hour.toString().padStart(2, '0') : ''}${
      hour > 0 ? ':' : ''
    }${minute.toString().padStart(2, '0')}:${second
      .toString()
      .padStart(2, '0')}`;
  }, [hour, minute, second]);

  function handleOpenModalTask() {
    setModalTaskVisible(true);
  }

  function handleCloseModalTask() {
    setModalTaskVisible(false);
  }

  async function handleClickPainting() {
    setPaintingSelected(prevState => !prevState);

    if (paintingSelectedError) {
      setPaintingSelectedError(false);
    }

    if (!timerIsActive) {
      setTimerIsActive(true);
    }

    if (!taskStarted) {
      setTaskStarted(true);
    }

    if (modalOptionSound) {
      const findPaintingSound = complementData.find(item => item.is_response);

      if (findPaintingSound) {
        const { sound } = await Audio.Sound.createAsync({
          uri: findPaintingSound.sound,
        });
        setSoundState(sound);

        await sound.playAsync();
      }
    }
  }

  function handleClickComplementImage(complement: IComplementItems) {
    if (paintingSelected && complement.is_response) {
      setPaintingImageUrl(complement.image);
      setPaintingSelectedError(false);
      setAcerts(acerts + 1);
    }

    if (paintingSelected && !complement.is_response) {
      setPaintingSelectedError(true);
      setErrors(errors + 1);
    }

    if (modalOptionLegend) {
      Toast.show({
        type: 'legend',
        text1: complement.legend,
        topOffset: 50,
        visibilityTime: 1000,
      });
    }
  }

  async function handleSubmit() {
    if (!userData.token) {
      setModalTaskVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Falha',
        text2: 'Para salvar atividade, faça login!',
        topOffset: 50,
        visibilityTime: 4000,
      });

      return;
    }

    if (userData.token && userData.user.occupation !== 'paciente') {
      setModalTaskVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Falha',
        text2: 'Somente perfil paciente pode salvar atividade!',
        topOffset: 50,
        visibilityTime: 4000,
      });

      return;
    }

    try {
      setIsSubmitting(true);

      const data = {
        activity_id: activityId,
        errors,
        acerts,
        time: `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}:${second.toString().padStart(2, '0')}`,
        reaction: satisfactionSurvey,
        sound: modalOptionSound,
        legend: modalOptionLegend,
        supervised: modalOptionSupervised,
      };

      await api.post('/results', data);

      setModalTaskVisible(false);
      setTaskFinalized(true);

      getSuggestionsActivity({
        errors,
        legend: modalOptionLegend,
        sound: modalOptionSound,
        supervised: modalOptionSupervised,
        like: satisfactionSurvey === 'gostou',
        dislike: satisfactionSurvey === 'nao gostou',
      });
    } catch (error: any) {
      setModalTaskVisible(false);

      if (!!error.response && error.response.status === 401) {
        if (
          error.response.data.message === 'Expired Token/Unauthorized Access!'
        ) {
          Toast.show({
            type: 'error',
            text1: 'Falha',
            text2: 'Sessão expirada, faça login novamente!',
            topOffset: 50,
            visibilityTime: 6000,
          });

          signOut();
          return;
        }
      }

      Toast.show({
        type: 'error',
        text1: 'Falha',
        text2: 'Erro ao enviar dados, tente novamente!',
        topOffset: 50,
        visibilityTime: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <TaskHeader
        title={`Selecione o quadro e\nclique na imagem`}
        onOpenModal={handleOpenModalTask}
      />

      {loading ? (
        <LoadingAnimation />
      ) : hasError ? (
        <LoadingError />
      ) : (
        <>
          <Content>
            <ComplementList>
              {complementData.map(item => (
                <ComplementListButton
                  key={item.id}
                  disabled={!!paintingImageUrl}
                  onPress={() => handleClickComplementImage(item)}
                >
                  <ComplementListButtonImage source={{ uri: item.image }} />
                </ComplementListButton>
              ))}
            </ComplementList>

            <Painting
              disabled={!!paintingImageUrl}
              selected={paintingSelected}
              error={paintingSelectedError}
              onPress={handleClickPainting}
            >
              {paintingImageUrl ? (
                <PaintingImage
                  source={{ uri: paintingImageUrl }}
                  resizeMode="contain"
                />
              ) : (
                <PaintingText
                  selected={paintingSelected}
                  error={paintingSelectedError}
                >
                  {sentence}
                </PaintingText>
              )}
            </Painting>
          </Content>

          <ModalTask visible={modalTaskVisible} animationType="slide">
            <ModalTaskContent>
              <ModalTaskCloseButton onPress={handleCloseModalTask}>
                <Feather
                  name="x"
                  size={RFValue(24)}
                  color={theme.colors.heading_shape}
                />
              </ModalTaskCloseButton>
              <ScrollView showsVerticalScrollIndicator={false}>
                <ModalTaskBody>
                  <ModalTaskTitle>
                    {!taskStarted
                      ? 'Você pode configurar a\natividade antes de\niniciá-la'
                      : taskFinalized
                      ? 'Parabéns! Você finalizou\nesta atividade'
                      : 'Analise e configure\no andamento da\natividade'}
                  </ModalTaskTitle>

                  {taskStarted && (
                    <ModalTaskInfoContent>
                      <ModalTaskInfo>
                        <Feather
                          name="clock"
                          size={RFValue(24)}
                          color={theme.colors.heading_shape}
                        />
                        <ModalTaskInfoText>
                          Tempo de atividade:
                        </ModalTaskInfoText>
                        <ModalTaskInfoResultText>
                          {taskTimeFormatted}
                          {hour !== 0 ? ' h' : minute !== 0 ? ' min' : ' seg'}
                        </ModalTaskInfoResultText>
                      </ModalTaskInfo>
                      <ModalTaskInfo>
                        <Feather
                          name="x-circle"
                          size={RFValue(24)}
                          color={theme.colors.heading_shape}
                        />
                        <ModalTaskInfoText>Erros:</ModalTaskInfoText>
                        <ModalTaskInfoResultText>
                          {errors} {errors !== 1 ? 'erros' : 'erro'}
                        </ModalTaskInfoResultText>
                      </ModalTaskInfo>
                      <ModalTaskInfo>
                        <Feather
                          name="check-circle"
                          size={RFValue(24)}
                          color={theme.colors.heading_shape}
                        />
                        <ModalTaskInfoText>Acertos:</ModalTaskInfoText>
                        <ModalTaskInfoResultText>
                          {acerts} {acerts !== 1 ? 'acertos' : 'acerto'}
                        </ModalTaskInfoResultText>
                      </ModalTaskInfo>
                    </ModalTaskInfoContent>
                  )}

                  <ModalTaskOptions>
                    <ModalTaskOptionsTitle>
                      Ative ou desative algumas{'\n'}opções
                    </ModalTaskOptionsTitle>

                    <ModalTaskOption
                      disabled={taskFinalized}
                      onPress={() =>
                        setModalOptionSound(prevState => !prevState)
                      }
                    >
                      <Feather
                        name={modalOptionSound ? 'check-square' : 'square'}
                        size={RFValue(24)}
                        color={
                          modalOptionSound
                            ? theme.colors.green_dark
                            : theme.colors.heading_shape
                        }
                      />
                      <ModalTaskOptionText active={modalOptionSound}>
                        Som
                      </ModalTaskOptionText>
                    </ModalTaskOption>
                    <ModalTaskOption
                      disabled={taskFinalized}
                      onPress={() =>
                        setModalOptionSupervised(prevState => !prevState)
                      }
                    >
                      <Feather
                        name={modalOptionSupervised ? 'check-square' : 'square'}
                        size={RFValue(24)}
                        color={
                          modalOptionSupervised
                            ? theme.colors.green_dark
                            : theme.colors.heading_shape
                        }
                      />
                      <ModalTaskOptionText active={modalOptionSupervised}>
                        Supervisionado
                      </ModalTaskOptionText>
                    </ModalTaskOption>
                    <ModalTaskOption
                      disabled={taskFinalized}
                      onPress={() =>
                        setModalOptionLegend(prevState => !prevState)
                      }
                    >
                      <Feather
                        name={modalOptionLegend ? 'check-square' : 'square'}
                        size={RFValue(24)}
                        color={
                          modalOptionLegend
                            ? theme.colors.green_dark
                            : theme.colors.heading_shape
                        }
                      />
                      <ModalTaskOptionText active={modalOptionLegend}>
                        Legenda
                      </ModalTaskOptionText>
                    </ModalTaskOption>
                  </ModalTaskOptions>

                  {taskStarted && (
                    <ModalTaskSatisfactionSurvey>
                      <ModalTaskSatisfactionSurveyTitle
                        disabled={satisfactionSurveyDisabled}
                      >
                        Pesquisa de satisfação
                      </ModalTaskSatisfactionSurveyTitle>
                      <ModalTaskSatisfactionSurveyActions>
                        <ModalTaskSatisfactionSurveyActionButton
                          disabled={satisfactionSurveyDisabled || taskFinalized}
                          onPress={() => setSatisfactionSurvey('gostou')}
                        >
                          <ModalTaskSatisfactionSurveyActionButtonSvg
                            selected={satisfactionSurvey === 'gostou'}
                          >
                            <ThumbUpSatisfactionSvg
                              width={RFValue(60)}
                              height={RFValue(60)}
                            />
                          </ModalTaskSatisfactionSurveyActionButtonSvg>
                        </ModalTaskSatisfactionSurveyActionButton>
                        <ModalTaskSatisfactionSurveyActionButton
                          disabled={satisfactionSurveyDisabled || taskFinalized}
                          onPress={() => setSatisfactionSurvey('nao gostou')}
                        >
                          <ModalTaskSatisfactionSurveyActionButtonSvg
                            selected={satisfactionSurvey === 'nao gostou'}
                          >
                            <ThumbDownSatisfactionSvg
                              width={RFValue(60)}
                              height={RFValue(60)}
                            />
                          </ModalTaskSatisfactionSurveyActionButtonSvg>
                        </ModalTaskSatisfactionSurveyActionButton>
                      </ModalTaskSatisfactionSurveyActions>
                      {!satisfactionSurveyDisabled && !satisfactionSurvey && (
                        <ModalTaskSatisfactionSurveyAlert>
                          Avaliação necessária
                        </ModalTaskSatisfactionSurveyAlert>
                      )}
                    </ModalTaskSatisfactionSurvey>
                  )}

                  {!taskStarted && (
                    <ActivityInstructions description="Para realizar esta atividade, você deve selecionar o quadro e clicar na imagem correspondente. Para finalizar sua atividade deverá participar da pesquisa de satisfação." />
                  )}
                </ModalTaskBody>
              </ScrollView>
              <FormButton
                title={
                  taskStarted
                    ? 'FINALIZAR TAREFA'
                    : isSubmitting
                    ? 'ENVIANDO DADOS'
                    : 'INICIAR TAREFA'
                }
                disabled={
                  (taskStarted && !satisfactionSurvey) ||
                  isSubmitting ||
                  taskFinalized
                }
                onPress={taskStarted ? handleSubmit : handleCloseModalTask}
              />
            </ModalTaskContent>
          </ModalTask>
        </>
      )}
    </Container>
  );
}
