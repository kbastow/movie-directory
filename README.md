# Movie Directory

Movie Directory is a Vite + React + TypeScript single-page app for browsing movie data from TMDB.

It includes:
- Home page sections for trending, now playing, and top-rated movies
- Debounced movie search from the header
- Movie detail pages with cast and similar titles
- Local favourites persisted in IndexedDB

## Tech stack

- **Runtime/UI**: React 19, React Router 7, TypeScript
- **Data fetching/state**: TanStack Query (React Query), `fetch`, Axios
- **UI system**: MUI 7 + Emotion, custom dark theme
- **Forms/search UX**: `react-hook-form`, `use-debounce`
- **Persistence**: IndexedDB via `idb`
- **Build/tooling**: Vite 6, ESLint 9, Vitest + Testing Library
- **Deployment**: GitHub Pages (`gh-pages`)

## Application architecture

### Entry and providers

- `src/main.tsx` mounts React and applies MUI theme + `CssBaseline`
- `src/App.tsx` wires:
  - `BrowserRouter` (with `/movie-directory` basename)
  - `QueryClientProvider`
  - query devtools
  - route-level helpers (`ScrollToTop`, `RedirectHandler`)

### Routing

Defined in `src/routes/AppRoutes.tsx`:
- `/` → `HomePage`
- `/favourites` → `FavouritesPage`
- `/movie/:movieId` → `MoviePage`
- fallback `*` → `PageNotFound`

All routes are rendered through `AppLayout` (`src/layout/AppLayout.tsx`), which provides the shared header and page container.

### Data layer

API modules in `src/api`:
- `movies.ts`: lists by category (`trending`, `now_playing`, `top_rated`)
- `searchMovies.ts`: search endpoint + basic ranking/filtering
- `movieDetails.ts`: aggregates details, credits, and similar titles

Query hooks in `src/hooks`:
- `useInfiniteMovies.ts` for horizontal infinite scrolling on home sections
- `useSearchMovies.ts` for debounced header search
- `useMovieDetails.ts` for movie detail pages
- `useMovies.ts` exists for paged queries

### Favourites persistence

- IndexedDB adapter: `src/utils/favouritesDB.ts`
- UI/state hook: `src/hooks/useFavourites.ts`
- Toggle UI: `src/components/FavouriteToggleButton.tsx`
- Favourites page: `src/pages/FavouritesPage.tsx`

### UI composition

- `src/components/Header.tsx` hosts navigation + search + favourites shortcut
- `src/components/MovieSection.tsx` renders each homepage section
- `src/components/HorizontalScroller.tsx` handles scroll arrows + intersection-based pagination trigger
- `src/components/MovieCard.tsx` / `MoviePoster.tsx` render movie visuals for different contexts

### Type organization

- `src/types/movies.ts`: list/search response shapes
- `src/types/movieDetails.ts`: enriched movie detail shape (cast/similar)
- `src/types/favouriteMovie.ts`: persisted favourite subset

### Styling

- Theme: `src/styles/theme.ts`
- Shared button styles: `src/styles/buttonStyles.ts`

## Repository structure

```text
.
├─ public/                  # static assets + GitHub Pages SPA fallback
├─ src/
│  ├─ api/                  # TMDB request functions
│  ├─ components/           # reusable UI components
│  ├─ hooks/                # React Query and local state hooks
│  ├─ layout/               # shared route layout
│  ├─ pages/                # route-level pages
│  ├─ routes/               # route definitions
│  ├─ styles/               # theme and style constants
│  ├─ types/                # TypeScript domain models
│  └─ utils/                # helper utilities (image URLs, IndexedDB)
├─ eslint.config.js
├─ vite.config.ts
└─ package.json
```

## Testing

Vitest is configured in `vite.config.ts` with `jsdom` and setup from `src/setupTests.ts`.

Current tests are colocated in `src/components` and `src/hooks` as `*.test.tsx`.
