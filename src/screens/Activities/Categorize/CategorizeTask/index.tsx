import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Toast from 'react-native-toast-message';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import ThumbUpSatisfactionSvg from '../../../../assets/thumb-up-satisfaction.svg';
import ThumbDownSatisfactionSvg from '../../../../assets/thumb-down-satisfaction.svg';

import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';
import { getMergeArraysAlternated } from '../../../../utils/getMergeArraysAlternated';
import { getSuggestionsActivity } from '../../../../utils/getSuggestionsActivity';

import { TaskHeader } from '../../../../components/TaskHeader';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import { LoadingError } from '../../../../components/LoadingError';
import { FormButton } from '../../../../components/Form/FormButton';
import { ListEmpty } from '../../../../components/ListEmpty';
import { ActivityInstructions } from '../../../../components/ActivityInstructions';

import {
  Container,
  Content,
  ImagesList,
  ImageCategoriesButton,
  ImageCategories,
  Columns,
  FirstColumn,
  SeparatorColumn,
  SecondColumn,
  ColumnHeader,
  ColumnHeaderTitle,
  ColumnHeaderImage,
  ColumnList,
  ColumnListImage,
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
  firstCategoryId: string;
  secondCategoryId: string;
}

interface ICategoriesData {
  id: string;
  name: string;
  items: {
    id: string;
    category_id: string;
    is_reference: boolean;
    legend: string;
    image: string;
    sound: string;
  }[];
}

interface IItemsData {
  id: string;
  category_id: string;
  is_reference: boolean;
  legend: string;
  image: string;
  sound: string;
}

interface IColumnHeader {
  category_name: string;
  legend: string;
  image: string;
}

type ISatisfactionSurvey = 'gostou' | 'nao gostou';

let taskTime: NodeJS.Timeout;

export function CategorizeTask(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [taskStarted, setTaskStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskFinalized, setTaskFinalized] = useState(false);

  const [modalTaskVisible, setModalTaskVisible] = useState(true);
  const [modalOptionSound, setModalOptionSound] = useState(false);
  const [modalOptionSupervised, setModalOptionSupervised] = useState(false);
  const [modalOptionLegend, setModalOptionLegend] = useState(false);

  const [timerIsActive, setTimerIsActive] = useState(false);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const [satisfactionSurvey, setSatisfactionSurvey] =
    useState<ISatisfactionSurvey>();
  const [satisfactionSurveyDisabled, setSatisfactionSurveyDisabled] =
    useState(true);

  const [acerts, setAcerts] = useState(0);
  const [errors, setErrors] = useState(0);

  const [soundState, setSoundState] = useState<Audio.Sound>();
  const [categories, setCategories] = useState<IItemsData[]>([]);

  const [firstColumnCategoryHeader, setFirstColumnCategoryHeader] =
    useState<IColumnHeader>({} as IColumnHeader);

  const [secondColumnCategoryHeader, setSecondColumnCategoryHeader] =
    useState<IColumnHeader>({} as IColumnHeader);

  const [imageCategorySelected, setImageCategorySelected] =
    useState<IItemsData>({} as IItemsData);

  const [firstColumnCategory, setFirstColumnCategory] = useState<IItemsData[]>(
    [],
  );
  const [secondColumnCategory, setSecondColumnCategory] = useState<
    IItemsData[]
  >([]);

  const [imageSelectedError, setImageSelectedError] = useState(false);

  const route = useRoute();
  const theme = useTheme();
  const { userData, signOut } = useAuth();

  const { activityId, firstCategoryId, secondCategoryId } =
    route.params as IParams;

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
    if (!categories.length && !loading) {
      setTimerIsActive(false);
      setSatisfactionSurveyDisabled(false);
      setModalTaskVisible(true);
    }
  }, [categories.length, loading]);

  useEffect(() => {
    return () => {
      clearTimeout(taskTime);
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get<ICategoriesData[]>(
          '/activities/categorize/details',
          {
            params: { activity_id: activityId },
          },
        );

        const firstCategory = data.filter(
          item => item.id === `${firstCategoryId}`,
        );

        const secondCategory = data.filter(
          item => item.id === `${secondCategoryId}`,
        );

        const firstCategoryFiltered = firstCategory[0].items.filter(
          item => !item.is_reference,
        );

        const secondCategoryFiltered = secondCategory[0].items.filter(
          item => !item.is_reference,
        );

        const firstColumnCategoryHeaderFiltered = firstCategory[0].items.filter(
          item => item.is_reference,
        );

        const secondColumnCategoryHeaderFiltered =
          secondCategory[0].items.filter(item => item.is_reference);

        setCategories(
          getMergeArraysAlternated(
            firstCategoryFiltered,
            secondCategoryFiltered,
          ),
        );

        setFirstColumnCategoryHeader({
          category_name: firstCategory[0].name,
          ...firstColumnCategoryHeaderFiltered[0],
        });

        setSecondColumnCategoryHeader({
          category_name: secondCategory[0].name,
          ...secondColumnCategoryHeaderFiltered[0],
        });
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
  }, [activityId, firstCategoryId, secondCategoryId]);

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

  async function handleSelectImageCategories(item: IItemsData) {
    setImageCategorySelected(item);

    if (imageSelectedError && item.id !== imageCategorySelected.id) {
      setImageSelectedError(false);
    }

    if (!timerIsActive) {
      setTimerIsActive(true);
    }

    if (modalOptionSound) {
      const { sound } = await Audio.Sound.createAsync({ uri: item.sound });
      setSoundState(sound);

      await sound.playAsync();
    }

    if (modalOptionLegend) {
      Toast.show({
        type: 'legend',
        text1: item.legend,
        topOffset: 50,
        visibilityTime: 1000,
      });
    }

    if (!taskStarted) {
      setTaskStarted(true);
    }
  }

  function handleClickColumn(column: 'firstColumn' | 'secondColumn') {
    if (!imageCategorySelected.category_id) {
      return;
    }

    if (column === 'firstColumn') {
      if (imageCategorySelected.category_id !== firstCategoryId) {
        setImageSelectedError(true);
        setErrors(errors + 1);
        return;
      }
      setFirstColumnCategory([...firstColumnCategory, imageCategorySelected]);
      const categoriesFiltered = categories.filter(
        item => item.id !== imageCategorySelected.id,
      );
      setCategories(categoriesFiltered);
      setImageCategorySelected({} as IItemsData);
      setAcerts(acerts + 1);
    } else {
      if (imageCategorySelected.category_id !== secondCategoryId) {
        setImageSelectedError(true);
        setErrors(errors + 1);
        return;
      }
      setSecondColumnCategory([...secondColumnCategory, imageCategorySelected]);
      const categoriesFiltered = categories.filter(
        item => item.id !== imageCategorySelected.id,
      );
      setCategories(categoriesFiltered);
      setImageCategorySelected({} as IItemsData);
      setAcerts(acerts + 1);
    }
  }

  function handleOpenModalTask() {
    setModalTaskVisible(true);
  }

  function handleCloseModalTask() {
    setModalTaskVisible(false);
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
        title={`Clique na imagem para\nselecionar`}
        onOpenModal={handleOpenModalTask}
      />

      {loading ? (
        <LoadingAnimation />
      ) : hasError ? (
        <LoadingError />
      ) : (
        <>
          <Content>
            <ImagesList
              data={categories}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ImageCategoriesButton
                  error={
                    imageSelectedError && item.id === imageCategorySelected.id
                  }
                  active={item.id === imageCategorySelected.id}
                  onPress={() => handleSelectImageCategories(item)}
                >
                  <ImageCategories
                    source={{ uri: item.image }}
                    resizeMode="contain"
                  />
                </ImageCategoriesButton>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <ListEmpty title="Todas as imagens foram selecionadas" />
              }
            />
          </Content>

          <Columns>
            <FirstColumn>
              <ColumnHeader
                disabled={!categories.length}
                onPress={() => handleClickColumn('firstColumn')}
              >
                <ColumnHeaderTitle>
                  CATEGORIA{'\n'}
                  {firstColumnCategoryHeader.category_name}
                </ColumnHeaderTitle>
                <ColumnHeaderImage
                  source={{ uri: firstColumnCategoryHeader.image }}
                  resizeMode="contain"
                />
              </ColumnHeader>

              <ColumnList
                data={firstColumnCategory}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <ColumnListImage
                    source={{ uri: item.image }}
                    resizeMode="contain"
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            </FirstColumn>
            <SeparatorColumn />
            <SecondColumn>
              <ColumnHeader
                disabled={!categories.length}
                onPress={() => handleClickColumn('secondColumn')}
              >
                <ColumnHeaderTitle>
                  CATEGORIA{'\n'}
                  {secondColumnCategoryHeader.category_name}
                </ColumnHeaderTitle>
                <ColumnHeaderImage
                  source={{ uri: secondColumnCategoryHeader.image }}
                  resizeMode="contain"
                />
              </ColumnHeader>
              <ColumnList
                data={secondColumnCategory}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <ColumnListImage
                    source={{ uri: item.image }}
                    resizeMode="contain"
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            </SecondColumn>
          </Columns>

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
                    <ActivityInstructions description="Para realizar esta atividade, você deve selecionar a imagem e clicar no cabeçalho da coluna escolhida. Para finalizar sua atividade deverá participar da pesquisa de satisfação." />
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
