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
    if (message.content.startsWith(prefix + 'stars')) {
	let args = message.content.split(" ").slice(1);
	let test = Number(args.join(" "))
	if (test => 10){
	    message.channel.sendMessage('あなたは`2スター`です(' + test + ' Score)');
	}
    }
    
});

client.login(process.env.BOT_TOKEN);
