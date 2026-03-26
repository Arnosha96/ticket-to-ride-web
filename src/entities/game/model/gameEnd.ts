import { getLongestChainLength } from "./graph/longestChain";
import { scoreTickets } from "./scoreTickets";
import type { Game, PlayerId } from "./types";

const LONGEST_CHAIN_BONUS = 10;

export function checkGameEnd(game: Game): Game {
  const isAnyPlayerLowTrains = game.players.some((p) => p.trains <= 2);
  if (isAnyPlayerLowTrains && !game.finalRoundTriggered) {
    return {
      ...game,
      finalRoundTriggered: true,
      finalRoundStartPlayerIndex: game.currentPlayerIndex,
    };
  }

  if (game.finalRoundTriggered && game.currentPlayerIndex === game.finalRoundStartPlayerIndex) {
    let scoredGame = scoreTickets(game);

    const chainLengths = scoredGame.players.map((player) => ({
      playerId: player.id,
      length: getLongestChainLength(scoredGame.routes, player.id),
    }));
    const maxLength = Math.max(...chainLengths.map((item) => item.length));

    if (maxLength > 0) {
      const winners = chainLengths
        .filter((item) => item.length === maxLength)
        .map((item) => item.playerId);
      const updatedPlayers = scoredGame.players.map((player) =>
        winners.includes(player.id)
          ? { ...player, score: player.score + LONGEST_CHAIN_BONUS }
          : player,
      );
      scoredGame = { ...scoredGame, players: updatedPlayers };
    }

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
