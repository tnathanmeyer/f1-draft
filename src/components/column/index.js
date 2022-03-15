import { h } from 'preact';

const Column = props => {
	const { playerName, points, drivers } = props;
	
	return (
		<>
			<h3>{playerName}</h3>
			<h4>Total Points: {points}</h4>
			{drivers.map(driver =>
				<p>{driver.name} ({driver.team})</p>
			)}
		</>
	)
}

export default Column;