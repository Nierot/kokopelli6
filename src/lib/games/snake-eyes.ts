import type { IMinigame } from './_template';

export const GameSnakeEyes = {
  id: 'Snake eyes',
  numberOfPlayers: 1,
  score: 0,
  duration: 60,
  body: {
    title: "Pas op voor {{player[0]}}!",
    content: "Niemand mag deze persoon meer aankijken anders: {{punishment-full}}",
  }
} satisfies IMinigame