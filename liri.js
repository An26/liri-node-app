var keys = require('./keys.js');
var Random = require('./random.txt');
var inquirer = require('inquirer');
var Twitter = require('twitter');
var twitter = new Twitter(keys);
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

//userface to request a specific choice/catagory
function beginLiri() {
	inquirer.prompt(
	{
		type: "list",
		message: "Hello, please choose from the following choices for me to run",
		choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
		name: 'mainMenu'
		
	}).then(function compareChoice(choice){
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

		var log = choice.mainMenu;

		// fs.appendFile('log.txt', logs, function(error) {
		// if(error){
		// 	return console.log("not logged in log.txt");
		// }
		// //console.log('that stuff was added, hurray!!');
		// });

		logCommands(log);
	});




}

beginLiri();


//function my-tweets
function showTweets() {
	var params = {screen_name: 'allFancie', count: 20};
	twitter.get(
		'statuses/user_timeline',
		params,
		function(error, tweets, response) {
	  	if (error) {
	    	console.log(error);
	  	}else{
	  		tweets.forEach(function(tweetInfo){
	  			//console.log(tweetInfo);
				var tweetOutput = "My Tweet: " + tweetInfo.text + "\n" +
					"Published On: " + tweetInfo.created_at + "\n";
				console.log(tweetOutput);
				// logText(tweetOutput);
			})
	  	}
	});
}

//function spotify-this-song
//should default to "The Sign" by Ace of Base??
function spotifyInfo(songTitle) {
	inquirer.prompt({
		name: 'songTitle',
		message: "La, la, laaaaaaa! What song do you wanna know about?"
	}).then(function(song){
		if(song.songTitle === ''){
			song.songTitle = 'The Sign';
		}
		spotify.search({ type: 'track', query: song.songTitle }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		    console.log("Artist: " + data.tracks.items[0].artists[0].name);
		    console.log("Song Name: " + data.tracks.items[0].name);
		    console.log("Song Sample: " + data.tracks.items[0].preview_url);
		});
	})
}

//function movie-this
function movieInfo() {
	inquirer.prompt(
	{
		name: 'movieName',
		message: 'Moooovvviiiee timeeee, which movie would you like to know about?'
	}
	).then(function(movie) {
		//adding default error if person spams
		if(movie.movieName === '')
		{
			//console.log('show default movie');
			movie.movieName = "Mr. Nobody";
		} 

		var queryUrl = 'http://www.omdbapi.com/?t=' + movie.movieName +'&tomatoes=true&y=&plot=short&r=json'; 
		//OMDB Request
		request(queryUrl, function(error, response, body){
			if (error && response.statusCode == 200){
				return console.log('sorry...cannot load this information');
			} else {
				console.log("Title: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMBD Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomato Rating: " + JSON.parse(body).tomatoRating + "/nCountry Origin: " + JSON.parse(body).Country + "\nOriginal Language: " + JSON.parse(body).Language + "\nActor List: " + JSON.parse(body).Actors + "\nPlot: " + JSON.parse(body).Plot + "\nRotten Tomato URL: " + JSON.parse(body).tomatoURL);
			}
		});
	});
}



//function do-what-it-says
//do-what-it-says - using fs - takes text from random.txt and run it in the liri bot
//hot to get command and input to go through the prompts i have in my current program! ahhh.... 
function doThis() {
	console.log("command: " + Random.command);
	console.log("input: " + Random.input);

	if(Random.command === 'my-tweets'){
			showTweets();
		} else if (Random.command === 'spotify-this-song'){
			console.log("shiiiit");
			song.songTitle = Random.input;

			spotifyInfo(song.songTitle);
			
		} else if (Random.command === 'movie-this'){
			movieInfo(Random.input);
		} else if (Random.command === 'do-what-it-says'){
			doThis(Random.input);
		} else {
			return console.log('no choices');
		}
}


//bonus***
//logs outputs to a log.txt file, append them! 
function logCommands(log) {

	//var log = '';

	fs.appendFile(log.txt, log, function(error) {
	if(error){
		return console.log("nopeeee, sorry");
	}
	console.log('that stuff was added, hurray!!');
})
}

