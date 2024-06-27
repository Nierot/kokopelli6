import type { IMinigame, IMinigameBody } from './games/_template';
import type { Player, PlayerArray } from './players';

type RenderedGame = IMinigame
type RenderedBody = IMinigameBody

const BRACKETS = /\{\{(.*?)\}\}/gm
const PLAYER_SYMBOL = /\{\{player\[(.*?)\]\}\}/m
const RAND_SYMBOL = /\{\{rand-(\d+)-(\d+)\}\}/m

const FULL_PUNISHMENTS = [
  {
    text: 'neem een shotje',
    score: 12,
  },
  {
    text: 'neem 1 slok',
    score: 1
  },
  {
    text: 'neem 2 slokken',
    score: 2
  },
  {
    text: 'neem 3 slokken',
    score: 3
  },
  {
    text: 'neem 4 slokken',
    score: 4
  },
  {
    text: 'neem 6 slokken',
    score: 6
  },
  {
    text: 'neem 8 slokken',
    score: 8
  }
]

const LIGHT_PUNISHMENTS = [
  {
    text: 'slok',
    score: 1,
  },
  {
    text: 'shot',
    score: 12
  },
  {
    text: 'bak',
    score: 12
  },
  {
    text: 'balen',
    score: 4
  },
  {
    text: 'halve leo',
    score: 18
  }
]

// TODO scores

export function renderGame(game: IMinigame, playerArray: PlayerArray): RenderedGame {
  const body: Record<string, string> = {}
  // make a deep copy
  const players = JSON.parse(JSON.stringify(playerArray))

  let score = game.score ?? 0

  for (const [key, value] of Object.entries(game.body)) {
    let render = value

    console.log("Matching", key, value)

    // First select all brackets
    const values = value.match(BRACKETS)

    if (values && values.length > 0) {
      for (const symbol of values) {
        console.log(symbol)

        // Now check what kind of symbol it is
        // {{player[idx]}}
        let match = symbol.match(PLAYER_SYMBOL)
        if (match) {
          const pid = Number.parseInt(match[1])

          console.log('Found player:', pid)

          const [selectedIdx, selectedPlayer] = selectPlayer(players)
          // remove selected player from the player array
          players.splice(selectedIdx, 1)
          render = render.replace(symbol, "<span class=\"player\">" + selectedPlayer.name + "</span>")
          // Rendering complete, nothing left to do for this symbol
          continue
        }

        // {{score}}
        match = symbol === '{{score}}'
        if (match) {
          render = render.replace(symbol, game.score ?? 0)
          continue
        }

        match = symbol === '{{punishment-full}}'
        if (match) {
          // Select a random punishment
          const punishment = FULL_PUNISHMENTS[Math.floor(Math.random() * FULL_PUNISHMENTS.length)]

          score = punishment.score
          render = render.replace(symbol, "<span class=\"punishment\">" + punishment.text + "</span>")
          continue
        }

        match = symbol === '{{punishment-light}}'
        if (match) {
          const punishment = LIGHT_PUNISHMENTS[Math.floor(Math.random() * LIGHT_PUNISHMENTS.length)]

          score = punishment.score
          render = render.replace(symbol, "<span class=\"punishment\">" + punishment.text + "</span>")
          continue
        }

        match = symbol.match(RAND_SYMBOL)
        if (match) {
          const min = Number.parseInt(match[1])
          const max = Number.parseInt(match[2])

          const rand = Math.floor(Math.random() * (max - min + 1) + min)

          render = render.replace(symbol, "<span class=\"rand\">" + rand + "</span>")
          continue
        }

      }
    }

    // console.log(values)

    body[key] = render
  }

  console.log(body)

  return {
    ...game,
    score,
    body: body as unknown as RenderedBody
  }
}

function selectPlayer(players: PlayerArray): [number, Player] {
  // Select the player with the lowest score
  let lp = players[0]
  let index = 0
  for (const [idx, player] of Object.entries(players)) {
    if (player.score < lp.score) {
      lp = player
      index = Number.parseInt(idx)
    }
  }

  return [index, lp]
}

// renderGame({
//   title: "game title",
//   duration: 1,
//   score: 44,
//   body: {
//     "content": "Dus {{player[0]}} pak maar een rietje. Je krijgt er {{score}} punten voor!",
//     "title": "title"
//   }
// }, [
//   { id: 0, name: 'Niels 0', score: 50 },
//   { id: 1, name: 'Niels 1', score: 10 },
//   { id: 3, name: 'Niels 2', score: 20 },
//   { id: 4, name: 'Niels 3', score: 30 },
//   { id: 2, name: 'Niels 4', score: 40 },
// ])