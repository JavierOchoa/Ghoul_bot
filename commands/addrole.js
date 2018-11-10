const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    //Verificar que la persona que envio el mensaje pueda configurar roles
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('No puedes hacer esto');
    //buscar el usuario por medio de @
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply('No se encuentra ese usuario');
    //Confirmar que se escriba un rol y verificar si existe
    let role = args.join(' ').slice(22); 
    if (!role) return message.reply('Debes especificar un rol');
    let gRole = message.guild.roles.find(role => role.name === args.join(' ').slice(22));
    if (!gRole) return message.reply('No existe ese rol');
    //El usuario ya tiene el rol?
    if (rMember.roles.has(gRole.id)) return message.reply(`<@${rMember.id}> Ya tiene ese rol`);
    await (rMember.addRole(gRole.id));
    
    try{
        await rMember.send(`Ahora tienes el rol de ${gRole.name} en ${message.guild.name}`)
      }catch(e){
        console.log(e.stack);
        message.channel.send(`Se le ha dado el rol de ${gRole.name} a <@${rMember.id}>.`)
      }
}
    

module.exports.help = {
    name: "addrole"
}