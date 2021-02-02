// Copyright 2020 cubis
const axios = require('axios').default;
require('dotenv').config();

async function newsRequest() {
	const options = {
		method: 'GET',
		url: 'https://google-news.p.rapidapi.com/v1/topic_headlines',
		params: { lang: 'en', country: 'us', topic: 'NATION' },
		headers: {
			'x-rapidapi-key': process.env.NEWSTOK,
			'x-rapidapi-host': 'google-news.p.rapidapi.com',
		},
	};
	try {
		const response = await axios.request(options);
		return response.data;
	}
	catch(error) {
		console.error(error);
	}
}

function discordPush(story) {
	// randomize the color of each embed
	console.log(`publishing article ${story.title}`);
	const options = {
		method: 'POST',
		url: process.env.WEBHOOK,
		headers: {
			'Content-Type': 'application/json',
		},
		data :{
			'embeds': [
				{
					'title': story.title,
					'url': story.link,
					'color': Math.floor(Math.random() * 16777215),
					'author': {
						'name': story.source.title,
					},
				}],
		},
	};
	axios(options);
}

function runLoop(content) {
	const articles = content.articles;
	articles.forEach((val, index) => {
		const story = val;
		if(story.source.title.includes('fox') || story.source.title.includes('Fox News')) {
			console.log(`ignoring article ${story.title}`);
		}
		else {
			setTimeout(discordPush, 120000 * index, story);
		}
	});
}

function refreshNews() {
	newsRequest().then(runLoop);
}

console.log('NewsBot is up and running');
refreshNews();
// refresh news every 6 hours
setInterval(refreshNews, 2.16e+7);