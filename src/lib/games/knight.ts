import type { IMinigame } from './_template';

export const GameKnight = {
  id: 'De Ridder',
  numberOfPlayers: 1,
  score: 0,
  duration: 60,
  body: {
    title: "De ridder",
    content: "{{player[0]}} is nu de ridder",
  }
} satisfies IMinigame