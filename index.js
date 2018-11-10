const botconfig = require('./src/botconfig.json');
const auth = require('./src/auth.json');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

//verificar la presencia de los comandos
fs.readdir('./commands/',   (err, files) => {
 
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if(jsfile.lenght <= 0){
        console.log('No se pueden encontrar los comandos.');
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`Se cargo ${f}`);
        bot.commands.set(props.help.name, props);
    });
});

//verificar la presencia de los comandos que aun no estan listos
fs.readdir('./wipcommands/',   (err, files) => {
 
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if(jsfile.lenght <= 0){
        console.log('No se pueden encontrar los comandos.');
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./wipcommands/${f}`);
        console.log(`Se cargo ${f}`);
        bot.commands.set(props.help.name, props);
    });
});

//Actividad del bot
bot.on('ready', async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("Ready to nuke!")
});
//configuracion de command hanlder
bot.on('message', async (message) =>{
    if (message.author.bot) return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split (" ");
    let cmd = messageArray[0] ;
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if (commandFile) commandFile.run(bot, message, args);
    
});
//Si se escribe "ping", el bot responde "pong!"
bot.on('message', async (message) => {
    if (message.content === "ping"){
        message.reply("pong!");
    }
});
//Le dice a los usuarios que existen nuevos comandos para la infomacion relacionada con Fortnite
bot.on('message', async (message) => {
    const oldStats = '!fm'   
    if (message.content === '!fmshop') {
        return message.reply('El comando de la tienda es ;fshop');
    } else if (message.content === '!fnbr shop') {
        return message.reply('El comando de la tienda es ;fshop');
    } else if (message.content.includes(oldStats)) {
        return message.reply('El comando para los stats es ;ft USUARIO PLATAFORMA, si buscas la tienda es ;fshop');
    }
});

bot.login(auth.token)