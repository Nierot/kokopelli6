import type { IMinigame } from './games/_template'
import { GameChugABeer } from './games/chugABeer'
import { GameIntroduction } from './games/introduction'
import { findOldPlayers, type PlayerArray } from './players'

export type Game = {
  players: PlayerArray
  currentSong?: string
  currentGame?: IMinigame
  timeLeft: number
}

const ALL_MINIGAMES = [
  GameIntroduction,
  GameChugABeer
]

type Events = 'next' | 'error'

// TODO: Update localStorage state

export class Session {
  private game: Game
  private tick: number = 0

  private events: { [key: string]: (data: unknown) => void } = {}

  constructor(gameSettings: Game) {
    this.game = gameSettings
  }

  static fromNothing(): Session {
    const players = findOldPlayers()
    return new Session({
      players,
      currentGame: GameIntroduction,
      timeLeft: 60
    })
  }

  start(): void {
    // Set timeouts
    setInterval(() => {
      this.tick = this.tick + 1
      if (this.game.timeLeft !== 0) {
        this.game.timeLeft = this.game.timeLeft - 1
      }

      if (this.game.timeLeft === 0) {
        // Game is over

      }
    }, 1000)
  }

  on(key: Events, func: (data: unknown) => void): void {
    this.events[key] = func
  }

  private emit(key: Events, data: unknown): void {
    if (this.events[key]) {
      this.events[key](data)
    }
  }

  static from(oldGame: Game): Session {
    return new Session(oldGame)
  }

  getCurrentGame(): IMinigame | undefined {
    return this.game.currentGame
  }


  getCurrentSong(): string | undefined {
    return this.game.currentSong
  }
}