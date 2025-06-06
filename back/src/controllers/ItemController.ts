import { Request, Response } from 'express';
import { ItemService } from '../services/ItemService';

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  getAllItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category, inStock, minPrice, maxPrice, search } = req.query;
      
      let items = await this.itemService.getAllItems();

      // סינון לפי קטגוריה
      if (category && typeof category === 'string') {
        items = items.filter(item => 
          item.category.toLowerCase().includes(category.toLowerCase())
        );
      }

      // סינון לפי זמינות במלאי
      if (inStock !== undefined) {
        const stockFilter = inStock === 'true';
        items = items.filter(item => item.inStock === stockFilter);
      }

      // סינון לפי טווח מחירים
      if (minPrice && typeof minPrice === 'string') {
        const min = parseFloat(minPrice);
        if (!isNaN(min)) {
          items = items.filter(item => item.price >= min);
        }
      }

      if (maxPrice && typeof maxPrice === 'string') {
        const max = parseFloat(maxPrice);
        if (!isNaN(max)) {
          items = items.filter(item => item.price <= max);
        }
      }

      // חיפוש בשם או תיאור
      if (search && typeof search === 'string') {
        const searchTerm = search.toLowerCase();
        items = items.filter(item => 
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm)
        );
      }

      res.json(items);
    } catch (error) {
      console.error('Error getting all items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getItemById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid item ID' });
        return;
      }

      const item = await this.itemService.getItemById(id);
      if (!item) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }

      res.json(item);
    } catch (error) {
      console.error('Error getting item by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  createItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, price, category, inStock } = req.body;

      if (!name || !description || price === undefined || !category) {
        res.status(400).json({ 
          error: 'Name, description, price, and category are required' 
        });
        return;
      }

      if (typeof price !== 'number' || price < 0) {
        res.status(400).json({ error: 'Price must be a positive number' });
        return;
      }

      const newItem = await this.itemService.createItem({ 
        name, 
        description, 
        price, 
        category, 
        inStock 
      });
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  updateItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid item ID' });
        return;
      }

      const { name, description, price, category, inStock } = req.body;
      const updateData: any = {};

      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (price !== undefined) {
        if (typeof price !== 'number' || price < 0) {
          res.status(400).json({ error: 'Price must be a positive number' });
          return;
        }
        updateData.price = price;
      }
      if (category !== undefined) updateData.category = category;
      if (inStock !== undefined) updateData.inStock = inStock;

      if (Object.keys(updateData).length === 0) {
        res.status(400).json({ error: 'No update data provided' });
        return;
      }

      const updatedItem = await this.itemService.updateItem(id, updateData);
      if (!updatedItem) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }

      res.json(updatedItem);
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  deleteItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid item ID' });
        return;
      }

      const deleted = await this.itemService.deleteItem(id);
      if (!deleted) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
} 