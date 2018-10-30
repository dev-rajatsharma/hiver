/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 4;
let turn = 'X';
let userWinAlert = 'User Wins !'
let computerWinAlert = 'Computer Wins !'

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let oldValue = grid[colIdx][rowIdx]
    if(oldValue===0){
        let newValue = 1;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
        checkSuccess('user', oldValue)
    }
}
function computerTurn() {
    let a = Math.floor(Math.random() * (GRID_LENGTH))
    let b = Math.floor(Math.random() * (GRID_LENGTH))
    let gridValue = grid[a][b]
    if (gridValue === 0) {
        let newValue = 2
        grid[a][b] = newValue
        renderMainGrid()
        addClickHandlers()
        checkSuccess('computer')
    } else {
        computerTurn()
    }
}
function checkSuccess(sender, oldValue) {
    let winner = 0
    grid.map((row) => {
        if (row.every(item => item === 1)) {
            winner = 1
        }
        if (row.every(item => item === 2)) {
            winner = 2
        }
    })
    for (let i = 0; i < GRID_LENGTH; i++) {
        if ((grid[0][i] === grid[1][i]) && (grid[1][i] === grid[2][i]) && (grid[2][i] === grid[3][i])) {
            if (grid[2][i] === 1) {
                winner = 1
            }
            if (grid[2][i] === 2) {
                winner = 2
            }
        }
    }
    if ((grid[0][0] === grid[1][1]) && (grid[1][1] === grid[2][2]) && (grid[2][2] === grid[3][3])) {
        if (grid[2][2] === 1) {
            winner = 1
        }
        if (grid[2][2] === 2) {
            winner = 2
        }
    }
    if ((grid[0][3] === grid[1][2]) && (grid[1][2] === grid[2][1]) && (grid[2][1] === grid[3][0])) {
        if (grid[3][0] === 1) {
            winner = 1
        }
        if (grid[3][0] === 2) {
            winner = 2
        }
    }
    if (winner === 1) {
        alert(userWinAlert)
        if (confirm('Would you like to play again ?')) {
            reset()
        }
    } else if (winner === 2) {
        alert(computerWinAlert)
        if (confirm('Would you like to play again ?')) {
            reset()
        }
    } else if (sender === 'user' && oldValue === 0) {
        computerTurn()
    }
}
function reset() {
    grid.map((row, rowIndex) => {
        row.map((column, columnIndex) => {
            grid[rowIndex][columnIndex] = 0
        })
    })
    renderMainGrid()
    addClickHandlers()
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
