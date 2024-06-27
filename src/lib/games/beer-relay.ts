import type { IMinigame } from './_template';

export const GameBeerRelay = {
  id: 'Bier estafette',
  numberOfPlayers: 8,
  score: 20,
  duration: 300,
  body: {
    title: "Bier estafette",
    content: "Gefeliciteerd! Jullie mogen een bier estafette doen. De teams zijn:<br/><br /> {{player[0]}}, {{player[1]}}, {{player[2]}} en {{player[3]}} <br />vs.<br />{{player[4]}}, {{player[5]}}, {{player[6]}} en {{player[7]}}",
  }
} satisfies IMinigame