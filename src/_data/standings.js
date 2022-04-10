const EleventyFetch = require('@11ty/eleventy-fetch');
const drafts = require('./drafts');

module.exports = async function() {
	const data = await EleventyFetch(
		'https://ergast.com/api/f1/2022/driverStandings.json',
		{
			duration: '30m',
			type: 'json'
		}
	);

	const driverData = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
	const formattedData = driverData.map(driver => {
		const driverInfo = driver.Driver;
		
		let team = 'N/A';
		console.log(driver.Constructors.length);
		if (driver.Constructors.length) {
			const currentTeam = driver.Constructors.slice(-1)[0];
			team = currentTeam.name;
		}

		const { givenName, familyName } = driverInfo;
		const imgName = `${givenName}-${familyName}`
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
		const imgSrc = `https://www.formula1.com/content/fom-website/en/drivers/${imgName}/_jcr_content/image.img.640.medium.jpg/1646750994602.jpg`

		
		return {
			id: driverInfo.driverId,
			name: `${driverInfo.givenName} ${driverInfo.familyName}`,
			position: driver.position,
			points: parseInt(driver.points),
			imgSrc,
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
