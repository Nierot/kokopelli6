import type { IMinigame } from './_template';

export const GameDrunk = {
  id: 'Dronkenmensen',
  numberOfPlayers: 0,
  score: 0,
  duration: 60,
  body: {
    title: "Dronken",
    content: "De meest dronken persoon mag 20 slokken uitdelen.",
  }
} satisfies IMinigame