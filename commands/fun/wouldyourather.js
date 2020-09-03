const { MessageEmbed } = require("discord.js");

module.exports = {
    name:'wouldyourather',
    category: 'fun',
    aliases: ['wyr'],
    description: 'Would You Rather?',
    usage: '(prefix)wyr',
    run: async(client, message, args) => {
        const replies = require("../../wouldYouRather.json");

        const reply = replies[Math.floor(Math.random() * replies.length)];

        const embed = new MessageEmbed()
            .setTitle("Would you rather?")
            .setColor("0x000000")
            .setDescription(`**${reply}**`)
            .setFooter(message.author.username);

        message.channel.send(embed);
    }
}