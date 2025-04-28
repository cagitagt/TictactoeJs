const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const xPlayer = document.querySelector('#xPlayer')
const oPlayer = document.querySelector('#oPlayer')
const restartButton = document.querySelector('#restartButton')

let player = 'X'
let isPauseGame = false
let isGameStart = false

const inputCells = 
    [
        '', '', '',
        '', '', '',
        '', '', ''
    ]

const winConditions = 
    [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //row
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //column
        [0, 4, 8], [2, 4, 6] //diagonals
    ]

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index) {
    if(cell.textContent == '' &&
        !isPauseGame
    ) {
        isGameStart = true
        updateCell(cell, index)

        if(!checkWinner()){
            changePlayer()
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = player
    inputCells[index] = player
    console.log(inputCells)
    cell.style.color = (player == 'X') ? '#5b18ea' : '#a81212'
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X'
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        if (inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player
        ) {
            declareWinner([a, b, c])
            return true
        }
    }

    if (inputCells.every(cell => cell != '')){
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} Win!`
    isPauseGame = true

    winningIndices.forEach((index) =>
        cells[index].style.background = '#2A2343'
    )

    restartButton.style.visibility = 'visible'
}

function declareDraw() {
    titleHeader.textContent = 'Draw!'
    isPauseGame = true
    restartButton.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer) {
    if (!isGameStart) {
        player = selectedPlayer
        if (player == 'X'){
            xPlayer.classList.add('player-active')
            oPlayer.classList.remove('player-active')
        } else {
            xPlayer.classList.remove('player-active')
            oPlayer.classList.add('player-active')
        }
    }
}

restartButton.addEventListener('click', () => {
    restartButton.style.visibility = 'hidden'
    inputCells.fill('')
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })
    isPauseGame = false
    isGameStart = false
    titleHeader.textContent = 'Play!'
})