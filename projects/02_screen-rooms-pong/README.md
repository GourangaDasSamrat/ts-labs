# Screen Rooms Pong

**Author:** Gouranga Das Samrat <gouranga.das.khulna@gmail.com>

A Bun-powered browser experiment where one glowing Pong ball moves across multiple real browser windows as if the desktop were one shared table.

Open the same URL in two or three separate windows, arrange them on your screen, and the ball will cross between touching windows. Empty space between windows behaves like a wall.

## How It Works

Browser windows from the same origin can communicate through `localStorage`. When one window writes to `localStorage`, every other open window receives a `storage` event.

This project uses that as a tiny message bus:

1. Each window writes its screen rectangle: `screenX`, `screenY`, `innerWidth`, and `innerHeight`.
2. All windows keep a live registry of the other windows.
3. The window with the lowest id becomes the host.
4. Only the host runs physics.
5. The host broadcasts the ball position through `localStorage`.
6. Every window renders the same global ball position relative to its own `screenX/screenY`.

That means each canvas is just a viewport into one shared screen-space coordinate system.

The collision model asks one simple question: is this screen point covered by any open window? If yes, the ball can move there. If no, it bounces. This makes touching windows behave like connected rooms while gaps behave like walls.

## Project Structure

```
src/
├── client/              # Browser-side TypeScript code
│   ├── main.ts          # App entrypoint
│   ├── physics.ts       # Physics simulation
│   ├── renderer.ts      # Canvas rendering
│   ├── viewport.ts      # Viewport utilities
│   └── windowRegistry.ts# Window heartbeat + host election
├── server/              # Server-side TypeScript code
│   └── server.ts        # Static file server
└── types/               # Shared TypeScript types
    └── index.ts

public/                  # Static site assets
└── index.html

tests/                   # Bun test files
└── *.test.ts

dist/                    # Generated build output
```

## Tech Stack

- **Language**: TypeScript
- **Runtime**: Bun
- **Testing**: Bun native test runner
- **Formatting**: Prettier

> This project uses Bun for development, build, and testing.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Then open `http://127.0.0.1:8000/` in multiple browser windows.

### Build

```bash
bun run build
```

### Testing

```bash
bun test
```

Run individual tests:

```bash
bun test tests/physics.test.ts
bun test tests/viewport.test.ts
bun test tests/windowRegistry.test.ts
```

### Formatting

```bash
bun run format
```

## Usage

1. Start the server with `bun run dev`
2. Open `http://127.0.0.1:8000/` in multiple browser windows
3. Arrange windows so they touch or overlap
4. The Pong ball will move between windows
5. Gaps between windows act like walls

## Notes

- The client is written in TypeScript and served by Bun.
- The app is intentionally runtime dependency-free and relies on browser APIs, canvas, and `localStorage`.
- Window-to-window communication is handled through `localStorage` events.

## License

MIT
