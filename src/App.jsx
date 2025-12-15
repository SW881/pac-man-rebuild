import "./App.css";
import Board from "./game/components/Board";
import Hud from "./game/components/Hud";
import Overlay from "./game/components/Overlay";
import { usePacmanGame } from "./game/hooks/usePacmanGame";

export default function App2() {
  const { cells, gameState } = usePacmanGame();

  return (
    <div className="body">
      <div id="header">Pac-man</div>
      <Hud score={gameState.score} />
      <Overlay gameStatus={gameState.gameStatus} />
      <Board cells={cells} gameState={gameState} />
    </div>
  );
}
