export default function Board({ cells, gameState }) {
  return (
    <div id="map">
      {cells.map((c) => (
        <div
          key={`${c.x}-${c.y}`}
          className={c.w ? "wall" : c.f ? "freespace" : "nofood"}
          style={{ gridColumnStart: c.x, gridRowStart: c.y }}
        />
      ))}

      <div
        className="pac"
        style={{
          gridColumnStart: gameState.pac_man.x,
          gridRowStart: gameState.pac_man.y,
        }}
      />

      <div
        className="ghost1"
        style={{
          gridColumnStart: gameState.ghost1.x,
          gridRowStart: gameState.ghost1.y,
        }}
      />
      <div
        className="ghost2"
        style={{
          gridColumnStart: gameState.ghost2.x,
          gridRowStart: gameState.ghost2.y,
        }}
      />
      <div
        className="ghost3"
        style={{
          gridColumnStart: gameState.ghost3.x,
          gridRowStart: gameState.ghost3.y,
        }}
      />
      <div
        className="ghost4"
        style={{
          gridColumnStart: gameState.ghost4.x,
          gridRowStart: gameState.ghost4.y,
        }}
      />
    </div>
  );
}
