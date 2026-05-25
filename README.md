# Activity Monitor Dashboard

A comprehensive monitoring dashboard for tracking user sessions with real-time activity metrics, risk assessment, and detailed session analytics. Built with modern web technologies for performance and user experience.

## Project Overview

This is a session activity monitoring dashboard built with [Next.js](https://nextjs.org) . It provides real-time visibility into user sessions, risk detection, and activity timeline visualization. The application is designed for exam proctoring or similar session monitoring scenarios.

## Project Structure

```
activity-monitor-dashboard/
├── app/                          # Next.js app directory (App Router)
│   ├── layout.tsx               # Root layout wrapper
│   ├── page.tsx                 # Home page (redirects to /dashboard)
│   ├── globals.css              # Global styles
│   └── dashboard/
│       └── page.tsx             # Dashboard main page
├── components/                   # React components
│   ├── Layout/                  # Layout components
│   │   ├── Header.tsx           # Top navigation bar
│   │   └── Sidebar.tsx          # Left sidebar navigation
│   ├── dashboard/               # Dashboard feature components
│   │   ├── SessionDetailsPanel.tsx  # Detailed session info sidebar
│   │   ├── metrics/
│   │   │   ├── MetricsOverview.tsx  # KPI cards overview
│   │   │   ├── MetricCard.tsx       # Individual metric display
│   │   │   └── Sparkline.tsx        # Inline trend sparklines
│   │   └── Timeline.tsx             # Activity timeline visualization
│   ├── table/
│   │   └── SessionTable.tsx     # Data table with pagination & filters
│   └── timeline/
│       └── Timeline.tsx         # Timeline event display
├── store/                        # State management
│   └── dashboard.ts             # Zustand store for dashboard state
├── lib/                         # Utilities and helpers
│   ├── mock-data.ts             # Sample session data
│   └── utils.ts                 # Helper functions
├── types/                       # TypeScript type definitions
│   └── index.ts                 # Centralized type exports
├── public/                      # Static assets
├── next.config.ts               # Next.js configuration
├── tailwind.config.mjs           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## Component Organization

Components are organized by feature/domain with clear separation of concerns:

- **Layout Components** (`components/Layout/`): Page structure and navigation
- **Feature Components** (`components/dashboard/`): Domain-specific features
  - `MetricsOverview`: Displays KPI cards showing system health metrics
  - `SessionDetailsPanel`: Drawer/sidebar showing detailed session information
  - `Timeline`: Event timeline for session activity history
- **Table Component** (`components/table/`): Data display with TanStack React Table
- **Utility Components**: Small, reusable UI components like `MetricCard` and `Sparkline`

**Component Patterns:**

- All components are client-side ("use client") to support interactivity
- Prop-based state passing from page level down
- Motion animations via Framer Motion for smooth UX
- Lucide React icons for consistent iconography

## State Management Approach

**Framework:** [Zustand](https://github.com/pmndrs/zustand) 5.0.13

**Store Structure** (`store/dashboard.ts`):

- **Data**: `sessions` array containing mock session objects
- **UI State**: `selectedSession`, `isPanelOpen`, `searchQuery`
- **Filters**: `status` and `riskLevel` filtering
- **Pagination**: `pageIndex`, `pageSize`

**State Flow:**

1. Dashboard page initializes with Zustand store
2. Components subscribe to specific store slices using `useDashboardStore()`
3. User interactions (search, filter, selection) trigger store mutations
4. Components re-render on state changes (selective subscription)

**Why Zustand?**

- Minimal boilerplate compared to Redux
- Simple API for defining and updating state
- Granular subscriptions reduce unnecessary re-renders
- Lightweight library (~2kb gzipped)

## Architecture Decisions

### 1. **Next.js App Router (not Pages Router)**

- Modern, file-based routing with better performance
- Built-in support for Server Components (foundation for future optimization)
- Improved code splitting and parallel rendering

### 2. **Client-Side Rendering for Dashboard**

- Dashboard requires rich interactivity (filters, search, session selection)
- User interactions need immediate feedback
- State management is primarily UI-focused

### 3. **Tailwind CSS + Tailwind Merge**

- Utility-first CSS for rapid UI development
- Tailwind Merge prevents class conflicts when composing components
- Dark theme optimized design (HSL color scheme for better control)

### 4. **TanStack React Table (Headless Table)**

- Zero styling overhead, fully customizable
- Built-in pagination, sorting, filtering logic
- Better performance than DOM-based pagination for large datasets
- Flexible column definitions

### 5. **Framer Motion for Animations**

- Declarative animation API integrated with React components
- Smooth transitions for panel opening/closing and layout shifts
- Performance-optimized with GPU acceleration

### 6. **Centralized Type Definitions**

- All types in `types/index.ts` for single source of truth
- Strong typing prevents runtime errors
- Better IDE autocomplete and refactoring support

## Tradeoffs Made

| Decision                      | Benefit                                 | Tradeoff                                                |
| ----------------------------- | --------------------------------------- | ------------------------------------------------------- |
| **Zustand (vs Redux)**        | Simple, lightweight, quick setup        | Less middleware ecosystem, smaller community            |
| **Client-side rendering**     | Rich interactivity, instant feedback    | Cannot use SSR for SEO (acceptable for admin dashboard) |
| **Mock data (vs real API)**   | Fast development, no backend dependency | Must integrate real API layer later                     |
| **Tailwind CSS**              | Fast styling, consistent design system  | Larger HTML/CSS output, learning curve                  |
| **TypeScript strict mode**    | Type safety, better tooling             | Slightly slower development initially                   |
| **TanStack Table (headless)** | Maximum customization, small bundle     | More setup code vs pre-styled solutions                 |

## Libraries & Tools Used

### Core Framework

- **Next.js ** - React framework with SSR/SSG capabilities
- **React ** - UI library with latest hooks and features

### State Management

- **Zustand ** - Lightweight state management

### UI & Styling

- **Tailwind CSS ** - Utility-first CSS framework
- **Tailwind Merge ** - Prevent style conflicts in composed components
- **Framer Motion ** - Animation library

### Data Display

- **TanStack React Table ** - Headless table logic
- **Recharts ** - Charting library for metrics visualization

### Icons

- **Lucide React ** - Modern SVG icon library

### Development

- **TypeScript ** - Static type checking
- **PostCSS ** - CSS transformation (via Tailwind)

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm start

Open [http://localhost:3000](http://localhost:3000) in your browser.
The dashboard redirects from `/` to `/dashboard`.

```
