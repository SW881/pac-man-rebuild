// 1 ------------------------------------------------------------------------------------------------------
let pac_man = { x: 2, y: 20 };
let ghost1 = { x: 10, y: 10 };
let ghost2 = { x: 2, y: 2 };
let ghost3 = { x: 18, y: 2 };
let ghost4 = { x: 18, y: 19 };
let totalFood = 215;
let pacIsDead = false;
let ghost1Direction = 1;
let ghost2Direction = 2;
let ghost3Direction = 3;
let ghost4Direction = 4;
let speed = 30;
let startGame = false;
let activeDirection = 6;
let previousActiveDirection;
let pressed = false;
let score = 0;
let wallMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let completeWallMaps = [];
for (var i = 0; i < wallMap.length; i++) {
  for (var j = 0; j < wallMap[i].length; j++) {
    if (wallMap[i][j] === 1) {
      completeWallMaps.push({ w: true, f: false, x: i + 1, y: j + 1 });
    } else {
      completeWallMaps.push({ w: false, f: true, x: i + 1, y: j + 1 });
    }
  }
}

completeWallMaps.forEach((e, index) => {
  if (e.w) {
    wallElement = document.createElement("div");
    wallElement.style.gridColumnStart = e.x;
    wallElement.style.gridRowStart = e.y;
    wallElement.classList.add("wall");
    map.append(wallElement);
  } else if (e.f) {
    foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = e.x;
    foodElement.style.gridRowStart = e.y;
    foodElement.classList.add("freespace");
    map.append(foodElement);
  }
});
// 1 ------------------------------------------------------------------------------------------------------
// 2 ------------------------------------------------------------------------------------------------------
pacElement = document.createElement("div");
pacElement.style.gridColumnStart = pac_man.x;
pacElement.style.gridRowStart = pac_man.y;
pacElement.classList.add("pac");
map.append(pacElement);

ghostElement = document.createElement("div");
ghostElement.style.gridColumnStart = ghost1.x;
ghostElement.style.gridRowStart = ghost1.y;
ghostElement.classList.add("ghost1");
map.append(ghostElement);

ghostElement = document.createElement("div");
ghostElement.style.gridColumnStart = ghost2.x;
ghostElement.style.gridRowStart = ghost2.y;
ghostElement.classList.add("ghost2");
map.append(ghostElement);

ghostElement = document.createElement("div");
ghostElement.style.gridColumnStart = ghost3.x;
ghostElement.style.gridRowStart = ghost3.y;
ghostElement.classList.add("ghost3");
map.append(ghostElement);

ghostElement = document.createElement("div");
ghostElement.style.gridColumnStart = ghost4.x;
ghostElement.style.gridRowStart = ghost4.y;
ghostElement.classList.add("ghost4");
map.append(ghostElement);
// 2 ------------------------------------------------------------------------------------------------------
// 3 ------------------------------------------------------------------------------------------------------
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Enter":
      startGame = true;
      break;

    case "ArrowRight":
      checkIfPacEaten();
      pressed = true;
      previousActiveDirection = activeDirection;
      activeDirection = 6;
      break;

    case "ArrowLeft":
      checkIfPacEaten();
      pressed = true;
      previousActiveDirection = activeDirection;
      activeDirection = 4;
      break;

    case "ArrowUp":
      checkIfPacEaten();
      pressed = true;
      previousActiveDirection = activeDirection;
      activeDirection = 8;
      break;

    case "ArrowDown":
      checkIfPacEaten();
      pressed = true;
      previousActiveDirection = activeDirection;
      activeDirection = 2;
      break;

    default:
      break;
  }
});
// 3 ------------------------------------------------------------------------------------------------------
// 4 ------------------------------------------------------------------------------------------------------
function checkIfPacEaten() {
  if (
    (pac_man.x === ghost1.x && pac_man.y === ghost1.y) ||
    (pac_man.x === ghost2.x && pac_man.y === ghost2.y) ||
    (pac_man.x === ghost3.x && pac_man.y === ghost3.y) ||
    (pac_man.x === ghost4.x && pac_man.y === ghost4.y)
  ) {
    return true;
  } else {
    return false;
  }
}
// 4 ------------------------------------------------------------------------------------------------------
// 5 ------------------------------------------------------------------------------------------------------
function animate() {
  setTimeout(function () {
    reqAnimationId = requestAnimationFrame(animate);
    gameEngine();
  }, 3000 / speed);
}

window.requestAnimationFrame(animate);

function gameEngine() {
  if (checkIfPacEaten()) {
    alert("Game over");
    location.reload();
  } else {
    if (startGame) {
      if (totalFood !== 0) {
        moveGhost1Random();
        moveGhost2Random();
        moveGhost3Random();
        moveGhost4Random();
        movePac(activeDirection);
      } else {
        alert("Pac man won");
      }
    }
  }
}
// 5 ------------------------------------------------------------------------------------------------------

// 6 ------------------------------------------------------------------------------------------------------
function movePac(moveDirection) {
  let isWall = false;
  let rotate = "";

  if (moveDirection === 8) {
    let checkWall = completeWallMaps.some((elem) => {
      if (elem.w && elem.x === pac_man.x && elem.y === pac_man.y - 1) {
        isWall = true;
      }
    });
    if (!isWall) {
      pac_man = { x: pac_man.x, y: pac_man.y - 1 };
      rotate = rotate + "rotate(180deg)";
    }
  }
  if (moveDirection === 2) {
    let checkWall = completeWallMaps.some((elem) => {
      if (elem.w && elem.x === pac_man.x && elem.y === pac_man.y + 1) {
        isWall = true;
      }
    });
    if (!isWall) {
      pac_man = { x: pac_man.x, y: pac_man.y + 1 };
      rotate = rotate + "rotate(360deg)";
    }
  }
  if (moveDirection === 4) {
    let checkWall = completeWallMaps.some((elem, index) => {
      if (elem.w && elem.x === pac_man.x - 1 && elem.y === pac_man.y) {
        isWall = true;
      }
    });
    if (!isWall) {
      pac_man = { x: pac_man.x - 1, y: pac_man.y };
      rotate = rotate + "rotate(90deg)";
    }
  }
  if (moveDirection === 6) {
    let checkWall = completeWallMaps.some((elem) => {
      if (elem.w && elem.x === pac_man.x + 1 && elem.y === pac_man.y) {
        isWall = true;
      }
    });
    if (!isWall) {
      pac_man = { x: pac_man.x + 1, y: pac_man.y };
      rotate = rotate + "rotate(-90deg)";
    }
  }

  if (!isWall) {
    const allPacContainer = Array.from(document.getElementsByClassName("pac"));
    allPacContainer.forEach((element) => {
      element.remove();
    });
    pacElement = document.createElement("div");
    pacElement.style.gridColumnStart = pac_man.x;
    pacElement.style.gridRowStart = pac_man.y;
    pacElement.style.transform = rotate;
    pacElement.classList.add("pac");
    map.appendChild(pacElement);
    pressed = false;
    completeWallMaps.forEach((e, index) => {
      if (e.f && e.x === pac_man.x && e.y === pac_man.y) {
        foodElement = document.createElement("div");
        foodElement.style.gridColumnStart = e.x;
        foodElement.style.gridRowStart = e.y;
        foodElement.classList.add("nofood");
        map.append(foodElement);
        e.f = false;
        score = score + 10;
        totalFood = totalFood - 1;
        console.log({ totalFood });
      }
    });
    document.getElementById("score").innerHTML = score;
    return;
  } else if (pressed) {
    activeDirection = previousActiveDirection;
    pressed = false;
    movePac(activeDirection);
  }
}
// 6 ------------------------------------------------------------------------------------------------------

// 7 ------------------------------------------------------------------------------------------------------
function moveGhost1Random() {
  if (!checkIfPacEaten()) {
    let isWall = false;
    let checkWall = completeWallMaps.some((elem) => {
      if (
        ghost1Direction === 1 &&
        elem.x === ghost1.x &&
        elem.y === ghost1.y - 1 &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost1Direction === 2 &&
        elem.x === ghost1.x + 1 &&
        elem.y === ghost1.y &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost1Direction === 3 &&
        elem.x === ghost1.x &&
        elem.y === ghost1.y + 1 &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost1Direction === 4 &&
        elem.x === ghost1.x - 1 &&
        elem.y === ghost1.y &&
        elem.w
      ) {
        isWall = true;
      }
    });

    if (!isWall) {
      if (ghost1Direction === 1) {
        ghost1 = { x: ghost1.x, y: ghost1.y - 1 };
      }
      if (ghost1Direction === 2) {
        ghost1 = { x: ghost1.x + 1, y: ghost1.y };
      }
      if (ghost1Direction === 3) {
        ghost1 = { x: ghost1.x, y: ghost1.y + 1 };
      }
      if (ghost1Direction === 4) {
        ghost1 = { x: ghost1.x - 1, y: ghost1.y };
      }
      const allGhostContainer = Array.from(
        document.getElementsByClassName("ghost1")
      );

      allGhostContainer.forEach((element) => {
        element.remove();
      });

      ghostElement = document.createElement("div");
      ghostElement.style.gridColumnStart = ghost1.x;
      ghostElement.style.gridRowStart = ghost1.y;
      ghostElement.classList.add("ghost1");
      map.append(ghostElement);
    } else {
      ghost1Direction = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    }
  } else {
    const allGhostContainer = Array.from(
      document.getElementsByClassName("ghost1")
    );

    allGhostContainer.forEach((element) => {
      element.remove();
    });

    ghostElement = document.createElement("div");
    ghostElement.style.gridColumnStart = pac_man.x;
    ghostElement.style.gridRowStart = pac_man.y;
    ghostElement.classList.add("ghost1");
    map.append(ghostElement);
    alert("Game over");
    location.reload();
  }
}

function moveGhost2Random() {
  if (!checkIfPacEaten()) {
    let isWall = false;
    let checkWall = completeWallMaps.some((elem) => {
      if (
        ghost2Direction === 1 &&
        elem.x === ghost2.x &&
        elem.y === ghost2.y - 1 &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost2Direction === 2 &&
        elem.x === ghost2.x + 1 &&
        elem.y === ghost2.y &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost2Direction === 3 &&
        elem.x === ghost2.x &&
        elem.y === ghost2.y + 1 &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost2Direction === 4 &&
        elem.x === ghost2.x - 1 &&
        elem.y === ghost2.y &&
        elem.w
      ) {
        isWall = true;
      }
    });

    if (!isWall) {
      if (ghost2Direction === 1) {
        ghost2 = { x: ghost2.x, y: ghost2.y - 1 };
      }
      if (ghost2Direction === 2) {
        ghost2 = { x: ghost2.x + 1, y: ghost2.y };
      }
      if (ghost2Direction === 3) {
        ghost2 = { x: ghost2.x, y: ghost2.y + 1 };
      }
      if (ghost2Direction === 4) {
        ghost2 = { x: ghost2.x - 1, y: ghost2.y };
      }
      const allGhostContainer = Array.from(
        document.getElementsByClassName("ghost2")
      );

      allGhostContainer.forEach((element) => {
        element.remove();
      });

      ghostElement = document.createElement("div");
      ghostElement.style.gridColumnStart = ghost2.x;
      ghostElement.style.gridRowStart = ghost2.y;
      ghostElement.classList.add("ghost2");
      map.append(ghostElement);
    } else {
      ghost2Direction = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    }
  } else {
    const allGhostContainer = Array.from(
      document.getElementsByClassName("ghost1")
    );

    allGhostContainer.forEach((element) => {
      element.remove();
    });

    ghostElement = document.createElement("div");
    ghostElement.style.gridColumnStart = pac_man.x;
    ghostElement.style.gridRowStart = pac_man.y;
    ghostElement.classList.add("ghost2");
    map.append(ghostElement);

    alert("Game over");
    location.reload();
  }
}

function moveGhost3Random() {
  if (!checkIfPacEaten()) {
    let isWall = false;
    let checkWall = completeWallMaps.some((elem) => {
      if (
        ghost3Direction === 1 &&
        elem.x === ghost3.x &&
        elem.y === ghost3.y - 1 &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost3Direction === 2 &&
        elem.x === ghost3.x + 1 &&
        elem.y === ghost3.y &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost3Direction === 3 &&
        elem.x === ghost3.x &&
        elem.y === ghost3.y + 1 &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost3Direction === 4 &&
        elem.x === ghost3.x - 1 &&
        elem.y === ghost3.y &&
        elem.w
      ) {
        isWall = true;
      }
    });

    if (!isWall) {
      if (ghost3Direction === 1) {
        ghost3 = { x: ghost3.x, y: ghost3.y - 1 };
      }
      if (ghost3Direction === 2) {
        ghost3 = { x: ghost3.x + 1, y: ghost3.y };
      }
      if (ghost3Direction === 3) {
        ghost3 = { x: ghost3.x, y: ghost3.y + 1 };
      }
      if (ghost3Direction === 4) {
        ghost3 = { x: ghost3.x - 1, y: ghost3.y };
      }
      const allGhostContainer = Array.from(
        document.getElementsByClassName("ghost3")
      );

      allGhostContainer.forEach((element) => {
        element.remove();
      });

      ghostElement = document.createElement("div");
      ghostElement.style.gridColumnStart = ghost3.x;
      ghostElement.style.gridRowStart = ghost3.y;
      ghostElement.classList.add("ghost3");
      map.append(ghostElement);
    } else {
      ghost3Direction = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    }
  } else {
    const allGhostContainer = Array.from(
      document.getElementsByClassName("ghost1")
    );

    allGhostContainer.forEach((element) => {
      element.remove();
    });

    ghostElement = document.createElement("div");
    ghostElement.style.gridColumnStart = pac_man.x;
    ghostElement.style.gridRowStart = pac_man.y;
    ghostElement.classList.add("ghost3");
    map.append(ghostElement);

    alert("Game over");
    location.reload();
  }
}

function moveGhost4Random() {
  if (!checkIfPacEaten()) {
    let isWall = false;
    let checkWall = completeWallMaps.some((elem) => {
      if (
        ghost4Direction === 1 &&
        elem.x === ghost4.x &&
        elem.y === ghost4.y - 1 &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost4Direction === 2 &&
        elem.x === ghost4.x + 1 &&
        elem.y === ghost4.y &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost4Direction === 3 &&
        elem.x === ghost4.x &&
        elem.y === ghost4.y + 1 &&
        elem.w
      ) {
        isWall = true;
      }

      if (
        ghost4Direction === 4 &&
        elem.x === ghost4.x - 1 &&
        elem.y === ghost4.y &&
        elem.w
      ) {
        isWall = true;
      }
    });

    if (!isWall) {
      if (ghost4Direction === 1) {
        ghost4 = { x: ghost4.x, y: ghost4.y - 1 };
      }
      if (ghost4Direction === 2) {
        ghost4 = { x: ghost4.x + 1, y: ghost4.y };
      }
      if (ghost4Direction === 3) {
        ghost4 = { x: ghost4.x, y: ghost4.y + 1 };
      }
      if (ghost4Direction === 4) {
        ghost4 = { x: ghost4.x - 1, y: ghost4.y };
      }
      const allGhostContainer = Array.from(
        document.getElementsByClassName("ghost4")
      );
      allGhostContainer.forEach((element) => {
        element.remove();
      });

      ghostElement = document.createElement("div");
      ghostElement.style.gridColumnStart = ghost4.x;
      ghostElement.style.gridRowStart = ghost4.y;
      ghostElement.classList.add("ghost4");
      map.append(ghostElement);
    } else {
      ghost4Direction = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    }
  } else {
    const allGhostContainer = Array.from(
      document.getElementsByClassName("ghost1")
    );

    allGhostContainer.forEach((element) => {
      element.remove();
    });

    ghostElement = document.createElement("div");
    ghostElement.style.gridColumnStart = pac_man.x;
    ghostElement.style.gridRowStart = pac_man.y;
    ghostElement.classList.add("ghost4");
    map.append(ghostElement);

    alert("Game over");
    location.reload();
  }
}
// 7 ------------------------------------------------------------------------------------------------------
