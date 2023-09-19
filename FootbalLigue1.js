exports.action = function(data, callback){

	let tblCommand = {
		
		classementFoot : function() {
			Football("classement", data, client);
		},				
		resultatFoot : function() {
			Football('resultat', data, client);
		},
		calendrierFoot : function() {
			Football('calendrier', data, client);
		}		
	};

	
	function Football (foot, data, client) {
		const cheerio = require("cheerio");
		fetch(`https://www.lequipe.fr/Football/ligue-1/page-${foot}-equipes/en-direct`)
		.then(response => {
			if (!response.ok) {
			  throw Error(response.statusText);
			}
			return response.text();
		})
		.then((body) => {
		const $ = cheerio.load(body);
		if (foot === "classement") {
			$('#outer-edito-content > div.container__content.layout.js-container-content > main > div.Points > div:nth-child(2) > div > table > tbody > tr:nth-child(1)').map((i, el) => {
				const name = $(el).find('.table__col--name').text();
				const points = $(el).find('.table__col--points').text();
			$('#outer-edito-content > div.container__content.layout.js-container-content > main > div.Points > div:nth-child(2) > div > table > tbody > tr:nth-child(2)').map((i, el) => {
				const name1 = $(el).find('.table__col--name').text();
				const points1 = $(el).find('.table__col--points').text();
			$('#outer-edito-content > div.container__content.layout.js-container-content > main > div.Points > div:nth-child(2) > div > table > tbody > tr:nth-child(3)').map((i, el) => {
				const name2 = $(el).find('.table__col--name').text();
				const points2 = $(el).find('.table__col--points').text();
			$('#outer-edito-content > div.container__content.layout.js-container-content > main > div.Points > div:nth-child(2) > div > table > tbody > tr:nth-child(4)').map((i, el) => {
				const name3 = $(el).find('.table__col--name').text();
			    const points3 = $(el).find('.table__col--points').text();
			$('#outer-edito-content > div.container__content.layout.js-container-content > main > div.Points > div:nth-child(2) > div > table > tbody > tr:nth-child(5)').map((i, el) => {
				const name4 = $(el).find('.table__col--name').text();
				const points4 = $(el).find('.table__col--points').text();
		Avatar.speak(`${name} en tête avec ${points} points, deuxième ${name1} avec ${points1} points, troisième ${name2} avec ${points2} point, quatrième ${name3} avec ${points3} point, cinquième ${name4} avec ${points4} point`, data.client, () => {
			Avatar.Speech.end(data.client);
		});
	    });
        });
		});
	    });
		});
	}


		else if (foot === "resultat") {

		}
		else if (foot === "calendrier") {

		}
		})
		.catch (function (error) {
		 Avatar.speak(`Je n'arrive pas a accédé au site ${error}`, data.client, () => {
		Avatar.Speech.end(data.client);
		})
		});
		}

	let client = setClient(data);
	info("FootbalLigue1:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	callback();
}
	

function setClient (data) {
	let client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}