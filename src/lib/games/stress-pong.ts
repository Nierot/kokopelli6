import type { IMinigame } from './_template';

export const GameStressPong = {
  id: 'Stress Pong',
  numberOfPlayers: 4,
  score: 0,
  duration: 480,
  body: {
    title: "Stress Pong!",
    content: "{{player[0]}}, {{player[1]}}, {{player[2]}} en {{player[3]}} gaan een leuk potje stresspongen!",
  }
} satisfies IMinigame