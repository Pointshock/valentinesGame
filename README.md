# Festival of Hearts: A Tiny Quest

A short, polished DnD-themed web mini-game that ends with a romantic Valentine's proposal. Built with React + TypeScript + Tailwind CSS.

**Playtime:** ~3-6 minutes
**Theme:** Fantasy/DnD tavern quest
**Ending:** An interactive Valentine's proposal scene with confetti!

## How to Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## How to Customize

### Story Text & Characters

All story content lives in **one file** for easy editing:

```
src/content/story.ts
```

You can change:

| What                    | Where in `story.ts`                        |
| ----------------------- | ------------------------------------------ |
| Character descriptions  | `protagonistDescriptor`, `bardDescriptor`  |
| Default names           | `defaultProtagonistName`, `defaultBardName`|
| Bard's quips            | `bardQuips` array                          |
| Scene narratives        | `tavernScene`, `locationScenes`, etc.      |
| Dice roll outcomes      | Inside each location's `outcomes` object   |
| Proposal speech         | `proposalScene.speechLines`                |
| Keepsake scroll         | `endScene.keepsake`                        |

Use `{protagonistName}` and `{bardName}` as placeholders in any text.

### Game Structure

- **Types & state shape:** `src/engine/types.ts`
- **State management:** `src/engine/gameState.tsx`
- **Utilities (dice, interpolation):** `src/engine/utils.ts`
- **UI components:** `src/components/`
- **Scene views:** `src/scenes/`

## How to Deploy

```bash
npm run build
```

Output goes to `dist/`. Serve with any static file host (Netlify, Vercel, GitHub Pages, etc.).

## Tech Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- No backend required
- Save progress in `localStorage`
