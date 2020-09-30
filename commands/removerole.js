const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    //Verificar que la persona que envio el mensaje pueda configurar roles
    if(!message.member.permissions.has("MANAGE_ROLES")) return message.reply('No puedes hacer esto');
    //buscar el usuario por medio de @
    let rMember = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
    if(!rMember) return message.reply('No se encuentra ese usuario');
    //Confirmar que se escriba un rol y verificar si existe
    let role = args.join(' ').slice(22); 
    if (!role) return message.reply('Debes especificar un rol');
    let gRole = message.guild.roles.cache.find(role => role.name === args.join(' ').slice(22));
    if (!gRole) return message.reply('No existe ese rol');
    //El usuario ya tiene el rol?
    if (!rMember.roles.cache.has(gRole.id)) return message.reply(`<@${rMember.id}> no tiene ese  rol`);
    await (rMember.roles.remove(gRole.id));
    
    try{
        await rMember.send(`RIP! perdiste el rol de ${gRole.name} en ${message.guild.name}`)
        message.channel.send(`Se le ha quitado el rol de ${gRole.name} a <@${rMember.id}>.`)
      }catch(e){
        console.log(e.stack);
      }
}

module.exports.help = {
    name: "remrole"
}