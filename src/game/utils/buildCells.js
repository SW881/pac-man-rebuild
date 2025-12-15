export function buildCellsFromWallMap(wallMap) {
  const cells = [];
  for (let row = 0; row < wallMap.length; row++) {
    for (let col = 0; col < wallMap[row].length; col++) {
      const isWall = wallMap[row][col] === 1;
      cells.push({
        w: isWall,
        f: !isWall, // food exists initially where it's not a wall
        x: row + 1, // grid line index starts at 1
        y: col + 1,
      });
    }
  }
  return cells;
}

export function resetFood(cells) {
  return cells.map((c) => (c.w ? c : { ...c, f: true }));
}

export function countInitialFood(cells) {
  return cells.reduce((acc, c) => acc + (c.f ? 1 : 0), 0);
}
