import type { IMinigame } from './_template';

export const GameOpus = {
  id: 'Opus',
  numberOfPlayers: 0,
  score: 0,
  duration: 480,
  body: {
    title: "Opus!",
    content: "1 dobbel de neus, per dobbelsteen: {{punishment-full}}",
  }
} satisfies IMinigame