import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { startGame, setPlayerMove, randomlySetComputerMove, finalizeGameResults, getGameResults } from '../api/gameService';

const GameBoard: React.FC = () => {
  const { account, disconnect, signAndSubmitTransaction } = useWallet();
  const [playerMove, setPlayerMoveState] = useState<number | null>(null);
  const [gameResult, setGameResult] = useState<string>('');
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const handleStartGame = async () => {
    if (account) {
      try {
        await startGame(account.address, signAndSubmitTransaction);
        setPlayerMoveState(null);
        setGameResult('');
      } catch (error) {
        console.error('Failed to start the game:', error);
      }
    }
  };

  const handlePlayerMove = async (move: number) => {
    if (account) {
        try {
        setPlayerMoveState(move);
        await setPlayerMove(account.address, move, signAndSubmitTransaction);
        await randomlySetComputerMove(account.address, signAndSubmitTransaction);
        await finalizeGameResults(account.address, signAndSubmitTransaction);

        const result = await getGameResults(account.address);

        if (result === 2) {
            setScore((prevScore) => ({ ...prevScore, player: prevScore.player + 1 }));
            setGameResult('Player wins!');
        } else if (result === 3) {
            setScore((prevScore) => ({ ...prevScore, computer: prevScore.computer + 1 }));
            setGameResult('Computer wins!');
        } else if (result === 1) {
            setGameResult('Draw!');
        } else {
            setGameResult('Unexpected result!');
        }

        } catch (error) {
        console.error('Failed to process player move:', error);
        }
    }
  };

  return (
    <div>
      <button onClick={handleStartGame}>Start Game</button>
      <div>
        <button onClick={() => handlePlayerMove(1)}>Rock</button>
        <button onClick={() => handlePlayerMove(2)}>Paper</button>
        <button onClick={() => handlePlayerMove(3)}>Scissors</button>
      </div>
      <p>Game Result: {gameResult}</p>
      <p>Player Wins: {score.player}</p>
      <p>Computer Wins: {score.computer}</p>
      <button onClick={handleStartGame}>Restart Game</button>
      {account && <button onClick={disconnect}>Disconnect</button>}
    </div>
  );
};

export default GameBoard;
