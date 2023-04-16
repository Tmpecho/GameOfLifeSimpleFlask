const GRID_HEIGHT = 80;
const GRID_WIDTH = 80;
const EMPTYCELL = 0;
const FULLCELL = 1;
const UPDATE_SPEED_MS = 50;

let grid = createEmptyGrid();
let intervalId;
let generation = 0;
let isRunning = false;

function createEmptyGrid() {
    let grid = [];
    for (let row = 0; row < GRID_HEIGHT; row++) {
        grid[row] = [];
        for (let col = 0; col < GRID_WIDTH; col++) {
            grid[row][col] = EMPTYCELL;
        }
    }
    return grid;
}

function createRandomGrid() {
    let grid = [];
    for (let row = 0; row < GRID_HEIGHT; row++) {
        grid[row] = [];
        for (let col = 0; col < GRID_WIDTH; col++) {
            grid[row][col] = Math.random() < 0.2 ? FULLCELL : EMPTYCELL;
        }
    }
    return grid;
}

async function updateGrid() {
    try {
        const response = await fetch("/update_grid", {
            method: "POST",
            body: JSON.stringify(grid),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (e) {
        console.error(`Error in updateGrid(): ${e}`);
        return grid;
    }
}

let isDrawing = false;

function handleMouseDown(event) {
    isDrawing = true;
    updateCell(event.target);
}

function handleMouseMove(event) {
    if (isDrawing) {
        updateCell(event.target);
    }
}

function handleMouseUp(event) {
    isDrawing = false;
}

function updateCell(cellDiv) {
    const row = parseInt(cellDiv.parentNode.dataset.row);
    const col = parseInt(cellDiv.dataset.col);
    grid[row][col] = 1 - grid[row][col]; // toggle cell state
    renderGrid();
}
function renderGrid() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";

    for (let row = 0; row < GRID_HEIGHT; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        rowDiv.dataset.row = row;

        for (let col = 0; col < GRID_WIDTH; col++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.dataset.col = col;

            if (grid[row][col] === FULLCELL) {
                cellDiv.classList.add("full");
            }

            rowDiv.appendChild(cellDiv);
        }

        gridContainer.appendChild(rowDiv);
    }

    gridContainer.addEventListener("mousedown", handleMouseDown);
    gridContainer.addEventListener("mousemove", handleMouseMove);
    gridContainer.addEventListener("mouseup", handleMouseUp);

    document.getElementById("gen-num").textContent = generation;
}

async function tick() {
    try {
        grid = await updateGrid();
        generation += 1;
        renderGrid();
    } catch (e) {
        console.error(`Error in tick(): ${e}`);
    }
}

function startGame() {
    if (!isRunning) {
        intervalId = setInterval(tick, UPDATE_SPEED_MS);
        isRunning = true;
    }
}

function stopGame() {
    clearInterval(intervalId);
    isRunning = false;
}

function fillRandomGrid() {
    grid = createRandomGrid();
    renderGrid();
}

function clearGrid() {
    grid = createEmptyGrid();
    generation = 0;
    renderGrid();
}

// Initialize the grid and start the game
renderGrid();

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("stop-btn").addEventListener("click", stopGame);
document.getElementById("fill-btn").addEventListener("click", fillRandomGrid);
document.getElementById("clear-btn").addEventListener("click", clearGrid);
document.getElementById("gen-num").textContent = generation;
document.getElementById("step-btn").addEventListener("click", tick);
document.getElementById("about-btn").addEventListener("click", () => {
    const aboutPanel = document.getElementById("about-panel");
    aboutPanel.classList.toggle("hidden");
  });
  