import { GameChugABeer } from './games/chugABeer'
import { GameIntroduction } from './games/introduction'
import { findOldPlayers, type PlayerArray } from './players'

export type Game = {
  players: PlayerArray
  currentSong?: string
  currentGame?: Minigame
}

export type Minigame = {
  title: string
}

const ALL_MINIGAMES = [
  GameIntroduction,
  GameChugABeer
]

// TODO: Update localStorage state

export class Session {
  private game: Game

  constructor(gameSettings: Game) {
    this.game = gameSettings
  }

  static fromNothing(): Session {
    const players = findOldPlayers()
    return new Session({
      players,
      currentGame: GameIntroduction,
    })
  }

  static from(oldGame: Game): Session {
    return new Session(oldGame)
  }

  getCurrentGame(): Minigame | undefined {
    return this.game.currentGame
  }


  getCurrentSong(): string | undefined {
    return this.game.currentSong
  }
}