"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function Square({ value, onClick, isWinning = false }) {
  return (
    <button
      className={`
        w-20 h-20 border-2 border-gray-300 text-2xl font-bold
        hover:bg-gray-50 transition-all duration-200 rounded-lg
        ${isWinning ? "bg-green-100 border-green-400" : "bg-white"}
        ${value === "X" ? "text-blue-600" : "text-red-600"}
        focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] }
    }
  }
  return { winner: null, line: null }
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameHistory, setGameHistory] = useState({
    X: 0,
    O: 0,
    draws: 0,
  })

 const result = calculateWinner(squares);
const winner = result.winner ?? null;
const winningLine = result.line;

  const isDraw = !winner && squares.every((square) => square !== null)


  const handleClick = (i) => {
    if (squares[i] || winner) {
      return
    }

    const newSquares = squares.slice()
    newSquares[i] = isXNext ? "X" : "O"
    setSquares(newSquares)
    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    if (winner) {
      setGameHistory((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }))
    } else if (isDraw) {
      setGameHistory((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }))
    }

    setSquares(Array(9).fill(null))
    setIsXNext(true)
  }

  const resetHistory = () => {
    setGameHistory({ X: 0, O: 0, draws: 0 })
  }

  let status
  if (winner) {
    status = `🎉 Winner: Player ${winner}!`
  } else if (isDraw) {
    status = "🤝 It's a draw!"
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Maddy's Tic Tac Toe
          </CardTitle>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="outline" className="text-blue-600 text-xl">
              X: {gameHistory.X}
            </Badge>
            <Badge variant="outline" className="text-red-600 text-xl">
              O: {gameHistory.O}
            </Badge>
            <Badge variant="outline" className="text-gray-600 text-xl">
              Draws: {gameHistory.draws}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div
              className={`text-xl font-semibold p-3 rounded-lg ${
                winner
                  ? "bg-green-100 text-green-800"
                  : isDraw
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 justify-center mx-auto w-fit">
            {squares.map((square, i) => (
              <Square key={i} value={square} onClick={() => handleClick(i)} isWinning={winningLine?.includes(i)} />
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={resetGame} className="flex-1" >
              {winner || isDraw ? "New Game" : "Reset"}
            </Button>
           
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
