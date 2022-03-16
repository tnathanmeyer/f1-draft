import { h } from 'preact';
import useStandings from '../../hooks/useStandings';
import Column from '../column';
import style from './style';

const Standings = () => {
	const { loading, players, drivers, points } = useStandings('2022');

	if (!loading) {
		return (
			<div className={style.standings}>
				{players.map(player => 
					<Column
						playerName={player}
						drivers={drivers[player]}
						points={points[player]}
					/>
				)}
			</div>
		)
	} else {
		return <p>Loading...</p>
	}
}

export default Standings;
