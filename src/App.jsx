import React, { useEffect, useState } from 'react'
import './App.css'
import { gameSubject, initGame, resetGame, lastMove, randomMove, playRandomGame, playComputer } from './Game'
import Board from './Board'

function App() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()

  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
    }
    )
    return () => subscribe.unsubscribe()
  }, [])
  return (
    <div className="container">
      <button className="game-text" onClick={resetGame}>
        Reset game
      </button>
      <button className="game-text" onClick={randomMove}>
        Random Move
      </button>
      <button className="game-text" onClick={playRandomGame}>
        Play Randomized Game
      </button>
      <button className="game-text" onClick={playComputer}>
        Play Computer
      </button>
      <h5>
        {lastMove && (
          <p className="game-text">Last move: {lastMove.color}{lastMove.piece} to {lastMove.to}</p>
        )}
      </h5>
      {isGameOver && (
        <h2 className="game-text">Game Over
          {result &&
            <p className="game-text">{result}</p>}
          <button onClick={resetGame}>
            <span className="game-text">Play again?.</span>
          </button>
        </h2>

      )}
      <div className="board-container">
        <Board board={board} />
      </div>

    </div>
  )
}

export default App
