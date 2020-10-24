const botconfig = require('./src/botconfig.json');
const auth = require('./src/auth.json');
const Discord = require('discord.js');
const ReactionRole = require('reaction-role');
const fs = require('fs');
const cron = require('cron');
const { brotliCompress } = require('zlib');

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
    //if (message.author.bot) return;

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

//Twitea tienda de Fortnite en el reset
const job = new cron.CronJob('20 00 00 * * *', function() {
    const isChannel = bot.channels.cache.get('754959604089094245');
    isChannel.send('!fshop').then(message => message.delete({timeout : 1000}))
});
job.start();

//Añadir reacciones a mensaje de bienvenida
const system = new ReactionRole(auth.token);
let option1 = system.createOption("💹", "754772144512303114");
system.createMessage("760706392260345916", "754901391385952356", 1, null, option1);
system.init();


bot.login(auth.token)