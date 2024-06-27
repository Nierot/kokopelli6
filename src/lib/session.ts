import type { IMinigame } from './games/_template'
import { GameBartender } from './games/bartender'
import { GameBeerRelay } from './games/beer-relay'
import { GameBussen } from './games/bussen'
import { GameChugABeer1 } from './games/chug-a-beer-1'
import { GameChugABeer2 } from './games/chug-a-beer-2'
import { GameChugSomeoneElsesBeer } from './games/chug-someone-elses-beer'
import { GameCrazy88 } from './games/crazy88'
import { GameDrinkingBuddies } from './games/drinking-buddies'
import { GameDrunk } from './games/drunk'
import { GameDuctTape } from './games/duct-tape'
import { GameIntroduction } from './games/introduction'
import { GameJoostKlein7Stijl } from './games/joost-klein-7-stijl'
import { GameKnight } from './games/knight'
import { GameMixology } from './games/mixology'
import { GameMushroom } from './games/mushrooming'
import { GameMusicalChairs } from './games/musical-chairs'
import { GameNakkieWodka } from './games/nakkie-wodka'
import { GameNLAlert } from './games/nl-alert'
import { GameOpus } from './games/opus'
import { GameRockPaperChug } from './games/rock-paper-chug'
import { GameRollADie } from './games/roll-a-die'
import { GameSnakeEyes } from './games/snake-eyes'
import { GameSockCheck } from './games/sock-check'
import { GameStressPong } from './games/stress-pong'
import { GameStrohRum } from './games/stroh-rum'
import { GameWink } from './games/wink'
import { findOldPlayers, type PlayerArray } from './players'
import { getStorageItem, setStorageItem } from './storage'

const ALL_MINIGAMES = [
  GameChugABeer1,
  GameChugABeer2,
  GameSockCheck,
  GameBussen,
  GameBartender,
  GameBeerRelay,
  GameDrinkingBuddies,
  GameDuctTape,
  GameNLAlert,
  GameSnakeEyes,
  GameWink,
  GameKnight,
  GameMusicalChairs,
  GameChugSomeoneElsesBeer,
  GameJoostKlein7Stijl,
  GameCrazy88,
  GameStressPong,
  GameRockPaperChug,
  GameRollADie,
  GameOpus,
  GameMushroom,
  GameStrohRum,
  GameNakkieWodka,
  GameMixology,
  GameDrunk
] satisfies IMinigame[]

export type Game = {
  players: PlayerArray
  currentSong?: string
  currentGame?: IMinigame
  tick: number
}

type Events = 'next' | 'error' | 'game-over' | 'tick'

type EventEmitterDataType = {
  ['next']: IMinigame | undefined,
  ['error']: Error,
  ['game-over']: undefined,
  ['tick']: number
}

type EventEmitterReturnType = {
  ['next']: void,
  ['error']: void,
  ['game-over']: void,
  ['tick']: void
}

// TODO: Update localStorage state

export class Session {
  private game: Game
  private timeLeft: number = 0
  tick: number = 0

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private events: { [key: string]: Array<(data: any) => void> } = {}

  constructor(gameSettings: Game) {
    this.game = gameSettings
  }

  /**
   * Create a new game session from scratch
   */
  static fromNothing(): Session {
    const players = findOldPlayers()

    console.log('Starting a new game with the following player data:', players)

    if (!players || players.length === 0) {
      throw new Error('No players found')
    }


    return new Session({
      players,
      currentGame: GameIntroduction,
      tick: 0,
    })
  }

  /**
   * Create a new game session from old game data
   */
  static from(oldGame: Game): Session {
    console.log('Starting a game with old game data:', oldGame)

    if (!oldGame || !oldGame.players || oldGame.players.length === 0) {
      throw new Error('Geen spelers gevonden')
    }

    return new Session(oldGame)
  }


  private nextGame() {
    // First select all games that are not the current game, and also supports the amount of players
    const availableGames = ALL_MINIGAMES.filter(game => game !== this.game.currentGame && this.game.players.length >= game.numberOfPlayers)

    if (availableGames.length === 0) {
      // No games available, game over
      this.emit<'error'>('error', new Error("Geen spellen beschikbaar"))
      return
    }

    const weights = this.getWeights()

    // Sort the games by weight, select the first one
    const sortedGames = availableGames.sort((a, b) => {
      const weightA = weights[a.id] ?? 0
      const weightB = weights[b.id] ?? 0

      return weightA - weightB
    })
    const game = sortedGames[0]

    // Set the weight of the game to +1
    this.incWeight(game.id)

    this.game = {
      ...this.game,
      currentGame: game
    }

    this.timeLeft = game.duration

    this.emit('next', game)
  }

  private getWeights(): Record<string, number> {
    const weights = getStorageItem<Record<string, number>>('weights')

    if (!weights) {
      return {}
    }

    return weights
  }


  private incWeight(gameId: string): void {
    const weights = this.getWeights()

    const old = weights[gameId]

    weights[gameId] = (old ?? 0) + 1

    setStorageItem('weights', weights)
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
      this.emit<'tick'>('tick', this.tick)

      if (this.timeLeft !== 0) {
        this.timeLeft = this.timeLeft - 1
      }

      if (this.timeLeft === 0) {
        // Game is over
        this.timeLeft = -1
        this.nextGame()
      }

      // Update the state in localStorage
      this.store()
    }, 1000)


    // @ts-expect-error ja mag niet maar is wel handig
    window.nextGame = () => this.nextGame()
  }

  /**
   * Set a listener for a certain event
   * @param key Which event to listen to
   * @param func Callback function
   */
  on<K extends Events>(key: K, func: (data: EventEmitterDataType[K]) => EventEmitterReturnType[K]): void {
    if (this.events[key]) {
      this.events[key].push(func)
    } else {
      this.events[key] = [func]
    }
  }

  private emit<K extends Events>(key: K, data: EventEmitterDataType[K]): void {
    if (key !== 'tick') console.log(`Emitting event ${key} with data:`, data)

    for (const cb of this.events[key]) {
      cb(data)
    }

    // Store state in localStorage
    setStorageItem(key, data)
  }

  private store(): void {
    // Store state in localStorage
    setStorageItem('game-state', this.game)
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