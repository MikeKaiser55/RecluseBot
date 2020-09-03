const { MessageEmbed } = require("discord.js");
const answers = require("../../8ball.json");

module.exports = {
    name:'8ball',
    category: 'fun',
    usage: '8ball <Your Question>',
    description: '8ball',
    run: async(client, message, args) => {
        const question = args.join(" ");

        if (!question) return message.channel.send({embed: {color: "0x000000", description: `**❌ Pls provide a valid question text**`}});

        const answer = answers[Math.floor(Math.random() * answers.length)];

        const embed = new MessageEmbed()
            .setTitle("8Ball")
            .addField("Question:", question)
            .addField("Answer:", answer)
            .setColor("0x000000")
            .setFooter(message.author.username)
            .setTimestamp();

        message.channel.send(embed);
    }
}