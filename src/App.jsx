import { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { Player } from './components/Player';
import { Log } from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import { GameOver } from './components/GameOver';

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

const deriveActivePlayer = gameTurns => {
	let currentPlayer = 'X';
	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}
	return currentPlayer;
};

function App() {
	const [players, setPlayers] = useState({
		X: 'Player 1',
		O: 'Player 2',
	});
	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = deriveActivePlayer(gameTurns);

	let gameBoard = [...initialGameBoard.map(arr => [...arr])];
	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}

	let winner;
	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}

	const hasDraw = gameTurns.length === 9 && !winner;

	const handleSelectedSquare = (rowIdx, colIdx) => {
		setGameTurns(prev => {
			const currentPlayer = deriveActivePlayer(prev);

			const updatedTurns = [
				{ square: { row: rowIdx, col: colIdx }, player: currentPlayer },
				...prev,
			];
			return updatedTurns;
		});
	};

	const handleRestartGame = () => {
		setGameTurns([]);
		console.log(gameTurns);
	};

	const handlePlayerNameChange = (symbol, newName) => {
		setPlayers(prev => {
			return {
				...prev,
				[symbol]: newName,
			};
		});
	};

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						name="Player 1"
						symbol="X"
						isActive={activePlayer === 'X'}
						onChangeName={handlePlayerNameChange}
					/>
					<Player
						name="Player 2"
						symbol="O"
						isActive={activePlayer === 'O'}
						onChangeName={handlePlayerNameChange}
					/>
				</ol>
				{(winner || hasDraw) && <GameOver winner={winner} restartHandler={handleRestartGame} />}
				<GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
