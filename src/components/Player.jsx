import { useState } from 'react';

export const Player = ({ name, symbol, isActive, onChangeName }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(name);

	const handleEditClick = () => {
		setIsEditing(prev => !prev);
		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	};

	const handleChange = event => {
		setPlayerName(event.target.value);
	};

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className="player">
				{isEditing ? (
					<input type="text" value={playerName} onChange={handleChange} />
				) : (
					<span className="player-name">{playerName}</span>
				)}

				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{!isEditing ? 'Edit' : 'Save'}</button>
		</li>
	);
};
