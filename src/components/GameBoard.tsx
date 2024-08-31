import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { startGame, setPlayerMove, randomlySetComputerMove, finalizeGameResults, getGameResults, getComputerMove, getPlayerScore } from '../api/gameService';
import logo from '../assets/logo.svg';
import rock from '../assets/rock.svg';
import paper from '../assets/paper.svg';
import scissors from '../assets/scissors.svg';


const GameBoard: React.FC = () => {
    const { account, disconnect, signAndSubmitTransaction } = useWallet();
    const [playerMove, setPlayerMv] = useState<number | null>(null);
    const [computerMove, setComputerMove] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [gameResult, setGameResult] = useState<string>('');
    const [showResults, setShowResults] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const handleStartGame = async () => {
        if (account) {
            try {
                await startGame(account.address, signAndSubmitTransaction);
                const playerScore = await getPlayerScore(account.address);
                setScore(playerScore);
                setGameStarted(true);
                setPlayerMv(null);
                setGameResult('');
            } catch (error) {
                console.error('Failed to start the game: ', error);
            }
        }
    };

    const handlePlayerMove = async (move: number) => {
        if (account) {
            try {
                setPlayerMv(move);
                await setPlayerMove(account.address, move, signAndSubmitTransaction);
                await randomlySetComputerMove(account.address, signAndSubmitTransaction);
                await finalizeGameResults(account.address, signAndSubmitTransaction);

                const result = await getGameResults(account.address);
                const computerMove = await getComputerMove(account.address);
                const playerScore = await getPlayerScore(account.address);
                setScore(playerScore);
                setComputerMove(computerMove);

                if (result === 2) {
                    setGameResult('Player wins!');
                } else if (result === 3) {
                    setGameResult('Computer wins!');
                } else if (result === 1) {
                    setGameResult('Draw!');
                } else {
                    setGameResult('Unexpected result!');
                }
                setShowResults(true);
            } catch (error) {
                console.error('Failed to process player move:', error);
            }
        }
    };

    const handlePlayAgain = () => {
        setShowResults(false);
        setPlayerMv(null);
        setGameResult('');
    };

    const renderChoice = (choice: number | null) => {
        switch (choice) {
            case 1: return <div className="choice rock"><img src={rock} alt="Rock" /></div>;
            case 2: return <div className="choice paper"><img src={paper} alt="Paper" /></div>;
            case 3: return <div className="choice scissors"><img src={scissors} alt="Scissors" /></div>;
            default: return null;
        }
    };

    const getChoiceText = (choice: number | null): string => {
        switch (choice) {
            case 1: return "Rock";
            case 2: return "Paper";
            case 3: return "Scissors";
            default: return "";
        }
    };

    return (
        <div className="container">
            {!gameStarted ? (
                <button className="st-btn" onClick={handleStartGame}>Start Game</button>
            ) : (
                <>
                    <div className="gameboard-container">
                        <header className="header">
                            <img src={logo} className="logo" />
                            <div className='score'>
                                <div className='score__title'>Score</div>
                                <div className='score__number'>{score}</div>
                            </div>
                        </header>

                        {account && <button className="dc-btn" onClick={disconnect}>Disconnect</button>}

                    {!showResults ? (
                        <section className="game">
                            <button className="choice-btn" data-choice="paper" onClick={() => handlePlayerMove(2)}>
                                <div className="choice paper">
                                    <img src={paper} alt="Paper" />
                                </div>
                            </button>
                            <button className="choice-btn" data-choice="scissors" onClick={() => handlePlayerMove(3)}>
                                <div className="choice scissors">
                                    <img src={scissors} alt="Scissors" />
                                </div>
                            </button>
                            <button className="choice-btn" data-choice="rock" onClick={() => handlePlayerMove(1)}>
                                <div className="choice rock">
                                    <img src={rock} alt="Rock" />
                                </div>
                            </button>
                        </section>
                    ) : (
                        <section className="results">
                            <h2 className="results__heading">you picked {getChoiceText(playerMove)}</h2>
                            <h2 className="results__heading">HOUSE picked {getChoiceText(computerMove)}</h2>
                            <div className="results__result">{renderChoice(playerMove)}</div>
                            <div className="results__winner"> 
                                <h3 className="results__text">{gameResult}</h3>
                                <button className="play-again" onClick={handlePlayAgain}>play again</button>
                            </div>
                            <div className="results__result">{renderChoice(computerMove)}</div>
                        </section>
                    )}
                        <footer className="footer"> 
                            <div className="attribution">
                                Made by
                                <a href="https://www.linkedin.com/in/vincent-benedict/" > Cent</a>
                                . Code Reference <a href="https://youtube.com/codestackr">codeSTACKr</a>.
                            </div>
                        </footer>
                    </div>
                </>
            )}
        </div>
    );
};

export default GameBoard;