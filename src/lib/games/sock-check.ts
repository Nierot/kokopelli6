import type { IMinigame } from './_template';

export const GameSockCheck = {
  id: 'Sokken check',
  numberOfPlayers: 0,
  score: 10,
  duration: 60,
  body: {
    title: "Sokken check",
    content: "Iedereen die geen sokken aanheeft: {{punishment-full}}"
  }
} satisfies IMinigame