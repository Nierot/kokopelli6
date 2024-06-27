import type { IMinigame } from './_template';

export const GameBartender = {
  id: 'Barman',
  numberOfPlayers: 1,
  score: 1,
  duration: 60,
  body: {
    title: "Ping!",
    content: "{{player[0]}} gaat bier halen!",
  }
} satisfies IMinigame