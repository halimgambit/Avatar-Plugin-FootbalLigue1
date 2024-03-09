exports.action = function(data, callback){

	let tblCommand = {
		
		classementFoot : function() {
			classementCalendrierResultats("classement", data, client);
		},				
		resultatFoot : function() {
			classementCalendrierResultats('calendrier-resultats', data, client);
		}	
	};

	let client = setClient(data);
	info("FootbalLigue1:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	callback();
}

	
async function classementCalendrierResultats(foot, data, client) {
	try {
		const response = await fetch(`https://www.ligue1.fr/${foot}`);

		if (!response.ok) {
			throw new Error(`Code erreur : ${response.statusText}`);
		}

		const body = await response.text();
		const cheerio = require("cheerio");
		const $ = cheerio.load(body);

		if (foot === "classement") {
			const players = [];
			for (let i = 0; i <= 5; i++) {
			const player = {
			name : $('span.GeneralStats-clubName.desktop-item').eq(i).text(),
			points : $('div.GeneralStats-item.GeneralStats-item--points').eq(i).text()
			}
		players.push(player);
		}
		const message = players.map((player, index) => {
		return `${player.name} ${index === 0 ? 'En premier' : `à la ${index + 1}ème place`} avec ${player.points} points`;
		  }).join(', ');
        Avatar.speak(message, data.client, () => Avatar.Speech.end(data.client));
		return;
        }

if (foot === "calendrier-resultats") {
	// Implement logic for calendrier-resultats
  }
}
catch (error) {
info(error);
Avatar.speak(`Désolé, j'ai rencontré un problème en récupérant les informations sur le site. ${error.message}`, data.client, () => Avatar.Speech.end(data.client));
}
}
	

function setClient (data) {
	let client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}