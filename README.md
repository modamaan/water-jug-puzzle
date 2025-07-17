# Water Jug Problem Game

This is a web-based puzzle game built with [Next.js](https://nextjs.org) and Tailwind CSS. The game is based on the classic Water Jug Problem, where you use two jugs of different capacities to measure a specific amount of water.

## Game Rules
- You have two jugs with different capacities for each level.
- Your goal is to measure a specific amount of liquid using only these jugs.
- You can fill a jug completely.
- You can empty a jug completely.
- You can pour water from one jug to another until either the source jug is empty or the destination jug is full.

## Features
- **Level Unlock System:** Only Level 1 is unlocked at first. Complete a level to unlock the next one.
- **Celebration:** Enjoy a confetti celebration when you solve a level!
- **Undo & Reset:** Undo your last move or reset the level at any time.
- **Beautiful UI:** Responsive, modern design with clear instructions and feedback.

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## How to Play
1. Select a level (only unlocked levels are accessible).
2. Use the controls to fill, empty, or pour between jugs.
3. Try to reach the target amount in as few moves as possible.
4. When you win, the next level unlocks and a celebration appears!

## Customization
- Levels are defined in `src/lib/levels.json`. You can add or modify levels as you like.

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy
The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/).
