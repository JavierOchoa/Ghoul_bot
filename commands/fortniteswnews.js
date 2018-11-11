const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let request = require('request-promise');
    let options = {
        url: 'https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game',
        headers: {
            'Accept-Language': 'es-MX'
        },
        json: true
    };

    request(options).then(function(news) {
        for (let i = 0; i < news.savetheworldnews.news.messages.length; i++) {
            let title = news.savetheworldnews.news.messages[i].title;
            let body = news.savetheworldnews.news.messages[i].body;
            let image = news.savetheworldnews.news.messages[i].image;

            function adspace() {
                if(!news.savetheworldnews.news.messages[i].adspace) {
                    return ' ';
                } else {
                    return news.savetheworldnews.news.messages[i].adspace;
                }
            }

            function type() {
                if (news.savetheworldnews.news.messages[i].messagetype === 'sale') {
                    return '#f44242';
                } else if (news.savetheworldnews.news.messages[i].messagetype === 'normal') {
                    return '#41c7f4';
                }
            }
            
            let embed = new Discord.RichEmbed()
            
            .setTitle(title)
            .setDescription(body)
            .setImage(image)
            .setColor(type())
            .setFooter(adspace())
            
            message.channel.send(embed)
        }
    });
}

module.exports.help = {
    name: 'fswnews'
}