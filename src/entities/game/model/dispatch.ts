import type { GameAction } from "./actions";
import { drawCardFromDeck, drawCardFromFaceUp } from "./drawCard";
import { checkGameEnd } from "./gameEnd";
import { getCurrentPlayer } from "./selectors/getCurrentPlayer";
import { getRoute } from "./selectors/getRoute";
import type { CardColor, Game, GameResult } from "./types";

export function dispatch(game: Game, action: GameAction): GameResult {
  switch (action.type) {
    case "DRAW_CARD":
      return handleDrawCard(game, action);

    case "END_TURN":
      return handleEndTurn(game);

    case "CLAIM_ROUTE":
      return handleClaimRoute(game, action);

    default:
      return { ok: false, error: "Unknown action" };
  }
}

function handleDrawCard(
  game: Game,
  action: Extract<GameAction, { type: "DRAW_CARD" }>
): GameResult {

  if (game.status !== "playing")
    return { ok: false, error: "Game is not active" }

  if (game.turn.phase !== "draw")
    return { ok: false, error: "Cannot draw cards in this phase" }

  if (game.turn.cardsDrawn >= 2)
    return { ok: false, error: "Already drew 2 cards this turn" }

  let updatedGame: Game

  if (action.source === "deck") {
    if (game.deck.length === 0)
      return { ok: false, error: "Deck is empty" }

    updatedGame = drawCardFromDeck(game)
  } else {
    updatedGame = drawCardFromFaceUp(game, action.index)
  }

  if (updatedGame.turn.cardsDrawn >= 2) {
    updatedGame = {
      ...updatedGame,
      turn: {
        phase: "claim",
        cardsDrawn: updatedGame.turn.cardsDrawn,
      },
    }
  }

  updatedGame = checkGameEnd(updatedGame)

  return { ok: true, game: updatedGame }
}

function handleEndTurn(game: Game): GameResult {
  const nextPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;

  const updatedGame: Game = {
    ...game,
    currentPlayerIndex: nextPlayerIndex,
    turn: {
      phase: "draw",
      cardsDrawn: 0,
    },
  };

  return { ok: true, game: updatedGame };
}

function handleClaimRoute(
  game: Game,
  action: Extract<GameAction, { type: "CLAIM_ROUTE" }>,
): GameResult {
  if (game.turn.phase !== "claim")
    return { ok: false, error: "Cannot claim route in this phase" };

  const player = getCurrentPlayer(game);
  const route = getRoute(game, action.routeId);
  if (!route) return { ok: false, error: "Route not found" };
  if (route.ownerId) return { ok: false, error: "Route already claimed" };
  if (action.cards.length !== route.length)
    return { ok: false, error: "Wrong number of cards" };

  if (player.trains < route.length)
    return { ok: false, error: "Not enough trains" };

  const isGray = route.color === "gray";
  const requiredColor = isGray ? null : route.color;
  const usedLocomotives: CardColor[] = [];
  const usedColorCards: CardColor[] = [];

  for (const card of action.cards) {
    if (card === "locomotive") {
      usedLocomotives.push(card);
    } else {
      usedColorCards.push(card);
    }
  }

 if (!isGray) {
    const allMatch = usedColorCards.every(c => c === requiredColor);
    if (!allMatch) {
      return { ok: false, error: `All colored cards must be ${requiredColor}` };
    }
  } else {
    if (usedColorCards.length > 0) {
      const firstColor = usedColorCards[0];
      const allSameColor = usedColorCards.every(c => c === firstColor);
      if (!allSameColor) {
        return { ok: false, error: "All colored cards must be the same color for a gray route" };
      }
    }
  }

  const playerCards = [...player.cards];
  for (const card of action.cards) {
    const index = playerCards.indexOf(card);
    if (index === -1)
      return { ok: false, error: "Player doesn't have required cards" };
    playerCards.splice(index, 1);
  }

  const updatedPlayers = game.players.map((p) =>
  p.id === player.id
    ? {
        ...p,
        cards: playerCards,
        score: p.score + route.length,
        trains: p.trains - route.length,
      }
    : p,
)
  const updatedRoutes = game.routes.map((r) =>
    r.id === route.id ? { ...r, ownerId: player.id } : r,
  );

  let updatedGame: Game = {
    ...game,
    players: updatedPlayers,
    routes: updatedRoutes,
    discardPile: [...game.discardPile, ...action.cards],
    turn: {
      phase: "draw",
      cardsDrawn: 0,
    },
    currentPlayerIndex: (game.currentPlayerIndex + 1) % game.players.length,
  };

  updatedGame = checkGameEnd(updatedGame);
  return { ok: true, game: updatedGame };
}
