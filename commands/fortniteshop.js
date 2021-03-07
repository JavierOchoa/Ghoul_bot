const Discord = require('discord.js');
const auth = require('../src/auth.json');
const Canvas = require("discord-canvas");
    const shop = new Canvas.FortniteShop();

module.exports.run = async (bot, message, args) => {
    const image = await shop
        .setToken(auth.xapikey)
        .lang("es")
        .dateFormat("dddd D MMMM YYYY")
        .setText("header", "Tienda de Fortnite")
        .setText("daily", "Diario")
        .setText("featured", "DESTACADO")
        .setText("date", "Tienda del {date}")
        .setText("footer", "ReivaJ#7840")
        .toAttachment();

    const attachment = new Discord.MessageAttachment(image, 'FortniteShop.png');

    const isChannel = bot.channels.cache.get('754959604089094245')
    try {
        isChannel.send('<@&754772144512303114> esta es la tienda de hoy', attachment);
    } catch(err) {
        console.error(err);
        isChannel.send('<@&754772144512303114> error en la tienda de hoy');
    }
}

module.exports.help = {
    name: 'fshop'
}
