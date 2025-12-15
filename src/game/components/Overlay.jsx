export default function Overlay({ gameStatus }) {
  if (gameStatus !== "gameover" && gameStatus !== "won") return null;

  const won = gameStatus === "won";

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: won ? "#ffcc00" : "white",
        padding: "40px",
        borderRadius: "10px",
        textAlign: "center",
        zIndex: 1000,
        fontSize: "24px",
        fontFamily: "Press Start 2P",
      }}
    >
      {won ? "Pac-Man Won!" : "Game Over!"}
      <br />
      Press ENTER to play again
    </div>
  );
}
