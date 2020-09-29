const Discord = require('discord.js')
const { Client, Collection, MessageEmbed } = require('discord.js');
const { token, prefix } = require('./config.json');
const client = new Client({ disableEveryone: true });
const db = require('quick.db');
const youtubeapi = 'AIzaSyBOtkioN-WQypvySrqX7kkQWx8CQSdrLbo';
const YouTube = require('simple-youtube-api');
const Util = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const youtube = new YouTube(youtubeapi);
const queue = new Map();
const fetch = require('node-fetch')
const querystring = require('querystring')
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
//status
client.on('ready', () => {
  console.log("im here for you senpai!")
  client.user.setActivity('>help', { type: 'PLAYING' }).catch(console.error);
})
//command handler and custom prefix
client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args)
});
//mute and unmute
client.on('message', async (message) => {
  var target = message.mentions.members.first();

  if (db.get(`mute_${message.author.id}_${message.guild.id}`) == true) {
    return message.delete();
  }
  if (message.author.bot) return;
  if (message.content.startsWith(`${prefix}mute`)) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply({ embed: { color: "0x000000", description: `**❌ You dont have permissions to use this command!**` } })
    }
    if (!target) {
      return message.reply({ embed: { color: "0x000000", description: `**❌ Please mention a user!**` } })
    }
    if (target.user.id == message.author.id) {
      return message.reply({ embed: { color: "0x000000", description: `**❌ You can not mute yourself(idiot)!**` } })
    }
    db.set(`mute_${target.user.id}_${message.guild.id}`, true)
    return message.channel.send({ embed: { color: "0x000000", description: `**✅ Sucessfully muted <@${target.user.id}>!**` } })
  }
  if (message.content.startsWith(`${prefix}unmute`)) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply({ embed: { color: "0x000000", description: `**❌ You dont have permissions to use this command!**` } })
    }
    if (!target) {
      return message.reply({ embed: { color: "0x000000", description: `**❌ Please mention a user!**` } })
    }
    if (target.user.id == message.author.id) {
      return message.reply({ embed: { color: "0x000000", description: `**❌ You can not unmute yourself(idiot)!**` } })
    }
    db.set(`mute_${target.user.id}_${message.guild.id}`, true)
    return message.channel.send({ embed: { color: "0x000000", description: `**✅ Sucessfully unmuted <@${target.user.id}>!**` } })
  }
})
//music
client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.substring(prefix.length).split(" ")
  const searchString = args.slice(1).join(' ') 
  const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : ''
  const serverQueue = queue.get(message.guild.id)
  if (message.content.startsWith(`${prefix}play`)) {
      const voiceChannel = message.member.voice.channel
      if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music!")
      const permissions = voiceChannel.permissionsFor(message.client.user)
      if (!permissions.has('CONNECT')) return message.channel.send("I don\'t have permissions to connect to the voice channel")
      if (!permissions.has('SPEAK')) return message.channel.send("I don\'t have permissions to speak in the voice channel")

      try {
          var video = await youtube.getVideoByID(url)
      } catch {
          try {
              var videos = await youtube.searchVideos(searchString, 1)
              var video = await youtube.getVideoByID(videos[0].id)
          }catch{
              return message.channel.send('I couldn\'t find any search results')
          }
      }
      const song = {
          id: video.id,
          title: Util.escapeMarkdown(video.title),
          url: `https://www.youtube.com/watch?v=${video.id}`
      }

      if (!serverQueue) {
          const queueConstruct = {
              textChannel: message.channel,
              voiceChannel: voiceChannel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true
          }
          queue.set(message.guild.id, queueConstruct)

          queueConstruct.songs.push(song)

          try {
              var connection = await voiceChannel.join()
              queueConstruct.connection = connection
              play(message.guild, queueConstruct.songs[0])
          } catch (error) {
              console.log(`There was an error!: ${error}`)
              queue.delete(message.guild.id)
              return message.channel.send(`There was an error connecting to the voice channel: ${error}`)
          }

      } else {
          serverQueue.songs.push(song)
          return message.channel.send(`**${song.title}** has been added to the queue!`)
      }
      return undefined

  } else if (message.content.startsWith(`${prefix}stop`)) {
      if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channnel to stop the music!")
      if (!serverQueue) return message.channel.send("There is nothing playing")
      serverQueue.songs = []
      serverQueue.connection.dispatcher.end()
      message.channel.send("I have stopped the music for you!")
      return undefined
  } else if (message.content.startsWith(`${prefix}skip`)) {
      if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to skip the music!")
      if (!serverQueue) return message.channel.send("There is nothing playing!")
      serverQueue.connection.dispatcher.end()
      message.channel.send("I have skipped the music for you")
      return undefined
  } else if (message.content.startsWith(`${prefix}volume`)) {
      if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use music commands!")
      if (!serverQueue) return message.channel.send("There is nothing playing!")
      if (!args[1]) return message.channel.send(`That volume is **${serverQueue.volume}**`)
      if (isNaN(args[1])) return message.channel.send("That is not a valid amount to change the volume!")
      serverQueue = args[1]
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
      message.channel.send(`I have changed the volume to **${args[1]}**`)
      return undefined
  } else if (message.content.startsWith(`${prefix}np`)) {
      if (!serverQueue) return message.channel.send("There is nothing playing!")
      message.channel.send(`Now Playing **${serverQueue.songs[1].title}**`)
      return undefined
  } else if (message.content.startsWith(`${prefix}queue`)) {
      if (!serverQueue) return message.channel.send("There is nothing playing!")
      message.channel.send(`
__**Song Queue:**__
${serverQueue.songs.map(song => `**-**${song.title}`).join('\n')}

**Now Playing** ${serverQueue.songs[0].title}
      `, { split: true })
      return undefined
  } else if (message.content.startsWith(`${prefix}pause`)) {
      if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use the pause commands!")
      if (!serverQueue) return message.channel.send("There is nothing playing!")
      if (!serverQueue.playing) return message.channel.send("The music is already paused!")
      serverQueue.playing = false
      serverQueue.connection.dispatcher.pause()
      message.channel.send("I have now paused the music for you!")
      return undefined
  } else if (message.content.startsWith(`${prefix}resume`)) {
      if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use the resume commands!")
      if (!serverQueue) return message.channel.send("There is nothing playing!")
      if (serverQueue.playing) return message.channel.send("The music is already playing")
      serverQueue.playing = true
      serverQueue.connection.dispatcher.resume()
      message.channel.send("I have now resumed the music for you!")
      return undefined
  }
});

function play(guild, song) {
  const serverQueue = queue.get(guild.id)

  if (!song) {
      serverQueue.voiceChannel.leave()
      queue.delete(guild.id)
      return
  }

  const dispatcher = serverQueue.connection.play(ytdl(song.url))
      .on('finish', () => {
          serverQueue.songs.shift()
          play(guild, serverQueue.songs[0])
      })
      .on('error', error => {
          console.log(error)
      })
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)

  serverQueue.textChannel.send({embed: {color: "0x000000", description: `Now Playing: **${song.title}**`}})
}

//snipe
client.snipes = new Map()
client.on('messageDelete', function (message, channel) {

  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })

})
client.login(process.env.token);