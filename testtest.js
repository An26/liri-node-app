var inquirer = require('inquirer');

var choiceOne = inquirer.prompt(
	{
		type: "list",
		message: "Hello, please choose from the following choices for me to run",
		choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
		name: 'mainMenu'	
	});
console.log(choiceOne.ui.prompts.list.super_)
console.log(choiceOne.inquirer);


function beginLiri() {
	choiceOne.then(function compareChoice(choice){
		//console.log("user choice is: " + choice.mainMenu);
		var command = choice.mainMenu;
		//returns [object, object] --- how to look into this? 10/9/2016

		if(command === 'my-tweets'){
			showTweets();
		} else if (command === 'spotify-this-song'){
			spotifyInfo();
		} else if (command === 'movie-this'){
			movieInfo();
		} else if (command === 'do-what-it-says'){
			doThis();
		} else {
			return console.log('no choices');
		}
	});

	//console.log("choice!: " + choiceOne);
}

beginLiri();
