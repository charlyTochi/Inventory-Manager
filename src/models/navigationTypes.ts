import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type ListItemStackParamList = {
  Splash: undefined;
  Login: undefined;
  ListItems: undefined;
  CreateItem: undefined;
  ViewItem: {id: string};
  EditItem: {id: string};
};


export type LoginScreenProps = NativeStackScreenProps<
  ListItemStackParamList,
  'Login'
>;

export type ListItemsScreenProps = NativeStackScreenProps<
  ListItemStackParamList,
  'ListItems'
>;
export type CreateItemScreenProps = NativeStackScreenProps<
  ListItemStackParamList,
  'CreateItem'
>;
export type ViewItemScreenProps = NativeStackScreenProps<
  ListItemStackParamList,
  'ViewItem'
>;
export type EditItemScreenProps = NativeStackScreenProps<
  ListItemStackParamList,
  'EditItem'
>;
