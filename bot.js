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
    if (message.content === prefix + 'stars') {
    	message.channel.sendMessage(args[0]);
    }
    if (Number(message) < 10){
	let stars = 1;
    }
    if (Number(message) => 10){
	let stars = 2;
    }
    if (Number(message) => 60){
	let stars = 3;
    }
    if (Number(message) => 210){
	let stars = 4;
    }
    if (Number(message) => 460){
	let stars = 5;
    }
    if (Number(message) => 960){
	let stars = 6;
    }
    if (Number(message) => 1710){
	let stars = 7;
    }
    if (Number(message) => 2710){
	let stars = 8;
    }
    if (Number(message) => 5210){
	let stars = 9;
    }
    if (Number(message) => 10210){
	let stars = 10;
    }
    if (Number(message) => 13210){
	let stars = 11;
    }
    if (Number(message) => 16210){
	let stars = 12;
    }
    if (Number(message) => 19210){
	let stars = 13;
    }
    if (Number(message) => 22210){
	let stars = 14;
    }
    if (Number(message) => 25210){
	let stars = 15;
        let embed = new Discord.RichEmbed(){
    	    .setAuthor("Hypixel UHC Stars");
	    .setDescription(stars)
	}
    }
});

client.login(process.env.BOT_TOKEN);
