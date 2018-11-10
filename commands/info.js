const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Informacion del Servidor")
        .setColor("#bc10b9")
        .setThumbnail(sicon)
        .addField("Nombre del Servidor", message.guild.name)
        .addField("ID", message.guild.id)
        .addField("Cantidad de Miembros", message.guild.memberCount)
        .addField("Propietario", message.guild.owner)
        .addField("Region", message.guild.region)
        .addField("Fecha de Creacion", message.guild.createdAt)

        return message.channel.send(serverembed);
}

module.exports.help = {
    name:"info"
}