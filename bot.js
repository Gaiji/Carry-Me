const Discord = require('discord.js');
const client = new Discord.Client();
const snekfetch = require("snekfetch");

let prefix = ';'

var request = require('request');
var mcCommand = 'hypixel'; // Command for triggering
var mcIP = 'hypixel.net'; // Your MC server IP
var mcPort = 25565; // Your MC server port
var key = "12755d3c-51c6-4926-bb41-2baeb72d4c0c";

//.setColor(hypixelfunctions.getrankcolor(body.player.newPackageRank, body.player.rank, body.player.rankPlusColor, unk, body.player.packageRank))
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
    console.log(client.channels.get);
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
		    return message.channel.sendMessage("```"+ message +" <word>```")
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
		let rank;
		if (body.player.rank === "YOUTUBER") {
                    rank = '0xFFAA00';
                } else if (body.player.rank === "ADMIN") {
                    rank = '0xAA0000';
                } else if (body.player.rank === "MODERATOR") {
                    rank = '0x00AA00';
                } else if (body.player.rank === "HELPER") {
                    rank = '0x0000AA';
                } else if (body.player.rank === "BUILD_TEAM") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "OWNER") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "JR_HELPER") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "MOJANG") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "MCProHosting") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "APPLE") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "SLOTH") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "ANGUS") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "EVENTS") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "Mixer") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "BUILD_TEAM_PLUS") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "LOL") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "LOL_PLUS") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "RETIRED") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "SPECIAL") {
                    rank = '0x00AAAA';
                } else if (body.player.rank === "BETA_TESTER") {
                    rank = '0x00AAAA';
		} else if (body.player.newPackageRank === "VIP") {
                    rank = '0x55FF55';
		} else if (body.player.newPackageRank === "VIP_PLUS") {
                    rank = '0x55FF55';
		} else if (body.player.newPackageRank === "MVP") {
                    rank = '0x55FFFF';
		} else if (body.player.newPackageRank === "MVP_PLUS") {
                    rank = '0x55FFFF';
		} else {
                    rank = '0xAAAAAA';
                }
		var kdsoloratio = body.player.stats.UHC.kills_solo / body.player.stats.UHC.deaths_solo;
   		var kdteamratio = body.player.stats.UHC.kills / body.player.stats.UHC.deaths;
		var a = String(body.player.firstLogin);
		var str = a.slice( 0, -3 );
		var b = String(body.player.lastLogin);
		var sta = b.slice( 0, -3 );
	        var url3 = 'http://www.convert-unix-time.com/api?timestamp='+ str +'&format=english'
		let firstlogin;
		let lastlogin;
	        request(url3, function(err, response, data) {
	            var url4 = 'http://www.convert-unix-time.com/api?timestamp='+ sta +'&format=english'
	            request(url4, function(err, response, datar) {
	                datar = JSON.parse(datar);
		        lastlogin = String(datar.localDate);
	                data = JSON.parse(data);
		        firstlogin = String(data.localDate);
			let equipkit;
			if (body.player.stats.UHC.equippedKit == "LEATHER_ARMOR") {
			    equipkit = 'Leather Armor';
			} else if (body.player.stats.UHC.equippedKit == "MAGIC_TOOLS") {
			    equipkit = 'Enchanting Set';
			} else if (body.player.stats.UHC.equippedKit == "ARCHERY_TOOLS") {
			    equipkit = 'Archery Set';
			} else if (body.player.stats.UHC.equippedKit == "WORKING_TOOLS") {
			    equipkit = 'Stone Gear';
			} else if (body.player.stats.UHC.equippedKit == "LUNCH_BOX") {
			    equipkit = 'Lunch Box';
			} else if (body.player.stats.UHC.equippedKit == "LOOTER") {
			    equipkit = 'Looter';
			} else if (body.player.stats.UHC.equippedKit == "ECOLOGIST") {
			    equipkit = 'Ecologist';
			} else if (body.player.stats.UHC.equippedKit == "FARMER") {
			    equipkit = 'Farmer';
			} else if (body.player.stats.UHC.equippedKit == "HORSEMAN") {
			    equipkit = 'Horseman';
			}
	                let embed = new Discord.RichEmbed()
	                    .setDescription(body.player.displayname + "'s UHC Champions Stats - " + equipkit)
		            .addField("Coins", zero(body.player.stats.UHC.coins), true)
		            .addField("Score", zero(body.player.stats.UHC.score), true)
		            .addField("Solo Kills", zero(body.player.stats.UHC.kills_solo), true)
		            .addField("Solo Wins", zero(body.player.stats.UHC.wins_solo), true)
		            .addField("Teams Kills", zero(body.player.stats.UHC.kills), true)
        	            .addField("Teams Wins", zero(body.player.stats.UHC.wins), true)
		            .addField("Solo Deaths", zero(body.player.stats.UHC.deaths_solo), true)
		            .addField("Teams Deaths", zero(body.player.stats.UHC.deaths), true)
       		            .addField("KDR Solo", kdsoloratio.toFixed(2), true)
       		            .addField("KDR Team", kdteamratio.toFixed(2), true)
			    .addField("Head Eat Solo", zero(body.player.stats.UHC.heads_eaten_solo), true)
			    .addField("Head Eat Team", zero(body.player.stats.UHC.heads_eaten), true)
       		            .addField("First login", zero(firstlogin), true)
       		            .addField("Last login", zero(lastlogin), true)
	                    .setColor(rank)
	                    .setThumbnail('https://crafatar.com/avatars/' + (uuid || '') + '?size=100')
	                    .setThumbnail('https://crafatar.com/avatars/' + (unk || '') + '?size=100');
	                message.channel.sendEmbed(embed);
		    });
		});
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
