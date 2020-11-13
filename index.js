// Copyright 2020 cubis

// starting up the bot
const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.on('message', message => {
    // prefix of n! on commands
    if(!message.content.startsWith('n!') || message.author.bot) return;

    const args = message.content.slice(2).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command) {
        case "latest":
            // get the latest story
    }


});
client.login(process.env.TOKEN);

client.once('ready', () => {
    console.log('NewsBot is online!')
});