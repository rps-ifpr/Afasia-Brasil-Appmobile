import React, { useState, useEffect, useMemo } from 'react';
import { useWindowDimensions, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import {
  VictoryPie,
  VictoryChart,
  VictoryGroup,
  VictoryArea,
  VictoryZoomContainer,
} from 'victory-native';
import Toast from 'react-native-toast-message';
import { format, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import { LoadingError } from '../../../../components/LoadingError';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import { Header } from '../../../../components/SignUp/Header';

import {
  Container,
  HeaderActivityDetails,
  TitleContent,
  TitleLabel,
  TitleName,
  FilterButton,
  Content,
  PieGraphicsGroup,
  PieGraphicContent,
  PieGraphic,
  PieGraphicLabel,
  PieGraphicLegend,
  ChartGraphicContent,
  ChartGraphicLabel,
  ActivityList,
  ActivityTotal,
  ActivityCard,
  ActivityDate,
  ActivityDateText,
  ActivityOptions,
  ActivityOptionText,
  OpenMoreDetailsText,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalTitle,
  ModalActivityDetailsInfo,
  ModalActivityDetailsInfoText,
  ModalActivityDetailsInfoResultText,
  ModalFilterContent,
  ModalFilterBody,
  ModalFilterFooter,
  ModalFilterCloseButton,
  Form,
  ModalOptionsContent,
  ModalOptionsBody,
} from './styles';
import FormInput from '../../../../components/Form/FormInput';
import { FormButton } from '../../../../components/Form/FormButton';
import { Select } from '../../../../components/Form/Select';
import { ModalTitle as ModalTitleComponent } from '../../../../components/SignUp/Modal/ModalTitle';
import { ModalActionButtons } from '../../../../components/SignUp/Modal/ModalActionButtons';
import { ModalSelectionOption } from '../../../../components/SignUp/Modal/ModalSelectionOption';
import { ErrorMessage } from '../../../../components/Form/ErrorMessage';

interface IParams {
  userId: string;
  activityName: string;
  activityType: string;
}

interface IActivityResponse {
  id: string;
  acerts: number;
  errors: number;
  reaction: string;
  time: string;
  legend: boolean;
  sound: boolean;
  supervised: boolean;
  created_at: Date;
}

interface IActivityData extends IActivityResponse {
  createdAtFormatted: string;
}

interface IFormFilterData {
  initialDate: string;
  finalDate: string;
}

interface IFilterOptionsData {
  id: string;
  option: string;
  name: string;
}

type IFilterOptions = 'reaction' | 'orderBy';

const schema = Yup.object().shape({
  initialDate: Yup.string()
    .notRequired()
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      'Data inválida',
    ),
  finalDate: Yup.string()
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
      'Data inválida',
    )
    .notRequired()
    .when('initialDate', {
      is: (val: boolean) => val,
      then: Yup.string().required('Informe também a data final'),
      otherwise: Yup.string(),
    }),
});

export function ReportActivityDetails(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const windowDimensions = useWindowDimensions();

  const [activityData, setActivityData] = useState<IActivityData[]>([]);

  const [soundPercentage, setSoundPercentage] = useState(0);
  const [legendPercentage, setLegendPercentage] = useState(0);
  const [supervisedPercentage, setSupervisedPercentage] = useState(0);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterOptionsModalVisible, setFilterOptionsModalVisible] =
    useState(false);

  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [activitySelected, setActivitySelected] = useState<IActivityData>(
    {} as IActivityData,
  );

  const [filterOptionSelected, setFilterOptionSelected] =
    useState<IFilterOptions>('reaction');

  const [reactionOptionModalSelected, setReactionOptionModalSelected] =
    useState<IFilterOptionsData>({} as IFilterOptionsData);
  const [orderByOptionModalSelected, setOrderByOptionModalSelected] =
    useState<IFilterOptionsData>({} as IFilterOptionsData);

  const [reactionOptionSelected, setReactionOptionSelected] =
    useState<IFilterOptionsData>({} as IFilterOptionsData);
  const [orderByOptionSelected, setOrderByOptionSelected] =
    useState<IFilterOptionsData>({} as IFilterOptionsData);

  const [finalDateExist, setFinalDateExist] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const reactionOptionsData: IFilterOptionsData[] = [
    {
      id: '21d41207-f43f-4695-bc85-034991726c55',
      option: 'gostou',
      name: 'Gostou',
    },
    {
      id: 'b8dfb00e-3454-4b91-a578-5fa114de9d81',
      option: 'nao gostou',
      name: 'Não gostou',
    },
  ];

  const orderByOptionsData: IFilterOptionsData[] = [
    {
      id: '472eb80f-fcea-41c3-b8e3-8b67c4fcf860',
      option: 'mais tempo',
      name: 'Mais tempo',
    },
    {
      id: '6fcbb567-57cb-4c17-9c97-a4d80936b835',
      option: 'menos tempo',
      name: 'Menos Tempo',
    },
    {
      id: '9b837085-ebfd-4518-b8ca-746cb4db87a3',
      option: 'mais erros',
      name: 'Mais erros',
    },
    {
      id: '0292d67b-929b-45c5-a15e-58654a57479c',
      option: 'menos erros',
      name: 'Menos erros',
    },
  ];

  const [zoomDomain, setZoomDomain] = useState();

  const route = useRoute();
  const theme = useTheme();
  const { signOut } = useAuth();

  const { userId, activityName, activityType } = route.params as IParams;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await api.get<IActivityResponse[]>('/results', {
          params: {
            user_id: userId,
            activity_type: activityType,
            orderBy: 'indefinido',
            reaction: 'indefinido',
          },
        });

        if (data.length) {
          const { soundTotal, legendTotal, supervisedTotal } = data.reduce(
            (acc, item) => {
              if (item.sound) {
                acc.soundTotal += 1;
              }

              if (item.legend) {
                acc.legendTotal += 1;
              }

              if (item.supervised) {
                acc.supervisedTotal += 1;
              }

              return acc;
            },
            {
              soundTotal: 0,
              legendTotal: 0,
              supervisedTotal: 0,
            },
          );

          setSoundPercentage(Math.floor((soundTotal * 100) / data.length));
          setLegendPercentage(Math.floor((legendTotal * 100) / data.length));
          setSupervisedPercentage(
            Math.floor((supervisedTotal * 100) / data.length),
          );

          const activityDataSerialized = data.map((item, index) => {
            return {
              ...item,
              activityNumber: data.length - index,
              createdAtFormatted: format(
                new Date(item.created_at),
                "dd/MM/yyyy 'às' HH:mm'h'",
                {
                  locale: ptBR,
                },
              ),
            };
          });

          setActivityData(activityDataSerialized);
        }
      } catch (error: any) {
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
  }, [signOut, activityType, userId]);

  const timeFormatted = useMemo(() => {
    if (activitySelected.id) {
      const timeSplit = activitySelected.time.split(':');

      if (timeSplit[0] !== '00') {
        return `${activitySelected.time} h`;
      }
      if (timeSplit[1] !== '00') {
        return `${timeSplit[1]}:${timeSplit[2]} min`;
      }
      return `${timeSplit[1]}:${timeSplit[2]} seg`;
    }
  }, [activitySelected.id, activitySelected.time]);

  function handleZoom(domain: any) {
    setZoomDomain(domain);
  }

  function handleSelectActivity(item: IActivityData) {
    setActivitySelected(item);
    setActivityModalVisible(true);
  }

  function handleOpenFilterOptionsModal(option: IFilterOptions) {
    if (option === 'reaction') {
      setFilterOptionSelected('reaction');
    }

    if (option === 'orderBy') {
      setFilterOptionSelected('orderBy');
    }

    setFilterOptionsModalVisible(true);
  }

  function handleConfirmFilterOption() {
    if (filterOptionSelected === 'reaction') {
      setReactionOptionSelected(reactionOptionModalSelected);
    }

    if (filterOptionSelected === 'orderBy') {
      setOrderByOptionSelected(orderByOptionModalSelected);
    }

    setFilterOptionsModalVisible(false);
  }

  function handleCancelFilterOption() {
    if (reactionOptionModalSelected.id && !reactionOptionSelected.id) {
      setReactionOptionModalSelected({} as IFilterOptionsData);
    } else {
      setReactionOptionModalSelected(reactionOptionSelected);
    }

    if (orderByOptionModalSelected.id && !orderByOptionSelected.id) {
      setOrderByOptionModalSelected({} as IFilterOptionsData);
    } else {
      setOrderByOptionModalSelected(orderByOptionSelected);
    }

    setFilterOptionsModalVisible(false);
  }

  async function filterWithoutDate() {
    try {
      setIsFiltering(true);

      const { data } = await api.get<IActivityResponse[]>('/results', {
        params: {
          user_id: userId,
          activity_type: activityType,
          orderBy: orderByOptionSelected.id
            ? orderByOptionSelected.option
            : 'indefinido',
          reaction: reactionOptionSelected.id
            ? reactionOptionSelected.option
            : 'indefinido',
        },
      });

      if (data.length) {
        const { soundTotal, legendTotal, supervisedTotal } = data.reduce(
          (acc, item) => {
            if (item.sound) {
              acc.soundTotal += 1;
            }

            if (item.legend) {
              acc.legendTotal += 1;
            }

            if (item.supervised) {
              acc.supervisedTotal += 1;
            }

            return acc;
          },
          {
            soundTotal: 0,
            legendTotal: 0,
            supervisedTotal: 0,
          },
        );

        setSoundPercentage(Math.floor((soundTotal * 100) / data.length));
        setLegendPercentage(Math.floor((legendTotal * 100) / data.length));
        setSupervisedPercentage(
          Math.floor((supervisedTotal * 100) / data.length),
        );

        const activityDataSerialized = data.map((item, index) => {
          return {
            ...item,
            activityNumber: data.length - index,
            createdAtFormatted: format(
              new Date(item.created_at),
              "dd/MM/yyyy 'às' HH:mm'h'",
              {
                locale: ptBR,
              },
            ),
          };
        });

        setActivityData(activityDataSerialized);
        setFilterModalVisible(false);

        setReactionOptionSelected({} as IFilterOptionsData);
        setOrderByOptionSelected({} as IFilterOptionsData);
      } else {
        setFilterModalVisible(false);
        Toast.show({
          type: 'error',
          text1: 'Falha',
          text2: 'Não possui atividades relacionadas a esse filtro!',
          topOffset: 50,
          visibilityTime: 4000,
        });
      }
    } catch {
      setFilterModalVisible(false);

      Toast.show({
        type: 'error',
        text1: 'Falha',
        text2: 'Erro ao buscar os dados!',
        topOffset: 50,
        visibilityTime: 4000,
      });
    } finally {
      setIsFiltering(false);
    }
  }

  async function filterWithDate(formData: IFormFilterData) {
    try {
      setIsFiltering(true);

      const initialDateFormatted = formData.initialDate
        .split('/')
        .reverse()
        .join('-');

      const finalDateFormatted = formData.finalDate
        .split('/')
        .reverse()
        .join('-');

      const { data } = await api.get<IActivityResponse[]>('/results', {
        params: {
          user_id: userId,
          activity_type: activityType,
          orderBy: orderByOptionSelected.id
            ? orderByOptionSelected.option
            : 'indefinido',
          reaction: reactionOptionSelected.id
            ? reactionOptionSelected.option
            : 'indefinido',
          startDate: initialDateFormatted,
          endDate: finalDateFormatted,
        },
      });

      if (data.length) {
        const { soundTotal, legendTotal, supervisedTotal } = data.reduce(
          (acc, item) => {
            if (item.sound) {
              acc.soundTotal += 1;
            }

            if (item.legend) {
              acc.legendTotal += 1;
            }

            if (item.supervised) {
              acc.supervisedTotal += 1;
            }

            return acc;
          },
          {
            soundTotal: 0,
            legendTotal: 0,
            supervisedTotal: 0,
          },
        );

        setSoundPercentage(Math.floor((soundTotal * 100) / data.length));
        setLegendPercentage(Math.floor((legendTotal * 100) / data.length));
        setSupervisedPercentage(
          Math.floor((supervisedTotal * 100) / data.length),
        );

        const activityDataSerialized = data.map((item, index) => {
          return {
            ...item,
            activityNumber: data.length - index,
            createdAtFormatted: format(
              new Date(item.created_at),
              "dd/MM/yyyy 'às' HH:mm'h'",
              {
                locale: ptBR,
              },
            ),
          };
        });

        setActivityData(activityDataSerialized);
        setFilterModalVisible(false);

        reset();
        setReactionOptionSelected({} as IFilterOptionsData);
        setOrderByOptionSelected({} as IFilterOptionsData);
      } else {
        setFilterModalVisible(false);
        Toast.show({
          type: 'error',
          text1: 'Falha',
          text2: 'Não possui atividades relacionadas a esse filtro!',
          topOffset: 50,
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      setFilterModalVisible(false);

      Toast.show({
        type: 'error',
        text1: 'Falha',
        text2: 'Erro ao buscar os dados!',
        topOffset: 50,
        visibilityTime: 4000,
      });
    } finally {
      setIsFiltering(false);
    }
  }

  async function handleSubmitFilter(formData: IFormFilterData) {
    if (
      !formData.initialDate &&
      !formData.finalDate &&
      !reactionOptionSelected.id &&
      !orderByOptionSelected.id
    ) {
      setFilterModalVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Falha',
        text2: 'Preencha ou selecione algum campo para filtrar!',
        topOffset: 50,
        visibilityTime: 4000,
      });

      return;
    }

    if (formData.finalDate && !formData.initialDate) {
      setFinalDateExist(true);
      return;
    }

    if (finalDateExist) {
      setFinalDateExist(false);
    }

    if (!formData.initialDate && !formData.finalDate) {
      filterWithoutDate();

      return;
    }

    if (isAfter(new Date(formData.finalDate), new Date(formData.initialDate))) {
      filterWithDate(formData);
    } else {
      setFilterModalVisible(false);

      Toast.show({
        type: 'error',
        text1: 'Falha',
        text2: 'A data final deve ser posterior a data inicial!',
        topOffset: 50,
        visibilityTime: 4000,
      });
    }
  }

  return (
    <Container>
      <Header hasBullet={false} />
      {loading ? (
        <LoadingAnimation />
      ) : hasError ? (
        <LoadingError />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderActivityDetails>
              <TitleContent>
                <TitleLabel>Atividade</TitleLabel>
                <TitleName>{activityName}</TitleName>
              </TitleContent>

              <FilterButton
                enabled={!!activityData.length}
                onPress={() => setFilterModalVisible(true)}
              >
                <Feather
                  name="filter"
                  size={RFValue(26)}
                  color={theme.colors.heading}
                />
              </FilterButton>
            </HeaderActivityDetails>

            <Content>
              <PieGraphicsGroup>
                <PieGraphicContent>
                  <PieGraphic>
                    <VictoryPie
                      radius={40}
                      innerRadius={30}
                      width={80}
                      height={80}
                      colorScale={[
                        theme.colors.graphic_blue,
                        theme.colors.graphic_blue_overlay,
                      ]}
                      data={[
                        { y: soundPercentage },
                        { y: 100 - soundPercentage },
                      ]}
                    />

                    <PieGraphicLabel>{soundPercentage}%</PieGraphicLabel>
                  </PieGraphic>
                  <PieGraphicLegend>Som</PieGraphicLegend>
                </PieGraphicContent>

                <PieGraphicContent>
                  <PieGraphic>
                    <VictoryPie
                      radius={40}
                      innerRadius={30}
                      width={80}
                      height={80}
                      colorScale={[
                        theme.colors.graphic_green,
                        theme.colors.graphic_green_overlay,
                      ]}
                      data={[
                        { y: legendPercentage },
                        { y: 100 - legendPercentage },
                      ]}
                    />

                    <PieGraphicLabel>{legendPercentage}%</PieGraphicLabel>
                  </PieGraphic>
                  <PieGraphicLegend>Legenda</PieGraphicLegend>
                </PieGraphicContent>

                <PieGraphicContent>
                  <PieGraphic>
                    <VictoryPie
                      radius={40}
                      innerRadius={30}
                      width={80}
                      height={80}
                      colorScale={[
                        theme.colors.graphic_yellow,
                        theme.colors.graphic_yellow_overlay,
                      ]}
                      data={[
                        { y: supervisedPercentage },
                        { y: 100 - supervisedPercentage },
                      ]}
                    />

                    <PieGraphicLabel>{supervisedPercentage}%</PieGraphicLabel>
                  </PieGraphic>
                  <PieGraphicLegend>Supervisionado</PieGraphicLegend>
                </PieGraphicContent>
              </PieGraphicsGroup>

              <ChartGraphicContent>
                <VictoryChart
                  width={windowDimensions.width}
                  height={RFValue(300)}
                  containerComponent={
                    <VictoryZoomContainer
                      zoomDimension="x"
                      zoomDomain={zoomDomain}
                      onZoomDomainChange={handleZoom}
                    />
                  }
                >
                  <VictoryGroup
                    style={{
                      data: {
                        strokeWidth: 3,
                        fillOpacity: 0,
                      },
                    }}
                  >
                    <VictoryArea
                      style={{
                        data: {
                          stroke: theme.colors.graphic_green,
                        },
                      }}
                      data={activityData}
                      y="acerts"
                      x={d => Number(d.activityNumber).toFixed(0)}
                    />
                    <VictoryArea
                      style={{
                        data: { stroke: theme.colors.red },
                      }}
                      data={activityData}
                      y="errors"
                      x={d => Number(d.activityNumber).toFixed(0)}
                    />
                  </VictoryGroup>
                </VictoryChart>

                <ChartGraphicLabel>
                  Acertos/Erros x Atividades
                </ChartGraphicLabel>
              </ChartGraphicContent>

              <ActivityList>
                <ActivityTotal>
                  Total de {activityData.length}
                  {activityData.length !== 1 ? ' atividades' : ' atividade'}
                </ActivityTotal>

                {activityData.map(item => (
                  <ActivityCard
                    key={item.id}
                    onPress={() => handleSelectActivity(item)}
                  >
                    <ActivityDate>
                      <Feather
                        name="calendar"
                        size={RFValue(24)}
                        color={theme.colors.white}
                      />
                      <ActivityDateText>
                        {item.createdAtFormatted}
                      </ActivityDateText>
                    </ActivityDate>

                    <ActivityOptions>
                      <ActivityOptionText active={item.sound}>
                        Som
                      </ActivityOptionText>
                      <ActivityOptionText active={item.legend}>
                        Legenda
                      </ActivityOptionText>
                      <ActivityOptionText active={item.supervised}>
                        Supervisionado
                      </ActivityOptionText>
                    </ActivityOptions>

                    <OpenMoreDetailsText>
                      Clique para mais detalhes
                    </OpenMoreDetailsText>
                  </ActivityCard>
                ))}
              </ActivityList>
            </Content>
          </ScrollView>
        </>
      )}

      <Modal
        visible={activityModalVisible}
        animationType="slide"
        onRequestClose={() => setActivityModalVisible(false)}
      >
        <ModalContent>
          <ModalCloseButton onPress={() => setActivityModalVisible(false)}>
            <Feather
              name="x"
              size={RFValue(24)}
              color={theme.colors.heading_shape}
            />
          </ModalCloseButton>

          <ScrollView showsVerticalScrollIndicator={false}>
            <ModalBody>
              <ModalTitle>Detalhes da{'\n'}atividade</ModalTitle>

              <ModalActivityDetailsInfo>
                <Feather
                  name="clock"
                  size={RFValue(24)}
                  color={theme.colors.heading_shape}
                />
                <ModalActivityDetailsInfoText>
                  Tempo de atividade:
                </ModalActivityDetailsInfoText>
                <ModalActivityDetailsInfoResultText>
                  {timeFormatted}
                </ModalActivityDetailsInfoResultText>
              </ModalActivityDetailsInfo>
              <ModalActivityDetailsInfo>
                <Feather
                  name="x-circle"
                  size={RFValue(24)}
                  color={theme.colors.heading_shape}
                />
                <ModalActivityDetailsInfoText>
                  Erros:
                </ModalActivityDetailsInfoText>
                <ModalActivityDetailsInfoResultText>
                  {activitySelected.errors}
                  {activitySelected.errors !== 1 ? ' erros' : ' erro'}
                </ModalActivityDetailsInfoResultText>
              </ModalActivityDetailsInfo>
              <ModalActivityDetailsInfo>
                <Feather
                  name="check-circle"
                  size={RFValue(24)}
                  color={theme.colors.heading_shape}
                />
                <ModalActivityDetailsInfoText>
                  Acertos:
                </ModalActivityDetailsInfoText>
                <ModalActivityDetailsInfoResultText>
                  {activitySelected.acerts}
                  {activitySelected.acerts !== 1 ? ' acertos' : ' acerto'}
                </ModalActivityDetailsInfoResultText>
              </ModalActivityDetailsInfo>
              <ModalActivityDetailsInfo>
                <Feather
                  name="smile"
                  size={RFValue(24)}
                  color={theme.colors.heading_shape}
                />
                <ModalActivityDetailsInfoText>
                  Reação:
                </ModalActivityDetailsInfoText>
                <ModalActivityDetailsInfoResultText>
                  {activitySelected.reaction === 'nao gostou'
                    ? 'Não gostou'
                    : 'Gostou'}
                </ModalActivityDetailsInfoResultText>
              </ModalActivityDetailsInfo>
              <ModalActivityDetailsInfo>
                <Feather
                  name="volume-2"
                  size={RFValue(24)}
                  color={theme.colors.heading_shape}
                />
                <ModalActivityDetailsInfoText>
                  Som:
                </ModalActivityDetailsInfoText>
                <ModalActivityDetailsInfoResultText>
                  {activitySelected.sound ? 'Sim' : 'Não'}
                </ModalActivityDetailsInfoResultText>
              </ModalActivityDetailsInfo>
              <ModalActivityDetailsInfo>
                <Feather
                  name="type"
                  size={RFValue(24)}
                  color={theme.colors.heading_shape}
                />
                <ModalActivityDetailsInfoText>
                  Legenda:
                </ModalActivityDetailsInfoText>
                <ModalActivityDetailsInfoResultText>
                  {activitySelected.legend ? 'Sim' : 'Não'}
                </ModalActivityDetailsInfoResultText>
              </ModalActivityDetailsInfo>
              <ModalActivityDetailsInfo>
                <Feather
                  name="eye"
                  size={RFValue(24)}
                  color={theme.colors.heading_shape}
                />
                <ModalActivityDetailsInfoText>
                  Supervisionado:
                </ModalActivityDetailsInfoText>
                <ModalActivityDetailsInfoResultText>
                  {activitySelected.supervised ? 'Sim' : 'Não'}
                </ModalActivityDetailsInfoResultText>
              </ModalActivityDetailsInfo>
            </ModalBody>
          </ScrollView>
        </ModalContent>
      </Modal>

      <Modal
        visible={filterModalVisible}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <ModalFilterContent>
          <ModalFilterCloseButton onPress={() => setFilterModalVisible(false)}>
            <Feather
              name="x"
              size={RFValue(24)}
              color={theme.colors.heading_shape}
            />
          </ModalFilterCloseButton>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <ModalFilterBody>
              <ModalTitle>Filtre por</ModalTitle>
              <Form>
                <FormInput
                  control={control}
                  name="initialDate"
                  error={errors.initialDate && errors.initialDate.message}
                  icon="calendar"
                  placeholder="Data inicial (ex: 01/02/2021)"
                />
                {finalDateExist && (
                  <ErrorMessage message="Informe também a data inicial" />
                )}

                <FormInput
                  control={control}
                  name="finalDate"
                  error={errors.finalDate && errors.finalDate.message}
                  icon="calendar"
                  placeholder="Data final (ex: 01/02/2021)"
                />

                <Select
                  icon="smile"
                  active={!!reactionOptionSelected.id}
                  title={
                    reactionOptionSelected.id
                      ? reactionOptionSelected.name
                      : 'Reação'
                  }
                  onPress={() => handleOpenFilterOptionsModal('reaction')}
                />

                <Select
                  icon="sliders"
                  active={!!orderByOptionSelected.id}
                  title={
                    orderByOptionSelected.id
                      ? orderByOptionSelected.name
                      : 'Ordenar por'
                  }
                  onPress={() => handleOpenFilterOptionsModal('orderBy')}
                />
              </Form>
            </ModalFilterBody>
          </ScrollView>
          <ModalFilterFooter>
            <FormButton
              disabled={isFiltering}
              title={isFiltering ? 'BUSCANDO DADOS' : 'FILTRAR'}
              onPress={handleSubmit(handleSubmitFilter)}
            />
          </ModalFilterFooter>
        </ModalFilterContent>

        <Modal visible={filterOptionsModalVisible} animationType="slide">
          <ModalOptionsContent>
            <ModalTitleComponent title="Selecione uma opção" />

            {filterOptionSelected === 'reaction' &&
              reactionOptionsData.map(item => (
                <ModalOptionsBody key={item.id}>
                  <ModalSelectionOption
                    active={reactionOptionModalSelected.id === item.id}
                    title={item.name}
                    onSelect={() => setReactionOptionModalSelected(item)}
                  />
                </ModalOptionsBody>
              ))}

            {filterOptionSelected === 'orderBy' &&
              orderByOptionsData.map(item => (
                <ModalOptionsBody key={item.id}>
                  <ModalSelectionOption
                    active={orderByOptionModalSelected.id === item.id}
                    title={item.name}
                    onSelect={() => setOrderByOptionModalSelected(item)}
                  />
                </ModalOptionsBody>
              ))}

            <ModalActionButtons
              disabled={false}
              onCancel={handleCancelFilterOption}
              onConfirm={handleConfirmFilterOption}
            />
          </ModalOptionsContent>
        </Modal>
      </Modal>
    </Container>
  );
}
