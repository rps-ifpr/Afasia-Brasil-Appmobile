/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Toast from 'react-native-toast-message';

interface ISuggestionsActivityProps {
  errors: number;
  sound: boolean;
  legend: boolean;
  supervised: boolean;
  like: boolean;
  dislike: boolean;
}

function getSuggestionsActivity({
  errors,
  sound,
  legend,
  supervised,
  like,
  dislike,
}: ISuggestionsActivityProps) {
  if (errors === 0 && !sound && !legend && supervised && like) {
    return Toast.show({
      type: 'success',
      text1: 'Atividade cadastrada',
      text2: 'Parabéns, não teve erros! Agora tente sem a supervisão.',
      topOffset: 50,
      visibilityTime: 6000,
    });
  }

  if (errors === 0 && sound && !legend && !supervised && like) {
    return Toast.show({
      type: 'success',
      text1: 'Atividade cadastrada',
      text2: 'Parabéns, não teve erros! Agora tente sem som.',
      topOffset: 50,
      visibilityTime: 6000,
    });
  }

  if (errors === 0 && !sound && legend && !supervised && like) {
    return Toast.show({
      type: 'success',
      text1: 'Atividade cadastrada',
      text2: 'Parabéns, não teve erros! Agora tente sem legenda.',
      topOffset: 50,
      visibilityTime: 6000,
    });
  }

  if (errors !== 0 && !sound && !legend && supervised && like) {
    return Toast.show({
      type: 'success',
      text1: 'Atividade cadastrada',
      text2: 'Teve algum erro! Tente sem supervisão e adicione som.',
      topOffset: 50,
      visibilityTime: 6000,
    });
  }

  if (errors !== 0 && !sound && !legend && !supervised && like) {
    return Toast.show({
      type: 'success',
      text1: 'Atividade cadastrada',
      text2:
        'Teve algum erro! Continue sem supervisão e adicione som ou legenda.',
      topOffset: 50,
      visibilityTime: 6000,
    });
  }

  if (errors === 0 && !sound && !legend && supervised && dislike) {
    return Toast.show({
      type: 'success',
      text1: 'Atividade cadastrada',
      text2:
        'Que pena não ter gostado! Não teve erro, tente com som ou legenda.',
      topOffset: 50,
      visibilityTime: 6000,
    });
  }

  if (errors !== 0 && !sound && !legend && supervised && dislike) {
    return Toast.show({
      type: 'success',
      text1: 'Atividade cadastrada',
      text2:
        'Que pena não ter gostado! Mesmo com erros, continue com supervisão.',
      topOffset: 50,
      visibilityTime: 6000,
    });
  }

  if (errors === 0 && !sound && !legend && !supervised && dislike) {
    return Toast.show({
      type: 'success',
      text1: 'Atividade cadastrada',
      text2:
        'Que pena não ter gostado! Não teve erros, tente com som ou legenda.',
      topOffset: 50,
      visibilityTime: 6000,
    });
  }

  return Toast.show({
    type: 'success',
    text1: 'Sucesso',
    text2: 'Atividade cadastrada com sucesso!',
    topOffset: 50,
    visibilityTime: 6000,
  });
}

export { getSuggestionsActivity };
