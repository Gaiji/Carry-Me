const Discord = require('discord.js');
const client = new Discord.Client();

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
    $.getJSON('http://zipcloud.ibsnet.co.jp/api/search?callback=?',
      {
        zipcode: $('#zip').val()
      }
    )
    message.author.send($.getJSON);
});

client.login(process.env.BOT_TOKEN);
