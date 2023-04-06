import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {IInventoryItem, Inventory} from '../services/inventory';
import {EditItemScreenProps} from '../models/navigationTypes';
import Form from '../components/Form';
import * as Yup from 'yup';

const inventory = new Inventory();
const {height} = Dimensions.get('window');

const EditItem: React.FC<EditItemScreenProps> = ({navigation, route}) => {
  const [item, setItem] = useState<IInventoryItem | null>(null);
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    totalStock: '',
    price: '',
  });

  useEffect(() => {
    const fetchItem = async () => {
      const fetchedItem = await inventory.read(route.params.id);
      if (fetchedItem) {
        setItem(fetchedItem);
        setInitialValues({
          name: fetchedItem.name,
          description: fetchedItem.description,
          totalStock: fetchedItem.totalStock.toString(),
          price: fetchedItem.price.toString(),
        });
      }
    };

    fetchItem();
  }, [route.params.id]);

  if (!item) {
    return (
      <View style={styles.noDataDiv}>
        <ActivityIndicator />
      </View>
    );
  }

  const handleUpdateItem = async (values: any) => {
    try {
      await inventory.update(item.id, {
        name: values.name,
        totalStock: parseInt(values.totalStock, 10),
        price: parseFloat(values.price),
        description: values.description,
      });
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
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
      {initialValues.name && (
        <Form
          initialValues={initialValues}
          onSubmit={handleUpdateItem}
          validationSchema={validationSchema}
          submitButtonText="Save"
        />
      )}
    </View>
  );
};

export default EditItem;

const styles = StyleSheet.create({
  noDataDiv: {
    position: 'relative',
    top: height / 2.5,
    bottom: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
