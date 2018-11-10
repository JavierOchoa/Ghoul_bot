const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const kUser = message.mentions.users.first();
    if (kUser) {
        const member = message.guild.member(kUser);
        if(member) {
            if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS")) return message.reply("Tu quien eres para decirme que hacer?");
            let kReason = args.join(" ").slice(22);
            member.kick(kReason).then(() => {
                message.reply(`<@${kUser.id}> fue expulsado!`);
            }).catch(err => {
                message.reply(`<@${kUser.id}> no se puede expulsar :"v`);
                console.error(err);
            });
        } else {
            message.reply('Ese usuario no esta en el servidor');
        }
    } else {
        message.reply('Debes mencionar un usuario')
    }

}

module.exports.help = {
    name: 'kick'
}