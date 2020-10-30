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

    Fortnite.NewsCreative(config.language)
    .then(res => {
      console.log(res);
      
      if(allNews) {

        for (let i = 0; i < res.data.motds.length; i++) {
            let title = res.data.motds[i].title;
            let body = res.data.motds[i].body;
            let image = res.data.motds[i].image;

            const specificEmbed = new Discord.MessageEmbed()
            .setTitle(title)
            .setDescription(body)
            .setImage(image)
            .setColor("#002642")
            .setTimestamp()
            .setFooter(`Generado con estado de server ${res.status}`, message.guild.iconURL())

            message.channel.send(specificEmbed)
        }
      } else {
          message.channel.send(res.data.image)
      }
    }).catch(err => {
        console.log(err);
        });


}
module.exports.help = {
    name: 'creativo'
}