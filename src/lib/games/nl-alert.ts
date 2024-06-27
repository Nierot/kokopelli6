import type { IMinigame } from './_template';

export const GameNLAlert = {
  id: 'NL Alert',
  numberOfPlayers: 0,
  score: 0,
  duration: 60,
  body: {
    title: "NL Alert",
    content: "De eerste persoon die de ruimte/tuin verlaat: {{punishment-full}}",
  }
} satisfies IMinigame