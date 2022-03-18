const EleventyFetch = require('@11ty/eleventy-fetch');
const drafts = require('./drafts');

module.exports = async function() {
	const data = await EleventyFetch(
		'https://ergast.com/api/f1/2022/driverStandings.json',
		{
			duration: '1h',
			type: 'json'
		}
	);

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

	const initialPoints = 0;
	const standings = drafts.map(({ name, drivers }) => {
		const driversStandings = formattedData.filter(
			driver => drivers.includes(driver.id)
		).sort((a, b) => a.position > b.position);
		
		const totalPoints = driversStandings.reduce(
			(prev, current) => prev + current.points,
			initialPoints
		);

		return {
			name,
			drivers: driversStandings,
			points: totalPoints
		};
	});

	return standings;
}
