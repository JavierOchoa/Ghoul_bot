const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply('No puedes hacer esto');
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply('No se encuentra el usuario');
    if (tomute.hasPermission("MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS")) return message.reply('No se puede silenciar');
    let muterole = message.guild.roles.find(`name`, 'muteado');
   
    //Crear rol
    if(!muterole){
        try {
            muterole = await message.guild.createRole ({
                name: "muteado",
                color: '##ff0000',
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e){
            console.log(e.stack);
        }
    } //Termina de crear el rol

    let mutetime = args[1];
    if(!mutetime) return message.reply('No especificaste un tiempo!');

    await(tomute.addRole(muterole));
    message.reply(`<@${tomute.id}> ha sido silenciado por ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`a <@${tomute.id}> se le acabo el castigo`);
    }, ms(mutetime));
}

module.exports.help = {
    name:'mute'
}