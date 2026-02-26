import { createGame } from "./entities/game/model/createGame"
import { dispatch } from "./entities/game/model/dispatch"

function App() {
  let game = createGame(["Alice", "Bob"])

  const result1 = dispatch(game, { type: "DRAW_CARD" })

  if (result1.ok) {
    game = result1.game
  } else {
    console.error(result1.error)
  }

  console.log(game)

  return <div>Check console</div>
}

export default App