import type { IMinigame } from './_template';

export const GracePeriod = {
  id: 'grace-period',
  numberOfPlayers: 0,
  score: 0,
  duration: 300,
  body: {
    title: "Niks!",
    content: "Je hebt even rust. Geniet ervan!",
  }
} satisfies IMinigame