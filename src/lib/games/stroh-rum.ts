import type { IMinigame } from './_template';

export const GameStrohRum = {
  id: 'Bah',
  numberOfPlayers: 1,
  score: 25,
  duration: 60,
  body: {
    title: "{{player[0]}}",
    content: "Jij gaat een shotje Stroh 40/80 drinken.",
  }
} satisfies IMinigame