import type { IMinigame } from './_template';

export const GameRollADie = {
  id: 'Dobbelen',
  numberOfPlayers: 1,
  score: 4,
  duration: 60,
  body: {
    title: "{{player[0]}} dobbelt",
    content: "Gooi een getal, neem dat aantal slokken",
  }
} satisfies IMinigame