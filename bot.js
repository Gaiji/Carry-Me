const Discord = require('discord.js');
const client = new Discord.Client();
const api = "http://zipcloud.ibsnet.co.jp/api/search?callback=?"
const snekfetch = require("snekfetch");

let prefix = ';'

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: ';help', type: 0 } });
});

client.on('message', message => {
    if (message.content === prefix + 'ping') {
    	message.channel.sendMessage('あなたのPingは`' + `${Date.now() - message.createdTimestamp}` + ' ms`です');
    }
    if (message.content === prefix + 'help') {
	message.reply("DMに送りました")
    	message.author.send("コマンドリスト: ");
	message.author.send(";ping - あなたのPingを表示します");
    }
    snekfetch.get(api).then(r => {
	let body = r.body;
	let id = args[0];
	let entry = body.find(post => post.id === id);
	message.author.send(entry);
    });
});

client.login(process.env.BOT_TOKEN);
