const Discord = require('discord.js');
const client = new Discord.Client();
const api = "http://sk1er.club/data/llil/184e8bb7-4ae9-4d47-a11e-74acea6528a1"
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
	let entry = body.find(score);
	console.log(r.score);
    });
});

client.login(process.env.BOT_TOKEN);
