import { isWallAt } from "./collisions";

export function movePac(cells, dir, pac) {
  // 8 up, 2 down, 4 left, 6 right
  let nx = pac.x;
  let ny = pac.y;

  if (dir === 8) ny -= 1;
  else if (dir === 2) ny += 1;
  else if (dir === 4) nx -= 1;
  else if (dir === 6) nx += 1;

  if (isWallAt(cells, nx, ny)) return { pac, moved: false };
  return { pac: { x: nx, y: ny }, moved: true };
}

export function moveGhostLogic(cells, ghost, direction) {
  let nx = ghost.x;
  let ny = ghost.y;

  if (direction === 1) ny -= 1; // up
  else if (direction === 2) nx += 1; // right
  else if (direction === 3) ny += 1; // down
  else if (direction === 4) nx -= 1; // left

  if (!isWallAt(cells, nx, ny)) {
    return { ghost: { x: nx, y: ny }, direction };
  }

  // hit wall -> random direction
  return { ghost, direction: Math.floor(Math.random() * 4) + 1 };
}
