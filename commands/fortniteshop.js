const Discord = require('discord.js');
const auth = require('./../src/auth.json');

module.exports.run = async (bot, message, args) => {
    let request = require('request-promise');
    let options = {
        url: 'https://fnbr.co/API/shop',
        headers: {
            'x-api-key': auth.xapikey
        },
        json: true
    };

    request(options).then(function(shopData) {
        for (let i = 0; i < shopData.data.featured.length; i++) {
            //Color del item segun la rareza
            function cLeg() {
                if (shopData.data.featured[i].rarity === 'legendary') {
                    return '#fc692a';
                } else if (shopData.data.featured[i].rarity === 'epic') {
                    return '#bd29fc';
                } else if (shopData.data.featured[i].rarity === 'rare') {
                    return '#28aefc';
                } else if (shopData.data.featured[i].rarity === 'uncommon') {
                    return '#47fc28';
                }
            }
            //elimina 'false' de la descripcion del embed cuando no existe descripcion
            function cDesc(){
                if (shopData.data.featured[i].description === false) {
                    return ' ';
                } else {
                    return shopData.data.featured[i].description;
                }
            }

            let embed1 = new Discord.RichEmbed()
            
            .setTitle(shopData.data.featured[i].name)
            .setDescription(shopData.data.featured[i].description)
            .setThumbnail(shopData.data.featured[i].images.icon)
            .setColor(cLeg())
            .addField('Tipo', shopData.data.featured[i].readableType)
            .addField('Precio', `${shopData.data.featured[i].price} vbucks`)
            .addField('Rareza', shopData.data.featured[i].rarity)
            
            message.channel.send(embed1)

            
        }

        for (let i = 0; i < shopData.data.daily.length; i++) {
            //Color del item segun la rareza
            function cLeg() {
                if (shopData.data.daily[i].rarity === 'legendary') {
                    return '#fc692a';
                } else if (shopData.data.daily[i].rarity === 'epic') {
                    return '#bd29fc';
                } else if (shopData.data.daily[i].rarity === 'rare') {
                    return '#28aefc';
                } else if (shopData.data.daily[i].rarity === 'uncommon') {
                    return '#47fc28';
                }
            }
            //elimina 'false' de la descripcion del embed cuando no existe descripcion
            function cDesc(){
                if (shopData.data.daily[i].description === false) {
                    return ' ';
                } else {
                    return shopData.data.daily[i].description;
                }
            }

            let embed2 = new Discord.RichEmbed()

            .setTitle(shopData.data.daily[i].name)
            .setDescription(cDesc())
            .setThumbnail(shopData.data.daily[i].images.icon)
            .setColor(cLeg())
            .addField('Tipo', shopData.data.daily[i].readableType)
            .addField('Precio', `${shopData.data.daily[i].price} vbucks`)
            .addField('Rareza', shopData.data.daily[i].rarity)

            message.channel.send(embed2)
        }
    });
}

module.exports.help = {
    name: 'fshop'
}