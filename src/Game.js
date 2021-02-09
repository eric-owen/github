import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'

const chess = new Chess()

export const gameSubject = new BehaviorSubject()

export let lastMove = null


export function initGame() {
    const savedGame = localStorage.getItem('savedGame')
    if (savedGame) {
        chess.load(savedGame)
    }
    updateGame()
}

export function resetGame() {
    chess.reset()
    lastMove = null
    updateGame()
}

export function randomMove() {
    const randMoves = chess.moves()
    const randMove = randMoves[Math.floor(Math.random() * randMoves.length)]
    chess.move(randMove)
    lastMove = null
    updateGame()
}

export function playRandomGame() {
    if (!chess.game_over()) {
        const randMoves = chess.moves()
        const randMove = randMoves[Math.floor(Math.random() * randMoves.length)]
        chess.move(randMove)
        updateGame()
        setTimeout(() => playRandomGame(), 100)
    }

}

export function playComputer() {


}


export function move(from, to) {
    const legalMove = chess.move({ from, to })
    if (legalMove) {
        lastMove = legalMove
        updateGame()
        console.log(legalMove)
    }

}

function updateGame() {
    const isGameOver = chess.game_over()
    //console.log(isGameOver)
    const newGame = {
        board: chess.board(),
        isGameOver,
        result: isGameOver ? getGameResult() : null
    }

    localStorage.setItem('savedGame', chess.fen())
    gameSubject.next(newGame)
}

function getGameResult() {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? 'Black' : 'White'
        return `${winner} wins`
    }
}

