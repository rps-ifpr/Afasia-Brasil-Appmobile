import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import api from '../services/api';

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthState {
  user: {
    id: string;
    occupation: string;
  };
  token: string;
}

interface IAuthContext {
  userData: IAuthState;
  loading: boolean;
  signIn: (credentials: ISignInCredentials) => Promise<void>;
  signOut: () => void;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: IAuthProvider): JSX.Element {
  const [userData, setUserData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const token = await AsyncStorage.getItem('@AfasicosBrasil:token');
      const user = await AsyncStorage.getItem('@AfasicosBrasil:user');

      if (token && user) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUserData({ user: JSON.parse(user), token });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password });

      const { token, user } = response.data;

      await AsyncStorage.setItem('@AfasicosBrasil:token', token.token);
      await AsyncStorage.setItem('@AfasicosBrasil:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token.token}`;

      setUserData({ user, token: token.token });
    } catch (error: any) {
      if (
        !!error.response &&
        error.response.data.message === 'Email/password is incorrect!'
      ) {
        Toast.show({
          type: 'error',
          text1: 'Falha',
          text2: 'E-mail ou senha incorretos!',
          topOffset: 50,
          visibilityTime: 4000,
        });
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Ocorreu um erro durante o login, tente novamente!',
        topOffset: 50,
        visibilityTime: 4000,
      });
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@AfasicosBrasil:token');
    await AsyncStorage.removeItem('@AfasicosBrasil:user');

    setUserData({} as IAuthState);
  }

  return (
    <AuthContext.Provider value={{ userData, signIn, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
