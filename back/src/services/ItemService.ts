import fs from 'fs/promises';
import path from 'path';
import { Item, CreateItemRequest, UpdateItemRequest } from '../types/Item';

export class ItemService {
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'data', 'items.json');
  }

  async getAllItems(): Promise<Item[]> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading items:', error);
      return [];
    }
  }

  async getItemById(id: number): Promise<Item | null> {
    const items = await this.getAllItems();
    return items.find(item => item.id === id) || null;
  }

  async createItem(itemData: CreateItemRequest): Promise<Item> {
    const items = await this.getAllItems();
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    
    const newItem: Item = {
      id: newId,
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      category: itemData.category,
      inStock: itemData.inStock ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    items.push(newItem);
    await this.saveItems(items);
    return newItem;
  }

  async updateItem(id: number, itemData: UpdateItemRequest): Promise<Item | null> {
    const items = await this.getAllItems();
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return null;
    }

    items[itemIndex] = {
      ...items[itemIndex],
      ...itemData,
      updatedAt: new Date().toISOString()
    };

    await this.saveItems(items);
    return items[itemIndex];
  }

  async deleteItem(id: number): Promise<boolean> {
    const items = await this.getAllItems();
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return false;
    }

    items.splice(itemIndex, 1);
    await this.saveItems(items);
    return true;
  }

  private async saveItems(items: Item[]): Promise<void> {
    try {
      await fs.writeFile(this.dataPath, JSON.stringify(items, null, 2));
    } catch (error) {
      console.error('Error saving items:', error);
      throw new Error('Failed to save items');
    }
  }
} 