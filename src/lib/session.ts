import type { IMinigame } from './games/_template'
import { GameChugABeer } from './games/chugABeer'
import { GameIntroduction } from './games/introduction'
import { findOldPlayers, type Player, type PlayerArray } from './players'
import { setStorageItem } from './storage'

export type Game = {
  players: PlayerArray
  currentSong?: string
  currentGame?: IMinigame
}

const ALL_MINIGAMES = [
  GameChugABeer
]

type Events = 'next' | 'error' | 'game-over' | 'tick'

// TODO: Update localStorage state

export class Session {
  private game: Game
  private timeLeft: number = 0
  tick: number = 0

  private events: { [key: string]: Array<(data: unknown) => void> } = {}

  constructor(gameSettings: Game) {
    this.game = gameSettings
  }

  /**
   * Create a new game session from scratch
   */
  static fromNothing(): Session {
    const players = findOldPlayers()
    return new Session({
      players,
      currentGame: GameIntroduction,
    })
  }

  /**
   * Create a new game session from old game data
   */
  static from(oldGame: Game): Session {
    return new Session(oldGame)
  }

  private emit(key: Events, data: unknown): void {
    if (key !== 'tick') console.log(`Emitting event ${key} with data:`, data)

    for (const cb of this.events[key]) {
      cb(data)
    }

    // Store state in localStorage
    setStorageItem(key, data)
  }

  private nextGame() {
    // First select a random game
    const idx = Math.floor(Math.random() * ALL_MINIGAMES.length)

    const game = ALL_MINIGAMES[idx]

    this.game = {
      ...this.game,
      currentGame: game
    }

    this.emit('next', game)
  }

  /**
   * Setup the game, this initializes the ticker and events
   */
  start(): void {
    // First emit the game
    this.emit('next', GameIntroduction)
    this.timeLeft = GameIntroduction.duration

    // Set timeouts
    setInterval(() => {
      this.tick = this.tick + 1
      this.emit('tick', this.tick)

      if (this.timeLeft !== 0) {
        this.timeLeft = this.timeLeft - 1
      }

      if (this.timeLeft === 0) {
        // Game is over
        this.timeLeft = -1
        this.nextGame()
      }
    }, 1000)

  }

  /**
   * Set a listener for a certain event
   * @param key Which event to listen to
   * @param func Callback function
   */
  on(key: Events, func: (data: unknown) => void): void {
    if (this.events[key]) {
      this.events[key].push(func)
    } else {
      this.events[key] = [func]
    }
  }

  getCurrentPlayers(): PlayerArray {
    return this.game.players
  }

  /**
   * Get the currently played game
   */
  getCurrentGame(): IMinigame | undefined {
    return this.game.currentGame
  }

  /**
   * Get the currently played song 
   */
  getCurrentSong(): string | undefined {
    return this.game.currentSong
  }
}