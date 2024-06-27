import type { IMinigame } from './_template';

export const GameMixology = {
  id: 'Mixologie',
  numberOfPlayers: 1,
  score: 12,
  duration: 120,
  body: {
    title: "Lekker mixen",
    content: "Gooi 4 willekeurige drankjes (die op de tafel staan) in een glas en adt het",
  }
} satisfies IMinigame