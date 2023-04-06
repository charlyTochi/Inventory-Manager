import React, {createContext, useState, useEffect, useCallback} from 'react';
import {asyncGetData, asyncStoreData} from '../services/dataGenerator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from '../services/enums';

// Defining the shape of the UserAccountContext
interface UserAccountContext {
  users: Users[];
  setUsers: React.Dispatch<React.SetStateAction<Users[]>>;
  persistUserAccount: (data: Users[]) => void;
  loginUserToken: any;
  setToken: (token: string) => void;
  logout: () => void;
  setLoginUserToken: (token: any) => void;
}

// Defining the shape of the Users object
interface Users {
  email: string;
  password: string;
  token: string;
}

// Creating a context for the UserAccountContext
export const UserAccountContext = createContext<UserAccountContext>({
  users: [],
  setUsers: () => [],
  persistUserAccount: () => {},
  loginUserToken: '',
  setToken: () => {},
  logout: () => {},
  setLoginUserToken: () => '',
});

// Destructuring the Provider from the UserAccountContext
const {Provider} = UserAccountContext;

// Defining a React functional component for the UserAccountProvider
const UserAccountProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  // Defining state variables using the useState hook
  const [users, setUsers] = useState<any>([]); // Using any since the type of data is not specified
  const [loginUserToken, setLoginUserToken] = useState<any>(''); // Using any since the type of data is not specified

  // A function to store user data in async storage
  const persistUserAccount = (data: Users[]) => {
    asyncStoreData(STORAGE_KEYS.USER, JSON.stringify(data));
  };

  // A function to retrieve user data from async storage
  const getUserFromStorage = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    asyncGetData(STORAGE_KEYS.USER).then(data => {
      if (data) {
        return data;
      } else {
        console.log('No data found');
      }
    });
  };

  // A function to retrieve login token from async storage
  const getTokenFromStorage = () => {
    asyncGetData(STORAGE_KEYS.TOKEN).then(data => {
      if (data) {
        setLoginUserToken(data);
      }
    });
  };

  // A function to logout the user
  const logout = useCallback(() => {
    AsyncStorage.removeItem(STORAGE_KEYS.TOKEN)
      .then(() => {
        setLoginUserToken('');
      })
      .catch(error => {
        console.log('Error removing token from storage: ', error);
      });
  }, []);

  // A function to set the login token in async storage
  const setToken = (token: string) => {
    asyncStoreData(STORAGE_KEYS.TOKEN, token);
  };

  // useEffect hook to retrieve user and token data from async storage
  useEffect(() => {
    getUserFromStorage();
    getTokenFromStorage();
  }, [loginUserToken]);

  // useEffect hook to persist user data in async storage when the 'users' state variable changes
  useEffect(() => {
    if (users.length !== 0) {
      persistUserAccount(users);
    }
  }, [users]);

  // Returning the Provider with the state variables and functions passed in as context values

  return (
    <Provider
      value={{
        users,
        setUsers,
        loginUserToken,
        setLoginUserToken,
        persistUserAccount,
        setToken,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export default UserAccountProvider;
