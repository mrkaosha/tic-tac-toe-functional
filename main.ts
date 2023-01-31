function getNextCursorLocLeft () {
    if (cursorCol > 0 && grid[cursorRow][cursorCol - 1] == "") {
        cursorCol += -1
    } else {
        col4 = cursorCol - 1
        while (col4 >= 0) {
            for (let row = 0; row <= 2; row++) {
                if (grid[row][col4] == "") {
                    cursorRow = row
                    cursorCol = col4
                    drawCursor(cursorRow, cursorCol, newXOsprite)
                    return 0
                }
            }
            col4 += -1
        }
    }
    drawCursor(cursorRow, cursorCol, newXOsprite)
    return 0
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    getNextCursorLocUp()
})
function drawCursor (row: number, col: number, XOsprite: Sprite) {
    XOsprite.left = col * 34 + 38
    XOsprite.top = row * 34 + 18
}
function resetGame () {
    game.splash("Press A for new game")
    game.reset()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    newXOsprite.setFlag(SpriteFlag.Invisible, false)
    insertPlayerMove(cursorRow, cursorCol, XorOturn)
    if (isWinner(XorOturn)) {
        game.splash(XorOturn, " WINS!")
        resetGame()
    }
    changePlayer()
    XOsprites.push(newXOsprite)
    newXOsprite = textsprite.create(XorOturn)
    newXOsprite.setMaxFontHeight(24)
    newXOsprite.setOutline(1, 13)
    drawCursor(cursorRow, cursorCol, newXOsprite)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    getNextCursorLocLeft()
})
function getNextCursorLocUp () {
    if (cursorRow > 0 && grid[cursorRow - 1][cursorCol] == "") {
        cursorRow += -1
    } else {
        row4 = cursorRow - 1
        while (row4 >= 0) {
            for (let col = 0; col <= 2; col++) {
                if (grid[row4][col] == "") {
                    cursorRow = row4
                    cursorCol = col
                    drawCursor(cursorRow, cursorCol, newXOsprite)
                    return 0
                }
            }
            row4 += -1
        }
    }
    drawCursor(cursorRow, cursorCol, newXOsprite)
    return 0
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    getNextCursorLocRight()
})
function drawGrid () {
    tiles.setCurrentTilemap(tilemap`level`)
}
function cursorBlink () {
    if (cursorOnOrOff == 1) {
        newXOsprite.setFlag(SpriteFlag.Invisible, true)
        cursorOnOrOff = 0
    } else {
        newXOsprite.setFlag(SpriteFlag.Invisible, false)
        cursorOnOrOff = 1
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    getNextCursorLocDown()
})
function insertPlayerMove (row: number, col: number, player2: string) {
    grid[row][col] = player2
    for (let value of grid) {
        console.log(value)
    }
}
function changePlayer () {
    if (XorOturn == "X") {
        XorOturn = "O"
    } else {
        XorOturn = "X"
    }
    for (let row2 = 0; row2 <= 2; row2++) {
        for (let col2 = 0; col2 <= 2; col2++) {
            if (grid[row2][col2] == "") {
                cursorRow = row2
                cursorCol = col2
                return 0
            }
        }
    }
    return -1
}
function getNextCursorLocRight () {
    if (cursorCol < 2 && grid[cursorRow][cursorCol + 1] == "") {
        cursorCol += 1
    } else {
        col4 = cursorCol + 1
        while (col4 <= 2) {
            for (let row3 = 0; row3 <= 2; row3++) {
                if (grid[row3][col4] == "") {
                    cursorRow = row3
                    cursorCol = col4
                    drawCursor(cursorRow, cursorCol, newXOsprite)
                    return 0
                }
            }
            col4 += 1
        }
    }
    drawCursor(cursorRow, cursorCol, newXOsprite)
    return 0
}
function isWinner (player2: string) {
    for (let index = 0; index <= 2; index++) {
        winningRow = grid[index]
        if (winningRow[0] == player2) {
            if (winningRow[0] == winningRow[1] && winningRow[1] == winningRow[2]) {
                return true
            }
        }
    }
    for (let index2 = 0; index2 <= 2; index2++) {
        winningCol = [grid[0][index2], grid[1][index2], grid[2][index2]]
        if (winningCol[0] == player2) {
            if (winningCol[0] == winningCol[1] && winningCol[1] == winningCol[2]) {
                return true
            }
        }
    }
    winningDiagonal = [grid[0][0], grid[1][1], grid[2][2]]
    if (winningDiagonal[0] == player2) {
        if (winningDiagonal[0] == winningDiagonal[1] && winningDiagonal[1] == winningDiagonal[2]) {
            return true
        }
    }
    winningDiagonal = [grid[0][2], grid[1][1], grid[2][0]]
    if (winningDiagonal[0] == player2) {
        if (winningDiagonal[0] == winningDiagonal[1] && winningDiagonal[1] == winningDiagonal[2]) {
            return true
        }
    }
    return false
}
function getNextCursorLocDown () {
    if (cursorRow < 2 && grid[cursorRow + 1][cursorCol] == "") {
        cursorRow += 1
    } else {
        row4 = cursorRow + 1
        while (row4 <= 2) {
            for (let col3 = 0; col3 <= 2; col3++) {
                if (grid[row4][col3] == "") {
                    cursorRow = row4
                    cursorCol = col3
                    drawCursor(cursorRow, cursorCol, newXOsprite)
                    return 0
                }
            }
            row4 += 1
        }
    }
    drawCursor(cursorRow, cursorCol, newXOsprite)
    return 0
}
let winningDiagonal: string[] = []
let winningCol: string[] = []
let winningRow: string[] = []
let row4 = 0
let col4 = 0
let newXOsprite: TextSprite = null
let cursorOnOrOff = 0
let cursorCol = 0
let cursorRow = 0
let XorOturn = ""
let XOsprites: TextSprite[] = []
let grid: string[][] = []
grid = [["", "", ""], ["", "", ""], ["", "", ""]]
console.log(grid)
XOsprites = [textsprite.create("")]
XOsprites.pop()
drawGrid()
XorOturn = "X"
cursorRow = 0
cursorCol = 0
cursorOnOrOff = 1
newXOsprite = textsprite.create(XorOturn)
newXOsprite.setMaxFontHeight(24)
newXOsprite.setOutline(1, 13)
drawCursor(cursorRow, cursorCol, newXOsprite)
game.onUpdateInterval(200, function () {
    cursorBlink()
})
