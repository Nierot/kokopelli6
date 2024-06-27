import type { IMinigame, IMinigameBody } from './games/_template';
import type { Player, PlayerArray } from './players';

type RenderedGame = IMinigame
type RenderedBody = IMinigameBody

const BRACKETS = /\{\{(.*?)\}\}/gm
const PLAYER_SYMBOL = /\{\{player\[(.*?)\]\}\}/m

export function renderGame(game: IMinigame, playerArray: PlayerArray): RenderedGame {
  const body: Record<string, string> = {}
  const players = playerArray

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
          render = render.replace(symbol, selectedPlayer.name)
          // Rendering complete, nothing left to do for this symbol
          continue
        }

        // {{score}}
        match = symbol === '{{score}}'
        if (match) {
          render = render.replace(symbol, game.score ?? 0)
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