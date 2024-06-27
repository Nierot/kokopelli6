import type { IMinigame } from './_template';

export const GameJoostKlein7Stijl = {
  id: 'Joost Klein 7 stijl',
  numberOfPlayers: 0,
  score: 12,
  duration: 240,
  body: {
    title: "Joost Klein 7 stijl",
    content: "{{player[0]}}, weet je wat dat betekent?",
  }
} satisfies IMinigame