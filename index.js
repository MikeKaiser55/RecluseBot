const Discord = require('discord.js')
const { Client, Collection, MessageEmbed } = require('discord.js');
const { token, prefix } = require('./config.json');
const client = new Client({ disableEveryone: true });
const db = require('quick.db');
const fs = require('fs');
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
  client.user.setActivity('r!help', { type: 'PLAYING' }).catch(console.error);
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