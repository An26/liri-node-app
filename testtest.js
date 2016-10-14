var inquirer = require('inquirer');
var fs = require('fs');

//userface to request a specific choice/catagory
function beginLiri() {
	inquirer.prompt(
	{
		type: "list",
		message: "Hello, please choose from the following choices for me to run",
		choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
		name: 'mainMenu'
		
	}).then(function compareChoice(command){
		//console.log("user choice is: " + choice.mainMenu);
		//var command = choice.mainMenu;
		//returns [object, object] --- how to look into this? 10/9/2016
		console.log(command.mainMenu);

		if(command.mainMenu === 'my-tweets'){
			console.log('showTweets');
		} else if (command.mainMenu === 'spotify-this-song'){
			console.log('spotifyInfo()');
		} else if (command.mainMenu === 'movie-this'){
			console.log('movieInfo()');
		} else if (command.mainMenu === 'do-what-it-says'){
			console.log('doThis()');
		} else {
			return console.log('no choices');
		}

		console.log("log: " + command.mainMenu);
		var logger = "\n" + command.mainMenu;
		logCommands(logger);
	});

}

beginLiri();



function logCommands(logger) {
	console.log('logger active');
	console.log('command: ' + logger);

	fs.appendFile('log.txt', logger, 'utf8', function(error) {
		console.log('fs active');
		if(error){
			return console.log("nopeeee, sorry");
		}
		console.log('that stuff was added, hurray!!');
		})
}