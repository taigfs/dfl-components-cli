# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevFellowship Component Hub - A dark-themed React micro-app for browsing, previewing, and copying reusable frontend components. Components are displayed in a grid with category filtering, search, and one-click code copying.

## Commands

```bash
# Hub App
npm run dev      # Start dev server at localhost:8080
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build

# CLI Package
npm run cli:build  # Build CLI package
npm run cli:dev    # Build CLI in watch mode
```

## CLI Usage

The `dfl-components` CLI allows users to add components to their projects:

```bash
npx dfl-components init           # Initialize config
npx dfl-components add button     # Add single component
npx dfl-components add card input # Add multiple components
npx dfl-components add --all      # Add all components
```

## Architecture

### Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui components
- React Router for routing
- TanStack Query for data fetching

### Path Alias
`@/` maps to `./src/` (configured in tsconfig.json and vite.config.ts)

### Key Files
- `src/components/ComponentHubApp.tsx` - Main hub component (embeddable)
- `src/data/mockComponents.ts` - Component registry with code samples
- `src/types/component.ts` - Component type definition

### Component Data Model
Components in the hub follow this structure:
```typescript
interface Component {
  id: string;
  name: string;
  description: string;
  category: 'UI' | 'Hooks' | 'Providers' | 'Pages';
  tags: string[];
  version: string;
  filePath: string;
  code: string;
  previewComponent?: React.ComponentType;
  subPages?: { name: string; filePath: string; code: string; previewComponent?: React.ComponentType; }[];
}
```

### Adding New Components
Add entries to `mockComponents` array in `src/data/mockComponents.ts`. Include category, tags, version, source code as string, and optional preview component.

### UI Component Structure
- `src/components/ui/` - shadcn/ui primitives
- `src/components/auth/` - Authentication page components
- `src/components/sample/` - Sample preview components for the hub

### App Providers (src/App.tsx)
Root wraps with: QueryClientProvider → TooltipProvider → Toasters → BrowserRouter

## Monorepo Structure

```
/dfl-components-cli
├── /registry           # Component definitions for distribution
│   ├── registry.json   # Index of all components
│   ├── /components     # UI component JSONs
│   ├── /hooks          # Hook JSONs
│   ├── /providers      # Provider JSONs
│   └── /pages          # Page/block JSONs
├── /packages/cli       # CLI package (published to npm)
│   └── /src
│       ├── index.ts    # CLI entry point
│       ├── /commands   # init.ts, add.ts
│       └── /utils      # Helper utilities
└── /src                # Hub app source
```

### Registry Component Format
Each component in `/registry` has a JSON file with:
- `name`, `type`, `title`, `description`, `category`, `version`
- `registryDependencies` - other registry components it depends on
- `files` - array of `{ path, type, content }` for source files
