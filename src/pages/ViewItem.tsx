import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import {IInventoryItem, Inventory} from '../services/inventory';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {ListItemStackParamList} from '../models/navigationTypes';

type ViewItemScreenNavigationProp = NativeStackNavigationProp<
  ListItemStackParamList,
  'ViewItem'
>;
type ViewItemScreenRouteProp = RouteProp<ListItemStackParamList, 'ViewItem'>;

type Props = {
  navigation: ViewItemScreenNavigationProp;
  route: ViewItemScreenRouteProp;
};

const inventory = new Inventory();

const ViewItem: React.FC<Props> = ({navigation, route}) => {
  const [item, setItem] = useState<IInventoryItem | null>(null);
  const navigationHook = useNavigation();
  const fetchItem = async () => {
    setItem(await inventory.read(route.params.id));
  };
  useEffect(() => {
    const handleScreenFocus = () => {
      fetchItem();
    };

    // Subscribe to the focus event
    const unsubscribe = navigationHook.addListener('focus', handleScreenFocus);

    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigationHook]);

  const handleDeleteItem = useCallback(() => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            if (item) {
              await inventory.delete(item.id);
              navigation.goBack();
            }
          },
        },
      ],
      {cancelable: false},
    );
  }, [item, navigation]);

  useEffect(() => {
    fetchItem();
    return () => {
      fetchItem();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!item) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text>Name</Text>
        <Text style={styles.body}>{item.name}</Text>
        <Text>Description</Text>
        <Text style={styles.body}>{item.description}</Text>
        <Text>Total Stock</Text>
        <Text style={styles.body}>{item.totalStock}</Text>
        <Text>Price</Text>
        <Text style={styles.price}>
          {inventory.formatCurrency(Number(item?.price?.toFixed(2)))}
        </Text>
      </View>
      <Button
        title="Edit Item"
        onPress={() => navigation.navigate('EditItem', {id: item.id})}
      />
      <Button title="Delete Item" color={'red'} onPress={handleDeleteItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {flex: 1, marginTop: 30},
  body: {
    fontSize: 20,
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
  },
  container: {
    marginHorizontal: 10,
    flexDirection: 'column',
    height: Dimensions.get('screen').height - 150,
    gap: 5,
  },
});
export default ViewItem;
