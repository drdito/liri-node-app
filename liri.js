var twitterKeys = require("./keys.js");
//console.log(twitterKeys);
var command = process.argv[2];
var args = process.argv[3];

if (command === "my-tweets") {
  var Twitter = require('twitter');
  var client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
  });
  client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response) {   

    if(error) {
      return console.log(error);
    }
    //console.log(JSON.stringify(tweets, null, 2));
    for (var i = 0; i < tweets.length; i++){
      console.log("Tweet: " + tweets[i].text);
      console.log("Created at: " + tweets[i].created_at);
      console.log("------------------------------------");
    }
  });
}