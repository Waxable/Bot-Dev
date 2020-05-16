const {Client, RichEmbed } = require('discord.js')

const bot = new Client()

const ping = require('minecraft-server-util')

const token = 'NzExMTc1MTgzNTM2NDg4NDQ5.XsAoeA.uAQKifSjGPSd-a87qNs6tf3NrmQ'

const PREFIX = '!'
const activities_list = [
      `Crée Par Waxable`,
      `Surveille ShrinkCube`,
      `En Développement`,
      ];
      //jeux
    setInterval(function() {
      const index = Math.floor(Math.random() * (activities_list.length - 1));
      bot.user.setPresence({game:{name: `${activities_list[index]}`,type:`STREAMING`,url:"https://www.twitch.tv/ShrinkCube"}});
      bot.user.setStatus('dnd')
    }, 5000)
	
bot.on('ready', () =>{
    console.log('Bot Fonctionelle!.')
})

bot.on('message', message =>{

    let args = message.content.substring(PREFIX.length).split(' ')

    switch(args[0]){
        case 'info':

            if(!args[1]) return message.channel.send('You must type a minecraft server ip')
            if(!args[2]) return message.channel.send('You must type a minecraft server port')

            ping(args[1], parseInt(args[2]), (error, reponse) =>{
                if(error) throw error
                const Embed = new RichEmbed()
                .setTitle('Server Status')
                .addField('Server IP', reponse.host)
                .addField('Server Version', reponse.version)
                .addField('Joueur En Ligne', reponse.onlinePlayers)
                .addField('Joueur Max', reponse.maxPlayers)
                
                message.channel.send(Embed)
            })
        break

    }
	
	 if(message.content.startsWith(`${PREFIX}say`)) {
    var text = message.content.split(' ').slice(1).join(' ')
    if(!text) return message.reply('Please give me some text to say! :)')
   message.channel.send(text)
   message.delete();
  }

//toujour a la fin rien en dessous apars le login
})

bot.login(token)
