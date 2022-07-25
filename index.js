const Discord = require('discord.js');
const PokeInter = require('./poke/pokeBattleInter.js');


//console.log(sqlite3)

const client = new Discord.Client();

//sqlite3.connect('hello.db')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.content === '야'){
        //msg.reply('호!');
        msg.channel.send("호")
    }

    if(msg.content === '!battle'){
        
    }

    

})

client.login('MTAwMTA4NTY3Mjg1MTAwMTM2NA.GKvUtM.n8MURVBau98_JLH1KODtoYbbThLm1czVL_lMQY');