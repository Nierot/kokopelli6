// export const GameTemplate = {
//   title: 'Template',
//   numberOfPlayer: 1,
//   score: 10,
//   duration: 60,
//   body: {
//     title: "Template game",
//     content: "In dit spel verdiend {{player[0]}} {{score}} punten"
//   }
// }

export interface IMinigame {
  title: string
  numberOfPlayers?: number
  score?: number
  duration: number
  body: IMinigameBody
}

export interface IMinigameBody {
  title: string
  content: string
  footer?: string
}