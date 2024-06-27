import type { IMinigame } from './_template';

export const GameChugABeer = {
  title: 'Trek een bak',
  numberOfPlayers: 2,
  score: 10,
  duration: 60,
  body: {
    title: "Bakje vouwen",
    content: "Dus {{player[0]}} pak maar een rietje. En {{player[1]}} doet mee!"
  }
} satisfies IMinigame