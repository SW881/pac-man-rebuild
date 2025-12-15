export function checkIfPacEaten(pac, g1, g2, g3, g4) {
  return (
    (pac.x === g1.x && pac.y === g1.y) ||
    (pac.x === g2.x && pac.y === g2.y) ||
    (pac.x === g3.x && pac.y === g3.y) ||
    (pac.x === g4.x && pac.y === g4.y)
  );
}

export function isWallAt(cells, x, y) {
  return cells.some((c) => c.w && c.x === x && c.y === y);
}

export function eatFoodAt(cells, x, y) {
  // immutable update: returns { cells, ate }
  let ate = false;
  const next = cells.map((c) => {
    if (!ate && c.f && c.x === x && c.y === y) {
      ate = true;
      return { ...c, f: false };
    }
    return c;
  });
  return { cells: next, ate };
}
