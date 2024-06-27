import type { IMinigame } from './_template';

export const GameWink = {
  id: 'Knipoogspel',
  numberOfPlayers: 1,
  score: 0,
  duration: 60,
  body: {
    title: "Knipoogspel",
    content: "{{player[0]}} heeft nu de knipoog.",
  }
} satisfies IMinigame