import { createGame } from "./entities/game/model/createGame";
import { dispatch } from "./entities/game/model/dispatch";
import { getCurrentPlayer } from "./entities/game/model/selectors/getCurrentPlayer";
import { europeRoutes } from "./entities/map/europe";

function App() {
  let game = createGame(["Alice", "Artur"], europeRoutes);

  console.log('Game1:', game)

  let result = dispatch(game, {
    type: "DRAW_CARD",
    source: "faceUp",
    index: 2,
  });
  game = result.ok ? result.game : game;

  result = dispatch(game, {
    type: "DRAW_CARD",
    source: "faceUp",
    index: 2,
  });
  game = result.ok ? result.game : game;

  console.log("Phase after 2 draws:", game.turn.phase);
  console.log("Current player:", getCurrentPlayer(game));

  result = dispatch(game, {
    type: "CLAIM_ROUTE",
    routeId: "route1",
    cards: ["red", "red", "red"],
  });
  game = result.ok ? result.game : game;

  console.log("Next player:", getCurrentPlayer(game));
  console.log("Phase:", game.turn.phase);

  console.log(
    "Trains:",
    game.players.map((p) => ({
      name: p.name,
      trains: p.trains,
    })),
  );

  console.log('Game:', game)

  result = dispatch(game, {
    type: "END_TURN",
  });
  game = result.ok ? result.game : game;

  result = dispatch(game, {
    type: "DRAW_CARD",
    source: "faceUp",
    index: 2,
  });
  game = result.ok ? result.game : game;

  result = dispatch(game, {
    type: "DRAW_CARD",
    source: "faceUp",
    index: 2,
  });
  game = result.ok ? result.game : game;

  console.log('Game:', game)

  return <div>Check console</div>;
}

export default App;
