import mockmockmockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock(
  '@react-native-async-storage/async-storage',
  () => mockmockmockAsyncStorage,
);

import {IInventoryItem, Inventory} from '../src/services/inventory';

describe('Inventory CRUD operations', () => {
  const inventory = new Inventory();

  beforeEach(() => {
    mockmockmockAsyncStorage.clear();
  });

  it('should create an item', async () => {
    const item: IInventoryItem = {
      id: '1',
      name: 'Test Item',
      totalStock: 10,
      price: 100.0,
      description: 'werwerwe',
      user: 'qrwrqwrq',
    };

    await inventory.create(item);
    const storedItemJson =
      (await mockmockmockAsyncStorage.getItem('inventory')) ?? '[]';
    const storedItem = JSON.parse(storedItemJson ?? '[]');

    expect(storedItem).toEqual([item]);
  });

  it('should read an item', async () => {
    const item: IInventoryItem = {
      id: '1',
      name: 'Test Item',
      totalStock: 10,
      price: 100.0,
      description: 'doll',
      user: '31s324124w',
    };

    await mockmockmockAsyncStorage.setItem('inventory', JSON.stringify([item]));

    const fetchedItem = await inventory.read(item.id);

    expect(fetchedItem).toEqual(item);
  });

  it('should update an item', async () => {
    const item: IInventoryItem = {
      id: '1',
      name: 'Test Item',
      totalStock: 10,
      price: 100.0,
      description: 'epo',
      user: 'rwqreqwrqwer',
    };

    const updatedItem: IInventoryItem = {
      id: '1',
      name: 'Updated Item',
      totalStock: 5,
      price: 50.0,
      description: 'bol',
      user: 'rwqreqwrqwer',
    };

    await mockmockmockAsyncStorage.setItem('inventory', JSON.stringify([item]));

    await inventory.update(updatedItem.id, updatedItem);

    const storedItemJson = await mockmockmockAsyncStorage.getItem('inventory');
    const storedItem = JSON.parse(storedItemJson ?? '[]');

    expect(storedItem).toEqual([updatedItem]);
  });

  it('should delete an item', async () => {
    const item: IInventoryItem = {
      id: '1',
      name: 'Test Item',
      totalStock: 10,
      price: 100.0,
      description: '',
      user: '',
    };

    await mockmockmockAsyncStorage.setItem('inventory', JSON.stringify([item]));

    await inventory.delete(item.id);

    const storedItemJson =
      (await mockmockmockAsyncStorage.getItem('inventory')) ?? '[]';
    const storedItem = JSON.parse(storedItemJson ?? '[]');

    expect(storedItem).toEqual([]);
  });

  it('should get all items', async () => {
    const items: IInventoryItem[] = [
      {
        id: '1',
        name: 'Test Item 1',
        totalStock: 10,
        price: 100.0,
        description: 'good',
        user: '4j325k5j234523',
      },
      {
        id: '2',
        name: 'Test Item 2',
        totalStock: 20,
        description: 'good',
        price: 200.0,
        user: 'm3532m435342',
      },
    ];

    await mockmockmockAsyncStorage.setItem('inventory', JSON.stringify(items));

    const fetchedItems = await inventory.readAll();

    expect(fetchedItems).toEqual(items);
  });
});
