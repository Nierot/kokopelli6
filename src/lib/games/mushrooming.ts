import type { IMinigame } from './_template';

export const GameMushroom = {
  id: 'Mushroomen!',
  numberOfPlayers: 3,
  score: 4,
  duration: 240,
  body: {
    title: "Mushroomen!",
    content: "{{player[0]}} vs. {{player[1]}} vs. {{player[2]}}",
  }
} satisfies IMinigame