import { h } from 'preact';
import Driver from '../driver';
import style from './style';

const DriverList = props => {
	const { drivers } = props;

	return (
		<div className={style.driverList}>
			{drivers.map(driver =>
				<Driver
					name={driver.name}
					team={driver.team}
				/>
			).sort((a, b) => a.points - b.points)}
		</div>
	);
}

export default DriverList;
