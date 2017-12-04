const Discord = require('discord.js');
const client = new Discord.Client();
let prefix = '@'

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === prefix + 'ping') {
    	message.reply('pong');
  	}
    if (message.content === prefix + 'test') {
    	message.reply('pong');
  	}
});

client.login(process.env.BOT_TOKEN);
