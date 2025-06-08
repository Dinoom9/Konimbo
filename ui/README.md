# Konimbo Items Manager

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
