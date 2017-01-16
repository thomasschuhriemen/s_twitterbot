var Twit = require('twit');
var fs = require('fs');
require('dotenv').config();

var config = {
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token: process.env.access_token,
	access_token_secret: process.env.access_token_secret
}

var T = Twit(config);

var drugFile = fs.readFileSync('./corpora/drugNameStems.json');
drugs = JSON.parse(drugFile).stems;
console.log(drugs);


function getRandom(arr) {
	var index = Math.floor(Math.random() * arr.length);
	return arr[index];
}

function tweet() {
	var msg = getRandom(drugs);
	T.post('statuses/update', {status: msg}, tweeted);

	function tweeted(err, data, response) {
		if (err) {
			return console.log(err);
		} else {
			return console.log('Success: ' + data.tweet);
		}
	};
}

setInterval(tweet, 1000 * 60 *5);
tweet();

//setTimeout()