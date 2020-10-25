const Discord = require('discord.js');
const Client = require('fortnite');
const auth = require('../src/auth.json');
const fortnite = new Client(auth.TRNApiKey)

module.exports.run = async (bot, message, args) => {
    let username = args[0];
    if(!username) return message.reply('Debes mencionar un usuario')

    message.react('769815551413321749')
        .then(() => message.react('769815588323196928'))
        .then(() => message.react('769815632060874762'));
    const filter = (reaction, user) => {
	        return ['kbm', 'gamepad', 'touch'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
	    .then(collected => {
		    let reaction = collected.first();

            if (reaction.emoji.name === 'kbm') {
                platform = 'kbm';
                platformIco = 'https://i.imgur.com/abKGIDi.png'
                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            } else if (reaction.emoji.name === 'gamepad') {
                platform = 'gamepad';
                platformIco = 'https://i.imgur.com/yMzMpeh.png'
                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            } else if (reaction.emoji.name === 'touch') {
                platform = 'touch'
                platformIco = 'https://i.imgur.com/AVR2G9Y.png'
                message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            }
            fortnite.user(username, platform).then(res => {
            console.log(res);

            const statEmbed = new Discord.MessageEmbed()
                .setColor('#38b6ff')
                .setTitle(res.username)
                .setAuthor('Fortnite Tracker Network', 'https://tracker.gg/favicon.ico', 'https://fortnitetracker.com')
                .setURL(res.url)
                .setThumbnail(platformIco)
                .setDescription(`Plataforma: ${res.platform}`)
                .addFields(
                    { name: '> ESTADISTICAS TOTALES', value: `Estadisticas generales en ${res.platform}`},
                    { name: 'Victorias', value: res.stats.lifetime.wins, inline: true },
                    { name: 'Kills', value: res.stats.lifetime.kills, inline: true },
                    { name: 'Nº Partidas', value: res.stats.lifetime.matches, inline: true },
                    { name: 'Top 5', value: res.stats.lifetime.top_5, inline: true },
                    { name: 'Top 25', value: res.stats.lifetime.top_25, inline: true },
                    { name: 'K/D', value: res.stats.lifetime.kd, inline: true },
                )
                .setTimestamp()
                .setFooter(`Generado`, message.guild.iconURL())

                if(res.stats.solo) {
                    statEmbed.addFields(
                        { name: '> ESTADISTICAS SOLO', value: `Estadisticas en modo solitario`},
                        { name: 'Victorias', value: res.stats.solo.wins, inline: true },
                        { name: 'Kills', value: res.stats.solo.kills, inline: true },
                        { name: 'K/D', value: res.stats.solo.kd, inline: true },
                    )} else console.log('No hay informacion')
                if(res.stats.duo) {
                    statEmbed.addFields(
                        { name: '> ESTADISTICAS DUO', value: `Estadisticas en modo duo`},
                        { name: 'Victorias', value: res.stats.duo.wins, inline: true },
                        { name: 'Kills', value: res.stats.duo.kills, inline: true },
                        { name: 'K/D', value: res.stats.duo.kd, inline: true },
                    )} else console.log('No hay informacion')
                if(res.stats.squad) {
                    statEmbed.addFields(
                        { name: '> ESTADISTICAS SQUAD', value: `Estadisticas en modo escuadron`},
                        { name: 'Victorias', value: res.stats.squad.wins, inline: true },
                        { name: 'Kills', value: res.stats.squad.kills, inline: true },
                        { name: 'K/D', value: res.stats.squad.kd, inline: true },
                    )} else console.log('No hay informacion')

            message.channel.send(statEmbed);
        });
        
        }) 
	    .catch(collected => {
            message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
            message.reply('No seleccionaste ninguna plataforma');
        });
        
}

module.exports.help = {
    name: 'fstats'
}