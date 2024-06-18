// export const GameTemplate = {
//   title: 'Template',
//   numberOfPlayer: 1,
//   score: 10,
//   duration: 60,
//   body: {
//     title: "Template game",
//     content: "In dit spel verdiend {{player-1}} {{score}} punten"
//   }
// }

export interface IMinigame {
  title: string
  numberOfPlayer?: number
  score?: number
  duration: number
  body: {
    title: string
    content: string
    footer?: string
  }
}