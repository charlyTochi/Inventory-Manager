import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IInventoryItem, Inventory} from '../services/inventory';
import {ListItemsScreenProps} from '../models/navigationTypes';
import {UserAccountContext} from '../contexts/UserAccountContext';

const inventory = new Inventory();
const {height} = Dimensions.get('window');

const ListItems: React.FC<ListItemsScreenProps> = ({navigation}) => {
  const [items, setItems] = useState<IInventoryItem[]>([]);
  const {logout, loginUserToken} = useContext(UserAccountContext) ?? {};
  useEffect(() => {
    // Define an asynchronous function that fetches data from an inventory
    const fetchInventories = async () => {
      // Wait for the inventory to return all items
      const allItems = await inventory.readAll();

      // Filter out the items that don't belong to the currently logged in user
      const filteredData = allItems.filter(
        item => item.user === loginUserToken,
      );

      // Set the state with the filtered data
      setItems(filteredData);
    };

    // Add a listener to the navigation object that executes the fetchInventories function when the screen is focused
    const unsubscribe = navigation.addListener('focus', fetchInventories);

    // Return the unsubscribe function for cleanup operations
    return unsubscribe;
  }, [loginUserToken, navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => logout()} />
      {items.length === 0 ? (
        <>
          <View style={styles.noDataDiv}>
            <Text style={styles.noDataText}>No Inventory Item Found</Text>
            <Button
              title="Create Item"
              onPress={() => navigation.navigate('CreateItem')}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Name</Text>
            <Text style={[styles.tableHeaderText, {textAlign: 'center'}]}>
              Quantity
            </Text>
            <Text style={[styles.tableHeaderText, {textAlign: 'right'}]}>
              Price
            </Text>
          </View>
          <View style={styles.flatList}>
            <FlatList
              data={items}
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.listItem}
                  onPress={() =>
                    navigation.navigate('ViewItem', {id: item.id})
                  }>
                  <Text style={styles.listText}>{item.name}</Text>
                  <Text style={[styles.listText, {textAlign: 'center'}]}>
                    {item.totalStock}
                  </Text>
                  <Text style={[styles.priceText]}>
                    {inventory?.formatCurrency(Number(item?.price?.toFixed(2)))}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
          <Button
            title="Create Item"
            onPress={() => navigation.navigate('CreateItem')}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listText: {
    flex: 1,
    textTransform: 'capitalize',
  },
  priceText: {
    flex: 1,
    textAlign: 'right',
  },
  container: {
    marginHorizontal: 10,
    flexDirection: 'column',
    height: Dimensions.get('screen').height - 150,
  },
  flatList: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },
  tableHeaderText: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 5,
    elevation: 1,
    borderWidth: 0.3,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  noDataDiv: {
    position: 'relative',
    top: height / 2.5,
    bottom: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItems;
