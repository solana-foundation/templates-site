# Solana Templates Site

A Next.js website that showcases templates from the [solana-foundation/templates](https://github.com/solana-foundation/templates) repository. Users can browse, search, and filter Solana dApp templates to find the right starting point for their project.

## Overview

This site dynamically fetches template metadata from the `templates.json` file in the templates repository and displays it in an interactive, searchable interface. Each template includes:

- Description and use case
- Framework and SDK information
- README documentation with syntax highlighting
- Preview images
- Command-line generation instructions

## Architecture

### Stack

- Next.js 15 (App Router with Turbopack)
- React 19
- Tailwind CSS v4
- TypeScript
- Radix UI components
- Framer Motion for animations
- Shiki for syntax highlighting

### Data Flow

1. **Template Metadata**: Fetched from `https://raw.githubusercontent.com/solana-foundation/templates/main/templates.json`
2. **README Content**: Fetched per-template from the templates repo
3. **Images**: Loaded from template directories in the templates repo
4. **Caching**: Template data is cached for 60 seconds, READMEs for 1 hour

The site is statically generated at build time and revalidates on-demand.

## Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Template Data Source

The site pulls template information from the [solana-foundation/templates](https://github.com/solana-foundation/templates) repository. The templates repo generates a `templates.json` file that contains:

- Template metadata (name, description, keywords)
- Path to template directory
- Image paths for previews
- Display names and use cases

This JSON file is the single source of truth for what templates are displayed on the site.

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linter
- `pnpm format` - Format code with Prettier

## Deployment

The site can be deployed to any platform that supports Next.js applications. It requires no environment variables or build-time configuration.
