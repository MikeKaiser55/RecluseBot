const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");


module.exports = {
    name: "hug",
    category: "fun",
    description: "hugs anyone you mention",
    usage: "hug/hug <@user>",
    run: async (client, message, args) => {
        const data = await fetch("https://nekos.life/api/hug").then(res => res.json());

        const embed = new MessageEmbed()
            .setTitle(`${message.author.username} hugs ${message.mentions.users.first().username || message.mentions.members.first()}`)
            .setFooter(message.author.username)
            .setColor("0x000000")
            .setDescription(`[Click here if the image failed to load.](${data.url})`)
            .setImage(`${data.url}`)
            .setTimestamp();

        message.channel.send(embed);
    }
}