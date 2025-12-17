import { useEffect, useMemo, useState } from "react";
import { wallMap } from "../../constants/wallMap";
import {
  buildCellsFromWallMap,
  countInitialFood,
  resetFood,
} from "../utils/buildCells";
import { checkIfPacEaten, eatFoodAt } from "../utils/collisions";
import { moveGhostLogic, movePac } from "../utils/movement";

const INITIAL_POSITIONS = {
  pac_man: { x: 2, y: 20 },
  ghost1: { x: 10, y: 10 },
  ghost2: { x: 2, y: 2 },
  ghost3: { x: 18, y: 2 },
  ghost4: { x: 18, y: 19 },
};

export function usePacmanGame() {
  const initialCells = useMemo(() => buildCellsFromWallMap(wallMap), []);
  const initialFood = useMemo(
    () => countInitialFood(initialCells),
    [initialCells]
  );

  const [cells, setCells] = useState(initialCells);

  const [gameState, setGameState] = useState({
    ...INITIAL_POSITIONS,
    totalFood: initialFood,
    ghost1Direction: 1,
    ghost2Direction: 2,
    ghost3Direction: 3,
    ghost4Direction: 4,
    speed: 30,
    startGame: false,
    activeDirection: 6,
    previousActiveDirection: 6,
    pressed: false,
    score: 0,
    gameStatus: "",
  });

  const resetGame = () => {
    setCells((prev) => resetFood(prev));
    setGameState((prev) => ({
      ...prev,
      ...INITIAL_POSITIONS,
      totalFood: initialFood,
      ghost1Direction: 1,
      ghost2Direction: 2,
      ghost3Direction: 3,
      ghost4Direction: 4,
      speed: 30,
      startGame: false,
      activeDirection: 6,
      previousActiveDirection: 6,
      pressed: false,
      score: 0,
      gameStatus: "",
    }));
  };

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        setGameState((prev) => {
          if (prev.gameStatus === "") return { ...prev, startGame: true };
          return prev; // reset handled below
        });
        if (gameState.gameStatus !== "") resetGame();
        return;
      }

      const dir =
        e.key === "ArrowRight"
          ? 6
          : e.key === "ArrowLeft"
          ? 4
          : e.key === "ArrowUp"
          ? 8
          : e.key === "ArrowDown"
          ? 2
          : null;

      if (dir == null) return;

      setGameState((prev) => ({
        ...prev,
        pressed: true,
        previousActiveDirection: prev.activeDirection,
        activeDirection: dir,
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState.gameStatus, initialFood]); // keep same behavior

  // Game loop
  useEffect(() => {
    if (!gameState.startGame || gameState.gameStatus !== "") return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        // 1) lose/win checks
        if (
          checkIfPacEaten(
            prev.pac_man,
            prev.ghost1,
            prev.ghost2,
            prev.ghost3,
            prev.ghost4
          )
        ) {
          return { ...prev, gameStatus: "gameover", startGame: false };
        }

        if (prev.totalFood === 0) {
          return { ...prev, gameStatus: "won", startGame: false };
        }

        // 2) pac move
        const pacTry = movePac(cells, prev.activeDirection, prev.pac_man);
        let nextPac = pacTry.pac;

        if (!pacTry.moved && prev.pressed) {
          const prevTry = movePac(
            cells,
            prev.previousActiveDirection,
            prev.pac_man
          );
          if (prevTry.moved) nextPac = prevTry.pac;
        }

        // 3) compute eat + update cells (NO local ate variable from setCells callback)
        const hitIndex = cells.findIndex(
          (c) => c.f && c.x === nextPac.x && c.y === nextPac.y
        );

        const ate = hitIndex !== -1;

        if (ate) {
          // update cells immutably
          setCells((old) => {
            // old might be newer than `cells`, so locate again in old
            const idx = old.findIndex(
              (c) => c.f && c.x === nextPac.x && c.y === nextPac.y
            );
            if (idx === -1) return old;
            const copy = old.slice();
            copy[idx] = { ...copy[idx], f: false };
            return copy;
          });
        }

        // 4) ghosts
        const g1 = moveGhostLogic(cells, prev.ghost1, prev.ghost1Direction);
        const g2 = moveGhostLogic(cells, prev.ghost2, prev.ghost2Direction);
        const g3 = moveGhostLogic(cells, prev.ghost3, prev.ghost3Direction);
        const g4 = moveGhostLogic(cells, prev.ghost4, prev.ghost4Direction);

        // 5) return next state (score derived from prev.score)
        return {
          ...prev,
          pac_man: nextPac,
          ghost1: g1.ghost,
          ghost1Direction: g1.direction,
          ghost2: g2.ghost,
          ghost2Direction: g2.direction,
          ghost3: g3.ghost,
          ghost3Direction: g3.direction,
          ghost4: g4.ghost,
          ghost4Direction: g4.direction,
          score: ate ? prev.score + 10 : prev.score,
          totalFood: ate ? prev.totalFood - 1 : prev.totalFood,
          pressed: false,
        };
      });
    }, 3000 / gameState.speed);

    return () => clearInterval(interval);
  }, [gameState.startGame, gameState.speed, gameState.gameStatus, cells]);

  return { cells, gameState, resetGame };
}
