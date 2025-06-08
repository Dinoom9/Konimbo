# Backend API

Backend API application for managing supermarket products with Express, Vite and TypeScript.

## Technologies Used

### Backend Framework
- **Express.js** - Web framework for Node.js
- **TypeScript** - JavaScript with type safety
- **tsx** - TypeScript execution engine
- **CORS** - Cross-Origin Resource Sharing support

### Development Tools
- **Vite** - Fast build tool for development
- **Node.js** - Runtime environment
- **npm** - Package manager

### Storage
- **JSON Files** - Data storage in JSON files

## Project Structure

```
backend-api/
├── src/
│   ├── controllers/     # Controllers for handling HTTP requests
│   │   └── ItemController.ts
│   ├── routes/          # API routes definition
│   │   └── itemRoutes.ts
│   ├── services/        # Business logic
│   │   └── ItemService.ts
│   ├── types/           # TypeScript interfaces
│   │   └── Item.ts
│   └── index.ts         # Application entry point
├── data/
│   └── items.json       # Data file
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # This documentation
```

## Installation and Running

### Installation
```bash
# Clone the project
git clone <repository-url>
cd backend-api

# Install dependencies
npm install
```

### Running
```bash
# Run in development mode (recommended)
npm run dev

# Build for production
npm run build

# Run in production
npm start

# Run with preview
npm run preview
```

The application will run on http://localhost:3001

## Features

- Full REST API with all CRUD operations
- Data persistence in JSON file
- TypeScript with Express
- Vite for fast development
- CORS enabled
- Support for advanced filtering and search

## API Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/items` | Get all items | `category`, `inStock`, `minPrice`, `maxPrice`, `search` |
| GET | `/items/:id` | Get single item | - |
| POST | `/items` | Create new item | - |
| PUT | `/items/:id` | Update item | - |
| DELETE | `/items/:id` | Delete item | - |

### Query Parameters for GET /items:
- **category** - Filter by category (partial search)
- **inStock** - Filter by availability (`true`/`false`)
- **minPrice** - Minimum price
- **maxPrice** - Maximum price  
- **search** - Search in item name or description

## Usage Examples

### Get all items
```bash
curl http://localhost:3001/items
```

### Get items with query parameters
```bash
# Filter by category
curl "http://localhost:3001/items?category=milk"

# Filter by stock availability
curl "http://localhost:3001/items?inStock=true"

# Filter by price range
curl "http://localhost:3001/items?minPrice=5&maxPrice=15"

# Search items
curl "http://localhost:3001/items?search=milk"

# Combine multiple filters
curl "http://localhost:3001/items?category=fruits&inStock=true&maxPrice=10"
```

### Create new item
```bash
curl -X POST http://localhost:3001/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bananas",
    "description": "Fresh premium bananas 1kg",
    "price": 8.90,
    "category": "Fruits and Vegetables",
    "inStock": true
  }'
```

### Update item
```bash
curl -X PUT http://localhost:3001/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Milk 3% Tnuva - Sale",
    "price": 5.90,
    "inStock": false
  }'
```

### Delete item
```bash
curl -X DELETE http://localhost:3001/items/1
```

## Testing - Optional

The project is ready for adding tests with the following technologies:

### Installing Testing Tools
```bash
# For backend testing
npm install --save-dev jest supertest @types/jest @types/supertest

# For React components (if frontend exists)
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Recommended Test Structure
```
tests/
├── unit/            # Unit tests
│   ├── services/    # Service tests
│   └── controllers/ # Controller tests
├── integration/     # Integration tests
│   └── api/         # API endpoint tests
└── setup.ts         # Test configuration
```

### API Test Example
```javascript
import request from 'supertest';
import app from '../src/index';

describe('Items API', () => {
  test('GET /items should return all items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
``` 
