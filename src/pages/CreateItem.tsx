import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Inventory} from '../services/inventory';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ListItemStackParamList} from '../models/navigationTypes';
import {asyncGetData} from '../services/dataGenerator';
import {STORAGE_KEYS} from '../services/enums';
import Form from '../components/Form';
import * as Yup from 'yup';

type CreateItemScreenNavigationProp = NativeStackNavigationProp<
  ListItemStackParamList,
  'CreateItem'
>;

type Props = {
  navigation: CreateItemScreenNavigationProp;
};

const inventory = new Inventory();

const CreateItem: React.FC<Props> = ({navigation}) => {
  const [loggedInUserToken, setLoggedInUserToken] = useState('');

  const getLoggedInToken = async () => {
    await asyncGetData(STORAGE_KEYS.TOKEN).then(data => {
      if (data) {
        setLoggedInUserToken(data);
      }
    });
  };

  useEffect(() => {
    getLoggedInToken();
  }, []);

  const handleCreateItem = async (values: {
    name: any;
    totalStock: string;
    price: string;
    description: any;
  }) => {
    try {
      await inventory.create({
        id: inventory.generateID(),
        name: values.name,
        totalStock: parseInt(values.totalStock, 10),
        price: parseFloat(values.price),
        description: values.description,
        user: loggedInUserToken,
      });
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const initialValues = {
    name: '',
    description: '',
    totalStock: '',
    price: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string()
      .min(3, 'Name must be at least 3 characters long')
      .required('Description is required'),
    totalStock: Yup.number()
      .required('Total stock is required')
      .positive('Total stock must be positive'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive'),
  });

  return (
    <View>
      <Form
        initialValues={initialValues}
        onSubmit={handleCreateItem}
        validationSchema={validationSchema}
        submitButtonText="Save"
      />
    </View>
  );
};

export default CreateItem;
