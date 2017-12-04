const Discord = require('discord.js');
const client = new Discord.Client();
const snekfetch = require("snekfetch");

let prefix = ';'

var request = require('request');
var mcCommand = 'hypixel'; // Command for triggering
var mcIP = 'hypixel.net'; // Your MC server IP
var mcPort = 25565; // Your MC server port

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: ';help', type: 0 } });
});
client.on('message', message => {
    if (message.content === prefix + mcCommand) {
        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            var status = '*Offline*';
            if(body.online) {
                status = '*Online*';
                if(body.players.now) {
		    let embed = new Discord.RichEmbed()
    	                .setAuthor("Hypixel.net")
	                .setColor("#9B59B6")
	                .setDescription(" Stats: *"+ status + "*\n Players: *"+ body.players.now + "*");
	            message.channel.sendEmbed(embed);
                } else {
                    let embed = new Discord.RichEmbed()
    	                .setAuthor("Hypixel.net")
	                .setColor("#9B59B6")
	                .setDescription(" Stats: *"+ status + "*")
	                .setDescription(" Players: *"+ 0 + "*");
                    message.channel.sendEmbed(embed);
                }
            }
        });
    }
    if (message.content === prefix + 'ping') {
    	message.channel.sendMessage('あなたのPingは`' + `${Date.now() - message.createdTimestamp}` + ' ms`です');
    }
    if (message.content === prefix + 'help') {
	message.reply("DMに送りました")
    	message.author.send("コマンドリスト: \n;Ping - あなたのPingを表示します\n;stars <score> - スターを表示します");
    }
    if (message.content.startsWith(prefix + 'stars')) {
	let args = message.content.split(" ").slice(1);
	let test = Number(args.join(" "))
	let stars = 0;
	if (test >= 25210){
	    let stars = 15;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 22210){
	    let stars = 14;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 19210){
	    let stars = 13;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 16210){
	    let stars = 12;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 13210){
	    let stars = 11;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 10210){
	    let stars = 10;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 5210){
	    let stars = 9;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 2710){
	    let stars = 8;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 1710){
	    let stars = 7;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 960){
	    let stars = 6;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 460){
	    let stars = 5;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 210){
	    let stars = 4;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 60){
	    let stars = 3;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test >= 10){
	    let stars = 2;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else if (test < 10){
	    let stars = 1;
	    let embed = new Discord.RichEmbed()
    	        .setAuthor("Hypixel UHC Stars")
	        .setColor("#9B59B6")
	        .setDescription(stars + "✫");
	    message.channel.sendEmbed(embed);
	}
	else{
	    message.reply(";stars <score>")
	}
    }
    
});

client.login(process.env.BOT_TOKEN);
