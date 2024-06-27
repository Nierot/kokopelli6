import type { IMinigame } from './_template';

export const GameRockPaperChug = {
  id: 'Speen papier bak(?)',
  numberOfPlayers: 0,
  score: 0,
  duration: 120,
  body: {
    title: "Steen papier {{punishment-light}}",
    content: "{{player[0]}} vs. {{player[1]}}",
  }
} satisfies IMinigame