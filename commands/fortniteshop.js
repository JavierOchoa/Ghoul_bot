const Discord = require('discord.js');
const auth = require('../src/auth.json');
const Twit = require("twit");
const fs = require('fs');
const Canvas = require("discord-canvas");
    const shop = new Canvas.FortniteShop();

module.exports.run = async (bot, message, args) => {
    const favStu = 'bob'
    const image = await shop
        .setToken(auth.xapikey)
        .lang("es")
        .dateFormat("dddd D MMMM YYYY")
        .setText("header", "Tienda de Fortnite")
        .setText("daily", "Diario")
        .setText("featured", "DESTACADO")
        .setText("date", "Tienda del {date}")
        .setText("footer", "ReivaJ - Proporcionado por fnbr.co")
        .toAttachment();

    const attachment = new Discord.MessageAttachment(image, 'FortniteShop.png');

    message.channel.send(attachment);
}

module.exports.help = {
    name: 'fshop'
}