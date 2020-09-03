const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../functions");
module.exports = {
  name: "avatar",
  description: "Get your own or someone else's avatar",
  aliases: ['av'],
  usage: "[user mention]",
  category: "info",
  run: async (bot, message, args) => {
    let user = message.mentions.users.first() || message.author
        const embed = new MessageEmbed()
        .setTitle(`${user.username}'s avatar`)
        .setColor('0x000000')
        .setImage(user.displayAvatarURL({ dynamic: true, format: 'png', size: 2048}))
        message.channel.send(embed)
  },
};