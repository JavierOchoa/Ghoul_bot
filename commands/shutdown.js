const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    //Verifica que solo el autor del bot pueda apagarlo
    if(message.author.id != "343921797781258242") return message.channel.send("No eres nadie para decirme que hacer")

    try {
        await message.channel.send(`${bot.user.username} se esta apagando...`)
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
}

module.exports.help = {
    name: "shutdown"
}