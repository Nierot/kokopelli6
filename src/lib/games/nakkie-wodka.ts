import type { IMinigame } from './_template';

export const GameNakkieWodka = {
  id: 'Bah',
  numberOfPlayers: 1,
  score: 25,
  duration: 60,
  body: {
    title: "{{player[0]}}",
    content: "Doe een nakkie wodka.",
    footer: "Bij wijgering: {{punishment-full}}"
  }
} satisfies IMinigame