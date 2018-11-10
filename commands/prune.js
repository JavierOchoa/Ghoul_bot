const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu quien eres para decirme que hacer?");
  if(!args[0]) return message.channel.send('Debes especificar la cantidad de mensajes');
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Se eliminaron ${args[0]} mensages.`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "prune"
}