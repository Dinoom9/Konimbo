# Backend API

אפליקציית Backend API עבור ניהול מוצרי סופר עם Express, Vite ו-TypeScript.

## תכונות

- REST API מלא עם כל פעולות CRUD
- שמירת נתונים בקובץ JSON
- TypeScript עם Express
- Vite לפיתוח מהיר
- CORS enabled

## התקנה והרצה

```bash
# התקנת dependencies
npm install

# הרצה במצב פיתוח
npm run dev

# בנייה לפרודקשן
npm run build

# הרצה בפרודקשן
npm start
```

## API Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/items` | קבלת כל המוצרים | `category`, `inStock`, `minPrice`, `maxPrice`, `search` |
| GET | `/items/:id` | קבלת מוצר בודד | - |
| POST | `/items` | יצירת מוצר חדש | - |
| PUT | `/items/:id` | עדכון מוצר | - |
| DELETE | `/items/:id` | מחיקת מוצר | - |

### Query Parameters עבור GET /items:
- **category** - סינון לפי קטגוריה (חיפוש חלקי)
- **inStock** - סינון לפי זמינות (`true`/`false`)
- **minPrice** - מחיר מינימלי
- **maxPrice** - מחיר מקסימלי  
- **search** - חיפוש בשם או תיאור המוצר

## דוגמאות שימוש

### קבלת כל המוצרים
```bash
curl http://localhost:3001/items
```

### קבלת מוצרים עם query parameters
```bash
# סינון לפי קטגוריה
curl "http://localhost:3001/items?category=חלב"

# סינון לפי זמינות במלאי
curl "http://localhost:3001/items?inStock=true"

# סינון לפי טווח מחירים
curl "http://localhost:3001/items?minPrice=5&maxPrice=15"

# חיפוש מוצרים
curl "http://localhost:3001/items?search=חלב"

# שילוב מספר פילטרים
curl "http://localhost:3001/items?category=פירות&inStock=true&maxPrice=10"
```

### יצירת מוצר חדש
```bash
curl -X POST http://localhost:3001/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "בננות",
    "description": "בננות טריות מובחרות 1 ק\"ג",
    "price": 8.90,
    "category": "פירות וירקות",
    "inStock": true
  }'
```

### עדכון מוצר
```bash
curl -X PUT http://localhost:3001/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "חלב 3% טרה - מבצע",
    "price": 5.90,
    "inStock": false
  }'
```

### מחיקת מוצר
```bash
curl -X DELETE http://localhost:3001/items/1
```

## מבנה הפרויקט

```
src/
├── controllers/     # Controllers לטיפול בבקשות HTTP
├── routes/         # Routes definition
├── services/       # Business logic
├── types/          # TypeScript interfaces
└── index.ts        # Entry point
data/
└── items.json      # קובץ נתונים
``` 