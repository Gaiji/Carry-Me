const Discord = require('discord.js');
const client = new Discord.Client();
let prefix = ';'
var commandslist = fs.readFileSync('Carry-Me/commands.txt', 'utf8');

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: ';help', type: 0 } });
});

client.on('message', message => {
    if (message.content === prefix + 'ping') {
    	message.channel.sendMessage('あなたのPingは`' + `${Date.now() - message.createdTimestamp}` + ' ms`です');
        //message.reply('pong');
  	}
    if (message.content === prefix + 'help') {
    	message.channel.send(commandslist);
  	}
});

client.login(process.env.BOT_TOKEN);
