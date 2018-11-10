const Discord = require('discord.js');
const Client = require('fortnite');
const auth = require('./../src/auth.json');
const fortnite = new Client(auth.TRNApiKey)

module.exports.run = async (bot, message, args) => {
    let username = args[0];
    let platform = args[1] || 'pc';

    if(!username) return message.reply('Debes mencionar un usuario')

    let data = fortnite.user(username, platform).then(data => { 

        let stats = data.stats;
        let lifetime = stats.lifetime;

        let score = lifetime [6]['Score']
        let mplayed = lifetime [7]['Matches Played']
        let wins = lifetime [8]['Wins']
        let winsper = lifetime [9]['Win%']
        let kills = lifetime [10]['Kills']
        let kd = lifetime [11]['K/d']

       let embed = new Discord.RichEmbed()
       .setTitle('Fortnite Traker')
       .setAuthor(data.username)
       .setColor('#38b6ff')
       .setDescription(data.platform)
       .addField("Wins", wins, true)
       .addField('Kills', kills, true)
       .addField('Matches Played', mplayed, true)
       .addField('% Victorias', winsper, true)
       .addField('K/D', kd, true)
       .addField('Score', score, true)

       message.channel.send(embed); 
    });
}

module.exports.help = {
    name: 'ft'
}