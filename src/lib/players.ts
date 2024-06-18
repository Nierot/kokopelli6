import { getStorageItem } from './storage'

const PLAYER_KEY = 'players'

export type Player = {
  id: number,
  name: string,
  score: number,
}

export type PlayerArray = Array<Player>

export function findOldPlayers(): PlayerArray {
  const players = getStorageItem<PlayerArray>(PLAYER_KEY)

  if (!players) return []

  return players
}
