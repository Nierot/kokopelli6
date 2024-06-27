import type { IMinigame } from './_template';

export const GameChugABeer2 = {
  id: 'Trek samen een bak',
  numberOfPlayers: 2,
  score: 10,
  duration: 60,
  body: {
    title: "Samen een bakje vouwen",
    content: "Dus {{player[0]}}, pak maar een rietje. En {{player[1]}} doet mee!"
  }
} satisfies IMinigame