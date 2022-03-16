import { h } from 'preact';
import style from './style';

const Driver = props => {
	const { name, team } = props;

	return (
		<div className={style.driver}>
			<div><b>Name:</b> {name}</div>
			<div><b>Team:</b> {team}</div>
		</div>
	)
}

export default Driver;
