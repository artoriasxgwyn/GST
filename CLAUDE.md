# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue.js 3 landing page for **GST (Gestión de Servicios Técnicos)**, a platform for managing technical services. The application is a Spanish-language SPA (Single Page Application) with dark/light theme support, a shopping cart for service plans, and integration with Wompi payment forms.

## Tech Stack

- **Framework**: Vue.js 3 with Composition API (`<script setup>`)
- **Router**: Vue Router 4 with hash history
- **State Management**: Pinia for cart state
- **Build Tool**: Vue CLI 5
- **Deployment**: Vercel (configured in `vercel.json`)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (hot-reload)
npm run serve

# Build for production (outputs to `dist/`)
npm run build

# Lint and fix files
npm run lint
```

## Architecture

### Application Entry Points

- **`src/main.js`**: Bootstraps the app, registers Pinia and Vue Router
- **`src/App.vue`**: Root component managing global dark mode state and layout

### Routing

**`src/routes/routes.js`**: Hash-based routing with smooth scroll behavior.

| Route | View Component |
|-------|----------------|
| `/` | `indexGST.vue` (landing page with all sections) |
| `/carrito` | `carritoGST.vue` (shopping cart) |
| `/politicas` | `politicasGST.vue` |
| `/terminosYCondiciones` | `terminosYCondiciones.vue` |
| `/politicasReembolso` | `politicasReembolsoGST.vue` |
| `/politicasGarantia` | `politicasGarantiaGST.vue` |
| `/cookies` | `cookiesGST.vue` |

### State Management

**`src/stores/cartStore.js`**: Pinia store for cart functionality.
- Stores max 1 GST plan and 1 storage plan at a time
- Persists to `localStorage` (key: `gst-cart`)
- Provides `totalMonthly`, `itemCount`, and `whatsappMessage` getters

### Component Structure

**Landing page sections** (`src/components/index/`):
- `GstHero.vue` - Hero section
- `GstProblem.vue` - Problem statement
- `GstSteps.vue` - How it works
- `GstFeatures.vue` - Features
- `GstAudience.vue` - Target audience
- `GstPricing.vue` - Pricing plans (emits `toggle-form` for Wompi payment)
- `GstHeader.vue` - Sticky navigation with cart badge and dark mode toggle
- `GstFooter.vue` - Footer

**Payment** (`src/components/Pays/`):
- `WompiForm.vue` - Payment form modal

### Theming System

Dark mode is controlled via CSS custom properties in `App.vue`:
- `.light` class: Blue accent (`#1270b6`)
- `.dark` class: Green accent (`#50EEAD`)
- Theme preference persisted to `localStorage`

### Path Aliases

- `@/` maps to `src/` (configured in `jsconfig.json`)

### Build Notes

- Production build requires increased Node memory (`--max_old_space_size=4096`)
- Output directory: `dist/`
- Static assets are served from `public/`
