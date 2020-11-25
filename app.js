// Copyright 2020 cubis
var axios = require('axios').default;
require('dotenv').config();

async function newsRequest() {
    var options = {
        method: 'GET',
        url: 'https://newscatcher.p.rapidapi.com/v1/latest_headlines',
        params: {topic: 'politics', lang: 'en', country: 'us', media: 'True'},
        headers: {
            'x-rapidapi-key': process.env.NEWSTOK,
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

function discordPush(story) {
    // randomize the color of each embed
    console.log("dropping a spicy article now")
    var options = {
        method: 'POST',
        url: process.env.WEBHOOK,
        headers: {
            "Content-Type": "application/json"
        },
        data :{
            "embeds": [
                {
                "title": story.title,
                "description": story.summary,
                "url": story.link,
                "color": Math.floor(Math.random()*16777215),
                "thumbnail": {
                    url: story.media,
                },
                "author": {
                    "name": story.clean_url,
                }
            }]
        }
    }
    axios(options);
}

function runLoop(content) {
    var articles = content.articles
    for(var index in articles) {
        // push out an article every 15 minutes
        var story = articles[index];
        setTimeout(discordPush, 900000*index, story);
    }
}

function refreshNews() {
    newsRequest().then(runLoop);
}

console.log('NewsBot is up and running');
refreshNews();
// refresh news every 1.25 hour
setInterval(refreshNews, 4500000)