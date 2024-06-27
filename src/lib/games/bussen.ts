import type { IMinigame } from './_template';

export const GameBussen = {
  id: 'Bussen',
  numberOfPlayers: 1,
  score: 15,
  duration: 240,
  body: {
    title: "RRReis",
    content: "Gefeliciteerd {{player[0]}}. Jij gaat de bus in!",
    footer: "Deze bus is {{rand-4-12}} kaarten lang."
  }
} satisfies IMinigame