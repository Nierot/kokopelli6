import type { IMinigame } from './_template';

export const GameCrazy88 = {
  id: 'Crazy 88',
  numberOfPlayers: 1,
  score: 8,
  duration: 60,
  body: {
    title: "Crazy 88",
    content: "{{player[0]}}, jij mag een opdracht uitvoeren van de InVakanCie crazy88!",
  }
} satisfies IMinigame