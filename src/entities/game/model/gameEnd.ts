import { scoreTickets } from "./scoreTickets";
import type { Game, PlayerId } from "./types";

export function checkGameEnd(game: Game): Game {
  const isAnyPlayerLowTrains = game.players.some(p => p.trains <= 2);
  if (isAnyPlayerLowTrains && game.status !== "finished") {
    const scoredGame = scoreTickets(game);
    let winnerId: PlayerId[] = [];
    let maxScore = -Infinity;
    for (const player of scoredGame.players) {
      if (player.score > maxScore) {
        maxScore = player.score;
        winnerId = [player.id];
      } else if (player.score === maxScore) {
        winnerId.push(player.id);
      }
    }
    return { ...scoredGame, status: "finished", winnerId };
  }
  return game;
}