// Copyright 2020 cubis
var axios = require('axios').default;
require('dotenv').config();

async function newsRequest() {
    var options = {
        method: 'GET',
        url: 'https://google-news.p.rapidapi.com/v1/topic_headlines',
        params: {lang: 'en', country: 'us', topic: 'NATION'},
        headers: {
            'x-rapidapi-key': process.env.NEWSTOK,
            'x-rapidapi-host': 'google-news.p.rapidapi.com'
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
                "url": story.link,
                "color": Math.floor(Math.random()*16777215),
                "author": {
                    "name": story.source.title,
                }
            }]
        }
    }
    axios(options);
}

function runLoop(content) {
    var articles = content.articles
    for(var index in articles) {
        // push out an article every 20 minutes
        var story = articles[index];
        setTimeout(discordPush, 1.2e+6*index, story);
    }
}

function refreshNews() {
    newsRequest().then(runLoop);
}

console.log('NewsBot is up and running');
refreshNews();
// refresh news every 6 hours
setInterval(refreshNews, 2.16e+7)