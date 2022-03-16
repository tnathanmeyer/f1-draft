import { useState, useEffect } from 'preact/hooks';

const useStandings = year => {
	const [loading, setLoading] = useState(true);
	const [players, setPlayers] = useState(null)
	const [drivers, setDrivers] = useState(null);
	const [points, setPoints] = useState(null);

	useEffect(() => {
		const getData = async () => {
			const draftsPromise = import('../data/drafts');
			const apiPromise = fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`);

			const [draftsModule, response] = await Promise.all([draftsPromise, apiPromise]);
			const data = await response.json();
			const drafts = draftsModule.default;
			const players = Object.keys(drafts);

			const driverData = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
			const formattedData = driverData.map(driver => {
				const driverInfo = driver.Driver;
				let team = 'N/A';
				if (driver.Constructors.length) {
					const currentTeam = driver.Constructors.pop();
					team = currentTeam.name;
				}

				return {
					id: driverInfo.driverId,
					name: `${driverInfo.givenName} ${driverInfo.familyName}`,
					position: driver.position,
					points: parseInt(driver.points),
					team
				};
			});

			const driversByPlayer = {};
			const pointsByPlayer = {};
			const initialPoints = 0;
			players.forEach(player => {
				driversByPlayer[player] = formattedData.filter(
					driver => drafts[player].includes(driver.id)
				);

				pointsByPlayer[player] = driversByPlayer[player].reduce(
					(prev, current) => prev + current.points,
					initialPoints
				);
			});

			setPlayers(players);
			setDrivers(driversByPlayer);
			setPoints(pointsByPlayer);
			setLoading(false);
		}

		getData();
	}, []);

	return {
		loading,
		players,
		drivers,
		points
	};
}

export default useStandings;
