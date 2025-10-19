# AI Rules for Repositor Portfolio Application

This document outlines the core technologies and best practices for developing the Repositor Portfolio application.

## Tech Stack

*   **Frontend Framework**: React 19 with TypeScript for building interactive user interfaces.
*   **Styling**: Tailwind CSS for utility-first styling, complemented by custom CSS variables for theming.
*   **UI Components**: Utilizes `shadcn/ui` and `Radix UI` for pre-built, accessible components, and `@headlessui/react` for unstyled, accessible UI primitives.
*   **Icons**: `lucide-react` for a comprehensive set of vector icons.
*   **Charting**: `recharts` for creating dynamic and responsive data visualizations.
*   **Routing**: React Router for managing application navigation.
*   **State Management**: Primarily uses React's built-in `useState` and `useEffect` hooks, with `localStorage` for client-side data persistence.
*   **Date Manipulation**: `date-fns` for efficient and immutable date operations.
*   **Backend/API**: Hono framework for building fast, lightweight API endpoints on Cloudflare Workers.
*   **Schema Validation**: Zod for robust runtime schema validation, used for both frontend data structures and backend API validation.
*   **Build Tool**: Vite for a fast development experience and optimized builds.

## Library Usage Guidelines

To maintain consistency and efficiency, please adhere to the following guidelines when choosing libraries for specific functionalities:

*   **UI Components**:
    *   For general UI elements (buttons, inputs, cards, etc.), prioritize components from **shadcn/ui** or **Radix UI**.
    *   For unstyled, accessible UI primitives (like modals, dropdowns, toggles) where `shadcn/ui` doesn't offer a direct equivalent or if more granular control over styling is required, use **@headlessui/react**.
*   **Styling**:
    *   All styling **must** be done using **Tailwind CSS** utility classes.
    *   Leverage the custom CSS variables defined in `src/react-app/index.css` for consistent theming.
*   **Icons**:
    *   Use icons exclusively from the **lucide-react** library.
*   **Charts and Data Visualization**:
    *   All charts and graphs should be implemented using **recharts**.
*   **Date and Time Operations**:
    *   Use **date-fns** for all date formatting, parsing, and manipulation tasks.
*   **Form Validation**:
    *   For defining data schemas and validating form inputs, use **Zod**.
*   **Conditional Class Names**:
    *   Use **clsx** for conditionally joining class names.
*   **Backend Logic**:
    *   For any server-side logic or API routes, use the **Hono** framework within Cloudflare Workers.
*   **State Management**:
    *   For local component state, use React's `useState` and `useEffect`.
    *   For global state, consider React's Context API for simpler scenarios. Avoid external state management libraries unless explicitly approved for complex global state requirements.