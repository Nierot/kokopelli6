import type { IMinigame } from './_template';

export const GameDrinkingBuddies = {
  id: 'Drinking buddies',
  numberOfPlayers: 2,
  score: 10,
  duration: 60,
  body: {
    title: "Drinking buddies!",
    content: "Voor het komende uur zijn {{player[0]}} en {{player[1]}} drinking buddies!"
  }
} satisfies IMinigame