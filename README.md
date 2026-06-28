# DSA Primitives

Live app: https://dsa-primitives.vercel.app/

DSA Primitives is a browser-based practice app for drilling algorithm building blocks until they become automatic. The focus is not full interview problems, but the lower-level primitives those problems depend on: binary search, prefix sums, sorted two-sum, tree traversals, breadth-first traversal, and similar patterns.

The goal is to make the “how do I implement this basic tool?” part disappear, so practice time can be spent on the actual problem strategy.

## How It Works

Each drill gives you a short prompt, starter function signature, visible test cases, and an in-browser code editor. You write the implementation, run the tests, and inspect the console output for pass/fail details.

Submitted solutions are executed in a Web Worker. That keeps the run isolated from the React UI thread and allows the app to terminate slow executions with a timeout. This is still a proof-of-concept browser runner, not a security sandbox for untrusted production code, but it is enough for local/client-side drill practice without paying for server execution.

## Editor

The IDE experience currently uses Monaco Editor through `@monaco-editor/react`, which is the same editor engine family used by VS Code. The app defines a custom JavaScript-oriented theme so tokens like keywords, functions, methods, and globals are easier to scan than a plain textarea.

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Useful checks:

```bash
npm run format
npm run check
```

`npm run check` runs linting, Prettier verification, and a production build.
