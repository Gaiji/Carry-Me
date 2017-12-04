const Discord = require('discord.js');
const client = new Discord.Client();
const api = "https://api.hypixel.net/player?key=435e41c7-1db5-4669-800a-86234b76fbe0&name=llil"
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
	let score = Number(2786);
	let entry = body.find(post => post.score === score);
	console.log(entry);
    });
});

client.login(process.env.BOT_TOKEN);
