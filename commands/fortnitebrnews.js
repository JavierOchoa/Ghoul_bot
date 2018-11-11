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
        for (let i = 0; i < news.battleroyalenews.news.messages.length; i++) {
            let title = news.battleroyalenews.news.messages[i].title;
            let body = news.battleroyalenews.news.messages[i].body;
            let image = news.battleroyalenews.news.messages[i].image;

            function adspace() {
                if(!news.battleroyalenews.news.messages[i].adspace) {
                    return ' ';
                } else {
                    return news.battleroyalenews.news.messages[i].adspace;
                }
            }

            function type() {
                if (news.battleroyalenews.news.messages[i].messagetype === 'sale') {
                    return '#f44242';
                } else if (news.battleroyalenews.news.messages[i].messagetype === 'normal') {
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
    name: 'fbrnews'
}