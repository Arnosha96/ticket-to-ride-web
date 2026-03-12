import { isConnected } from "./graph/isConnected";
import type { Game } from "./types";

export function scoreTickets(game: Game): Game {
  const updatedPlayers = game.players.map((player) => {
    let score = player.score;

    for (const ticket of player.tickets) {
      const connected = isConnected(
        game.routes,
        player.id,
        ticket.from,
        ticket.to,
      );

      if (connected) {
        score += ticket.points;
      } else {
        score -= ticket.points;
      }
    }

    return { ...player, score };
  });

  return {
    ...game,
    players: updatedPlayers,
  };
}
