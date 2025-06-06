import { Router } from 'express';
import { ItemController } from '../controllers/ItemController';

const router = Router();
const itemController = new ItemController();

// GET /items - קבלת כל הפריטים
router.get('/', itemController.getAllItems);

// GET /items/:id - קבלת פריט בודד
router.get('/:id', itemController.getItemById);

// POST /items - יצירת פריט חדש
router.post('/', itemController.createItem);

// PUT /items/:id - עדכון פריט
router.put('/:id', itemController.updateItem);

// DELETE /items/:id - מחיקת פריט
router.delete('/:id', itemController.deleteItem);

export default router; 