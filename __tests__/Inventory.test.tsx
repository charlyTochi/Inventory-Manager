import AsyncStorage from '@react-native-async-storage/async-storage';
import {IInventoryItem, Inventory} from '../src/services/inventory';

jest.mock('@react-native-async-storage/async-storage');

describe('Inventory CRUD operations', () => {
  const inventory = new Inventory();

  beforeEach(() => {
    AsyncStorage.clear();
  });

  it('should create an item', async () => {
    const item: IInventoryItem = {
      id: '1',
      name: 'Test Item',
      quantity: 10,
      price: 100.0,
      description: '',
      user: '',
    };

    await inventory.create(item);
    const storedItem = (await AsyncStorage.getItem('inventory')) ?? '[]';
    expect(storedItem).toEqual([item]);
  });

  it('should read an item', async () => {
    const item: IInventoryItem = {
      id: '1',
      name: 'Test Item',
      quantity: 10,
      price: 100.0,
      description: '',
      user: '',
    };

    await AsyncStorage.setItem('inventory', JSON.stringify([item]));

    const fetchedItem = await inventory.read(item.id);

    expect(fetchedItem).toEqual(item);
  });

  it('should update an item', async () => {
    const item: IInventoryItem = {
      id: '1',
      name: 'Test Item',
      quantity: 10,
      price: 100.0,
      description: '',
      user: '',
    };

    const updatedItem: IInventoryItem = {
      id: '1',
      name: 'Updated Item',
      quantity: 5,
      price: 50.0,
      description: '',
      user: '',
    };

    await AsyncStorage.setItem('inventory', JSON.stringify([item]));

    await inventory.update(updatedItem.id, updatedItem);
    const storedItem = (await AsyncStorage.getItem('inventory')) ?? '[]';

    expect(storedItem).toEqual([updatedItem]);
  });

  it('should delete an item', async () => {
    const item: IInventoryItem = {
      id: '1',
      name: 'Test Item',
      quantity: 10,
      price: 100.0,
      description: '',
      user: '',
    };

    await AsyncStorage.setItem('inventory', JSON.stringify([item]));

    await inventory.delete(item.id);

    const storedItem = (await AsyncStorage.getItem('inventory')) ?? '[]';

    expect(storedItem).toEqual([]);
  });

  it('should get all items', async () => {
    const items: IInventoryItem[] = [
      {
        id: '1',
        name: 'Test Item 1',
        quantity: 10,
        price: 100.0,
        description: 'good',
        user: '4j325k5j234523',
      },
      {
        id: '2',
        name: 'Test Item 2',
        quantity: 20,
        description: 'good',
        price: 200.0,
        user: 'm3532m435342',
      },
    ];

    await AsyncStorage.setItem('inventory', JSON.stringify(items));

    const fetchedItems = await inventory.readAll();

    expect(fetchedItems).toEqual(items);
  });
});
