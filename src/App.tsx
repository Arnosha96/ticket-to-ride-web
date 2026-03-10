import { createGame } from "./entities/game/model/createGame";
import { dispatch } from "./entities/game/model/dispatch";
import { getCurrentPlayer } from "./entities/game/model/selectors/getCurrentPlayer";

function App() {
  let game = createGame(["Alice", "Bob"]);

  let result = dispatch(game, { type: "DRAW_CARD" });
  game = result.ok ? result.game : game;

  result = dispatch(game, { type: "DRAW_CARD" });
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

  return <div>Check console</div>;
}

export default App;
