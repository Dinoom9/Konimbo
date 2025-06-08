****# Konimbo Items Manager

Next.js 15 based items management system with advanced filtering and URL-based state management.

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home page - filtered items list
│   ├── layout.tsx                # Basic layout with navigation
│   ├── globals.css               # Global styles
│   ├── new/                      # Create new item
│   │   └── page.tsx              # Creation form
│   ├── edit/[id]/                # Edit item
│   │   └── page.tsx              # Edit form
│   └── item/[id]/                # View item
│       └── page.tsx              # Item details page
├── components/                   # Reusable components
│   ├── ui/                       # Basic UI components (Shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── SearchAndFilters.tsx      # Search and filter component
│   ├── ItemCard.tsx              # Item card
│   ├── ItemForm.tsx              # Item form (create/edit)
│   ├── ItemsGrid.tsx             # Items grid
│   ├── Loading.tsx               # Loading indicator
│   └── ErrorMessage.tsx          # Error display
├── actions/                      # Server Actions
│   └── items.action.ts           # CRUD operations on items
├── types/                        # Type definitions
│   └── index.ts                  # TypeScript types
├── config/                       # Configuration
│   └── config.ts                 # Shared constants (categories etc.)
├── lib/                          # Helper functions
│   └── utils.ts                  # General utilities
└── public/                       # Static files
```

## Technologies Used

### Framework & Core
- **Next.js 15** - React framework with App Router and Server Components
- **React 18** - Library for building user interfaces
- **TypeScript** - JavaScript with static typing
- **Node.js** - Server-side runtime environment

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Ready-made accessible UI components
- **Lucide React** - Icon library
- **CSS Grid & Flexbox** - For responsive grid system

### Forms & Validation
- **React Hook Form** - Efficient form management
- **Zod** - Validation and TypeScript schemas
- **@hookform/resolvers** - Integration between RHF and Zod

### State Management
- **URL State** - State management using URL parameters
- **Server Actions** - Server-side actions and data mutations
- **No Context/Redux** - Simple approach without complex state management

### Development Tools
- **ESLint** - Code linting and rules
- **Prettier** - Automatic code formatting
- **PostCSS** - CSS processing

## Installation and Running Instructions

### Prerequisites
- Node.js 18+ 
- npm / yarn / pnpm

### Installation
```bash
# Clone the project
git clone <repository-url>
cd konimbo-items-manager

# Install dependencies
npm install

# Run development environment
npm run dev
```

### Available Commands
```bash
npm install           # Install dependencies
npm run dev          # Run development server (localhost:3000)
npm run build        # Build for production
npm run start        # Run production server
npm run lint         # Run ESLint check
npm run type-check   # Run TypeScript check
```

## Main Features

- **Advanced search and filtering** - By name, category, price range
- **Dynamic sorting** - By name, price, creation date
- **Full CRUD** - Create, read, update and delete items
- **Responsive Design** - Adapted for mobile, tablet and desktop
- **Shareable URLs** - Filters are saved in URL
- **Advanced validation** - With clear error messages
- **RTL Support** - Hebrew interface with full support

## Optional - Testing

The project is ready to add tests with the following tools:

### Installing Testing Tools
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom supertest
```

### Suggested Testing Structure
```
├── __tests__/                    # Tests
│   ├── components/               # Component tests
│   │   ├── ItemCard.test.tsx
│   │   ├── SearchAndFilters.test.tsx
│   │   └── ItemForm.test.tsx
│   ├── pages/                    # Page tests
│   │   └── page.test.tsx
│   └── actions/                  # Server Actions tests
│       └── items.action.test.ts
├── jest.config.js                # Jest configuration
└── jest.setup.js                 # Jest setup
```

### Testing Tools
- **Jest** - JavaScript/TypeScript testing framework
- **React Testing Library** - React component testing
- **Supertest** - API and Server Actions testing
- **@testing-library/jest-dom** - Additional DOM matchers for tests

### Testing Commands
```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode for development
npm test -- --coverage # Coverage report
```


## Development Notes

- The project uses **Server-First** approach with Next.js Server Components
- **URL State Management** ensures automatic synchronization with server
- **Full Type Safety** with TypeScript and Zod validation
- **Performance Optimized** with SSR and automatic code splitting




##### server side #####

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


