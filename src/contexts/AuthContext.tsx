import React, {createContext, useContext, useState} from 'react';
import {asyncStoreData, generateToken} from '../services/dataGenerator';
import {STORAGE_KEYS} from '../services/enums';
import UserAccountProvider, {UserAccountContext} from './UserAccountContext';

interface AuthContextData {
  isLoggedIn: boolean;
  login: (credentials: LoginProps) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

type LoginProps = {email: string; password: string};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

  return <UserAccountProvider>{children}</UserAccountProvider>;
};
