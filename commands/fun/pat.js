const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");


module.exports = {
    name: "pat",
    category: "fun",
    description: "kisses anyone you mention",
    usage: "pat/pat <@user>",
    run: async (client, message, args) => {
        const data = await fetch("https://nekos.life/api/v2/img/pat").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const patted = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
    .setTitle(`${message.author.username} pats ${message.mentions.users.first().username || message.mentions.members.first()}`)
      .setFooter(message.author.username)
      .setColor("0x000000")
      .setTitle(`${message.author.username} Patted ${patted}`)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send({ embed });

    }
}