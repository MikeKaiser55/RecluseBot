const Discord = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")

module.exports = {
  name: "snipe",
  aliases: ["ms", "messagesnipe"],
  category: "utility",
  usage: "(prefix)snipe",
  description: "get latest deleted message",
  run: async (client, message, args) => {
    if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply({ embed: { color: "0x000000", description: "**❌You dont have permissions to use this command!**" } });
    let prefix = await db.fetch(`prefix_${message.guild.id}`)
    if (prefix == null) {
      prefix = config.DEFAULT_PREFIX
    }
    const msg = client.snipes.get(message.channel.id)
    //checks if there are recently deleted messages
    if (!msg) return message.channel.send({ embed: { color: "0x000000", description: "**❌ There was no recently deleted message in this channel!**" } })
    //sends the recently deleted message
    const embed = new Discord.MessageEmbed()
      .setAuthor(msg.author)
      .setDescription(msg.content)
      .setColor(0x000000)
    if (msg.image) embed.setImage(msg.image)
    message.channel.send(embed)


  }
}