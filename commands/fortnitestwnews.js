const Discord = require('discord.js');
const auth = require('../src/auth.json');
const FortniteAPI = require('fortnite-api-com');

    const config = {
        apikey: auth.apikey,
        language: "es-419",
        debug: true
    };

    var Fortnite = new FortniteAPI(config);

module.exports.run = async (bot, message, args) => {
    
    const allNews = args[0] === "todas"

    Fortnite.NewsSTW(config.language)
    .then(res => {
      console.log(res);

        for (let i = 0; i < res.data.messages.length; i++) {
            let title = res.data.messages[i].title;
            let body = res.data.messages[i].body;
            let image = res.data.messages[i].image;
            let location = res.data.messages[i].adspace;

            const stwEmbed = new Discord.MessageEmbed()
            .setTitle(title)
            .setAuthor(location)
            .setDescription(body)
            .setImage(image)
            .setColor("#9D5C63")
            .setTimestamp()
            .setFooter(`Generado con estado de server ${res.status}`, message.guild.iconURL())

            message.channel.send(stwEmbed)
        }

    }).catch(err => {
        console.log(err);
        });

}
module.exports.help = {
    name: 'stw'
}