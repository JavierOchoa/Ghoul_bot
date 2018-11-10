const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const bUser = message.mentions.users.first();
        if (bUser) {
            const member = message.guild.member(bUser);
            if(member) {
                if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS")) return message.reply("Tu quien eres para decirme que hacer?");
                let bReason = args.join(" ").slice(22);
                member.ban(bReason).then(() => {
                    message.reply(`<@${bUser.tag}> ha sido baneado como perro!`);
                }).catch(err => {
                    message.reply(`Que dijiste? Corone? @${bUser.tag} no se puede banear :joy:`);
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
    name: "ban"
}