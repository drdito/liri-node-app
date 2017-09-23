var twitterKeys = require("./keys.js");
var command = process.argv[2];
var queryTerm="";
//function to take in how ever many arguments follow command
function takeArguments() {
  for (var x = 3; x < process.argv.length; x++) {
    if (x === 3) {
      queryTerm += process.argv[x];
    }
    else{
      queryTerm += " " + process.argv[x];
    }
  }
  return queryTerm;
}
//Twitter API call and Action
if (command === "my-tweets") {
  var Twitter = require('twitter');
  var client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
  });
  client.get("statuses/user_timeline", {count: 20}, function(error, tweets, response) {   

    if(error) {
      return console.log(error);
    }
    if (!error && response.statusCode === 200) {
      for (var i = 0; i < tweets.length; i++){
        console.log("Tweet: " + tweets[i].text);
        console.log("Created at: " + tweets[i].created_at);
        console.log("---------------------------------------------------");
      }
    }
  });
}
// Spotify API call and action.
else if (command === "spotify-this-song") {
  var Spotify = require("node-spotify-api");
  takeArguments();
  if (queryTerm === "") {
    queryTerm = "The Sign Ace of Base";
  }
   
  var spotify = new Spotify({
    id: twitterKeys.id,
    secret: twitterKeys.secret
  });
   
  spotify.search({ type: "track", query: queryTerm }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log("");
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("Preview URL: " + data.tracks.items[0].preview_url);
  }); 
}
// Calling and displaying movie information
else if (command === "movie-this") {
  var request = require("request"); 
  takeArguments();
  if (queryTerm === "") {
    queryTerm = "Mr. Nobody";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + queryTerm + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function(error, response, body) {
    if (error) {
      return console.log(error);
    }
    if (!error && response.statusCode === 200) {
      //console.log(JSON.parse(body));
      console.log("\nTitle: " + JSON.parse(body).Title);
      console.log("\nYear of Release: " + JSON.parse(body).Year);
      console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("\nCountry of Origin: " + JSON.parse(body).Country);
      console.log("\nLanguage: " + JSON.parse(body).Language);
      console.log("\nPlot: " + JSON.parse(body).Plot);
      console.log("\nMain Cast: " + JSON.parse(body).Actors);
    }
  });
}
//Reading from random.txt
else if (command === "do-what-it-says"){
  var fs = require("fs");
  var file = "random.txt";
  var Spotify = require("node-spotify-api");
  fs.readFile(file, "utf8", function(error, data){
    if(error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    command = dataArr[0];
    queryTerm = dataArr[1];
    var spotify = new Spotify({
      id: twitterKeys.id,
      secret: twitterKeys.secret
    });
    spotify.search({ type: "track", query: queryTerm }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log("");
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Preview URL: " + data.tracks.items[0].preview_url);
    }); 
  });
}

else {
  console.log("Invalid Command. Valid commands are my-tweets, spotify-this-song, movie-this, and do-what-it-says");
}