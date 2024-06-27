import type { IMinigame } from './_template';

export const GameChugSomeoneElsesBeer = {
  id: 'Dikke L',
  numberOfPlayers: 0,
  score: 0,
  duration: 60,
  body: {
    title: "Haha",
    content: "{{player[0]}} moet het drankje van {{player[1]}} opdrinken!",
  }
} satisfies IMinigame