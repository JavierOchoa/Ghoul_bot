const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
  const logch = bot.channels.cache.get('754188619127980142')
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu quien eres para decirme que hacer?");
  if(!args[0]) return message.channel.send('Debes especificar la cantidad de mensajes');
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Se eliminaron ${args[0]} mensages.`).then(message => message.delete({timeout : 2000}))
  .then (msg => logch.send(`${msg.author.username} borro ${args[0]} mensajes de ${message.channel} despues de 2 segundos`))
});

}

module.exports.help = {
  name: "prune"
}