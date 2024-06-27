import type { IMinigame } from './_template';

export const GameDuctTape = {
  id: 'Ducttape',
  numberOfPlayers: 2,
  score: 20,
  duration: 60,
  body: {
    title: "Gefeliciteerd {{player[0]}} en {{player[1]}}!",
    content: "Pak de ducttape maar",
    footer: "Jullie zijn de komende 60 minuten aan elkaar vastgeplakt!"
  }
} satisfies IMinigame