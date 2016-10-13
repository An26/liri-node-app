var keys = require('./keys.js');
var Random = require('./random.txt');
var inquirer = require('inquirer');
var Twitter = require('twitter');
var twitter = new Twitter(keys);
var spotify = require('spotify');
var request = require('request');

//userface to request a specific choice/catagory
function beginLiri() {
	inquirer.prompt(
	{
		type: "list",
		message: "Hello, please choose from the following choices for me to run",
		choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
		name: 'mainMenu'
		
	}).then(function compareChoice(choice){
		console.log("user choice is: " + choice.mainMenu);
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

		logOutputs();
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
function spotifyInfo() {
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
			console.log('show default movie');
			movie.movieName = "Mr. Nobody";
		} 

		var queryUrl = 'http://www.omdbapi.com/?t=' + movie.movieName +'&tomatoes=true&y=&plot=short&r=json'; 
		//OMDB Request
		request(queryUrl, function(error, response, body){
			if (error && response.statusCode == 200){
				return console.log('sorry...cannot load this information');
			} else {
				console.log("Title: " + JSON.parse(body).Title);
				console.log("Release Year: " + JSON.parse(body).Year);
				console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
				console.log("Rotten Tomato Rating: " + JSON.parse(body).tomatoRating);
				console.log("Country Origin: " + JSON.parse(body).Country);
				console.log("Original Language: " + JSON.parse(body).Language);
				console.log("Actor List: " + JSON.parse(body).Actors);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Rotten Tomato URL: " + JSON.parse(body).tomatoURL);
			}
		});
	});
}



//function do-what-it-says
//do-what-it-says - using fs - takes text from random.txt and run it in the liri bot
function doThis() {
	console.log("command: " + Random.command);
	if(Random.command === 'my-tweets'){
			showTweets();
		} else if (command === 'spotify-this-song'){
			spotifyInfo(Random.input);
		} else if (command === 'movie-this'){
			movieInfo(Random.input);
		} else if (command === 'do-what-it-says'){
			doThis();
		} else {
			return console.log('no choices');
		}
}


//bonus***
//logs outputs to a log.txt file, append them! 
function logOutputs() {
	//console.log("logOutputs is begininggg");
	//logs outputs to log.txt automatically
}

