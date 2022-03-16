import { h } from 'preact';
import DriverList from '../driverList';
import style from './style';

const Column = props => {
	const { playerName, points, drivers } = props;
	
	return (
		<div className={style.column}>
			<h3>{playerName}</h3>
			<h4>Total Points: {points}</h4>
			<DriverList drivers={drivers} />
		</div>
	)
}

export default Column;
