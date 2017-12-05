const Discord = require('discord.js');
const client = new Discord.Client();
const snekfetch = require("snekfetch");

let prefix = ';'

var request = require('request');
var mcCommand = 'hypixel'; // Command for triggering
var mcIP = 'hypixel.net'; // Your MC server IP
var mcPort = 25565; // Your MC server port
var key = "12755d3c-51c6-4926-bb41-2baeb72d4c0c";

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: ';help', type: 0 } });
});
function zero(variable) {
    if (variable === undefined) {
        return 0;
    } else {
        return variable;
    }
}
client.on('message', message => {
    if (message.content.startsWith(prefix + 'test')) {
	let args = message.content.split(" ").slice(1);
	let unk = args.join(" ")
        let fromlang = 'auto';
        let tolang = 'ja';
        let gurl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + fromlang + "&tl="+tolang+"&dt=t&q=" + unk;
        request(gurl, function(error, response, body) {
            try {
              // body = iconv.decode(body, 'utf8');
              // console.log(bodyWithCorrectEncoding)
                let translated = body.match(/^\[\[\[".+?",/)[0];
                translated = translated.substring(4, translated.length - 2);
                message.channel.sendMessage("```\nTranslated:\n" + translated + "\n```");
            } catch (err) {
                message.channel.sendMessage("`Input was invalid`");
            }
        });
    }
    if (message.content.startsWith(prefix + 'translate') || message.content.startsWith(prefix + 'trans')) {
	let args = message.content.split(" ").slice(1);
	let unk = args.join(" ")
	var url ='https://api.mymemory.translated.net/get?q='+ unk +'&langpair=en|ja'
	request(url, function(error, response, body) {
	    try {
	        body = JSON.parse(body);
		if (body.responseData.translatedText === "NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT"){
		    return message.reply("```"+ message +" <word>```")
		}
	        message.channel.sendMessage("```"+body.responseData.translatedText+"```");
	    } catch (err) {
                return message.channel.sendMessage("```Input was invalid```");
            }
	});
    }
    if (message.content.startsWith(prefix + 'uhc')) {
	let args = message.content.split(" ").slice(1);
	let unk = args.join(" ")
	var url = 'https://api.mojang.com/users/profiles/minecraft/'+unk
	request(url, function(err, response, body) {
	    if(!body) {
                return message.reply('指定されたプレイヤーは存在しません');
            }
            body = JSON.parse(body);
	    let uuid = body.id;
	    var url2 = 'https://api.hypixel.net/player?key='+key+'&name='+unk
	    request(url2, function(err, response, body) {
	        body = JSON.parse(body);
		if (body.player === null) {
		    return message.reply('指定されたプレイヤーはステータスが存在しません');
		}
	        let embed = new Discord.RichEmbed()
	            .setDescription(body.player.displayname + "'s UHC Champions Stats")
		    .addField("Coins", zero(body.player.stats.UHC.coins), true)
		    .addField("Score", zero(body.player.stats.UHC.score), true)
		    .addField("Solo Kills", zero(body.player.stats.UHC.kills_solo), true)
		    .addField("Solo Wins", zero(body.player.stats.UHC.wins_solo), true)
		    .addField("Teams Kills", zero(body.player.stats.UHC.kills), true)
	            .setThumbnail('https://crafatar.com/avatars/' + (uuid || '') + '?size=100')
	            .setThumbnail('https://crafatar.com/avatars/' + (unk || '') + '?size=100')
        	    .addField("Teams Wins", zero(body.player.stats.UHC.wins), true);
	        message.channel.sendEmbed(embed);
	    });
	});
    }
    if (message.content.startsWith(prefix + 'namehistory')) {
	let args = message.content.split(" ").slice(1);
	let unk = args.join(" ")
	var url = 'https://api.mojang.com/users/profiles/minecraft/'+unk
	request(url, function(err, response, body) {
	    if(!body) {
                return message.reply('指定されたプレイヤーは存在しません');
            }
            body = JSON.parse(body);
	    let uuid = body.id;
	    var url2 = 'https://api.mojang.com/user/profiles/'+body.id+'/names'
	    request(url2, function(err, response, body) {
	        let embed = new Discord.RichEmbed()
		    .setAuthor("Name History")
		    .setThumbnail('https://crafatar.com/avatars/' + (uuid || '') + '?size=100')
		    .setDescription(body)
		message.channel.sendEmbed(embed);
	    });
	    //let embed = new Discord.RichEmbed()
    	    //    .setAuthor(body.id)
	    //message.channel.sendEmbed(embed);
	});
	
    }
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
		    var players = '*' + body.players.now + '*';
		    let embed = new Discord.RichEmbed()
    	                .setAuthor("Hypixel.net")
		        .setThumbnail('https://i.imgur.com/hFbNBr5.jpg')
	                .setColor("#30DB09")
	                .setDescription("Stats: *"+ status + "*\nPlayers: *"+ players + "*");
	            message.channel.sendEmbed(embed);
                } else {
                    let embed = new Discord.RichEmbed()
    	                .setAuthor("Hypixel.net")
		        .setThumbnail('https://i.imgur.com/hFbNBr5.jpg')
	                .setColor("#30DB09")
	                .setDescription(" Stats: "+ status + "")
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
    	message.author.send("```diff\n-コマンドリスト: \n+ ;Ping - あなたのPingを表示します\n+ ;stars <score> - スターを表示します\n+ ;hypixel - hypixelのステータスを表示します\n+ ;namehistory <player> - 指定したプレイヤーのName Historyが表示されます\n+ ;uhc <player> - 指定したプレイヤーのUHCステータスを表示できます\n+ ;trans <word> - 英語から日本語に翻訳できます```")
	message.author.send("```diff\n-Commands List: \n+ ;Ping - Show your ping\n+ ;stars <score> - Show your stars\n+ ;hypixel - Show hypixel server stats\n+ ;namehistory <player> - Show player name history\n+ ;uhc <player> - Show player uhc stats(hypixel.net)\n+ ;trans <word> - Translate from english to japanese```");
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
