import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IInventoryItem {
  id: string;
  name: string;
  totalStock: number;
  price: number;
  description: string;
  user: string;
}

export class Inventory {
  generateID(length: number = 10): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  formatCurrency(value: number, currency = 'NGN', locale = 'en-US') {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    });

    return formatter.format(value);
  }

  async create(item: IInventoryItem): Promise<void> {
    const items = await this.readAll();
    items.push(item);
    await AsyncStorage.setItem('inventory', JSON.stringify(items));
  }

  async read(id: string): Promise<IInventoryItem | null> {
    const items = await this.readAll();
    const item = items.find(item => item.id === id);
    return item ? item : null;
  }

  async readAll(): Promise<IInventoryItem[]> {
    const itemsJSON = await AsyncStorage.getItem('inventory');
    return itemsJSON ? JSON.parse(itemsJSON) : [];
  }

  async update(id: string, newItem: Partial<IInventoryItem>): Promise<void> {
    const items = await this.readAll();
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error('Item not found');
    }

    items[index] = {...items[index], ...newItem};
    await AsyncStorage.setItem('inventory', JSON.stringify(items));
  }

  async delete(id: string): Promise<void> {
    const items = await this.readAll();
    const filteredItems = items.filter(item => item.id !== id);
    await AsyncStorage.setItem('inventory', JSON.stringify(filteredItems));
  }
}
