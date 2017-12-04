const Discord = require('discord.js');
const HypixelAPI = require('hypixel-api')
const client = new Discord.Client();
const HypixelClient = new HypixelAPI(args[1])

let prefix = ';'

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: ';help', type: 0 } });
});

client.on('message', message => {
    let hypixelPlayer
    hypixelPlayer = (await HypixelClient.getPlayer('name', 'llIl')).player
    if (message.content === prefix + 'ping') {
    	message.channel.sendMessage('あなたのPingは`' + `${Date.now() - message.createdTimestamp}` + ' ms`です');
        //message.reply('pong');
  	}
    if (message.content === prefix + 'help') {
	message.reply("DMに送りました")
    	message.author.send("コマンドリスト: ");
	message.author.send(";ping - あなたのPingを表示します");
  	}
});

client.login(process.env.BOT_TOKEN);
