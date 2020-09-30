const Discord = require('discord.js');
const auth = require('../src/auth.json');
const Twit = require("twit");
const fs = require('fs');
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
        .setText("footer", "ReivaJ#2077 - Información de fnbr.co")
        .toAttachment();

    const attachment = new Discord.MessageAttachment(image, 'FortniteShop.png');

    const isChannel = bot.channels.cache.get('754959604089094245')
    isChannel.send('<@&754772144512303114> esta es la tienda de hoy', attachment);

    const T = new Twit({
        consumer_key: auth.CONKEY,
        consumer_secret: auth.CONSECRET,
        access_token: auth.ACCKEY,
        access_token_secret: auth.ACCSECRET,
    });

    const logch = bot.channels.cache.get('754188619127980142')
    const b64content = fs.readFileSync(image, { encoding: 'base64'})

    T.post('media/upload', {media_data: b64content}, function (err, data, response) {
        const mediaIdStr = data.media_id_string
        const altText = 'FortniteShop'
        const meta_params = {media_id: mediaIdStr, alt_Text: {text: altText} }

        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if(!err) {
               const params = {status: 'Fortnite #ItemShop', media_ids: [mediaIdStr] }
                
                T.post('statuses/update', params, function (err, data, response) {
                    console.log(data)
                    logch.send('La tienda de hoy ha sido twitteada correctamente')
                })
            }
        })
    })
}

module.exports.help = {
    name: 'tis'
}