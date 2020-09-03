const { MessageEmbed } = require("discord.js");
const { ownerId } = require("../../config.json");
const util = require("util");

module.exports = {
    name:'eval',
    category: 'owner',
    aliases: [''],
    description: 'Eval',
    run: async(client, message, args) => {
        if (message.author.id !== ownerId)
      return message.reply("Only the owner is allowed to run this command");

    const toEval = args.join(" ");
    if (!toEval) return message.channel.send("Please provide text");

    try {
      const evaluated = util.inspect(eval(toEval, { depth: 0 }));

      const embed = new MessageEmbed()
        .setTitle("Eval Command")
        .addField("**Input:**", `\`\`\`${toEval}\`\`\``)
        .addField("**Output:**", ` \`\`\`${evaluated}\`\`\``)
        .setColor("0x000000")
        .setTimestamp()
        .setFooter(message.author.username);

      message.channel.send(embed);
    } catch (e) {
      return message.channel.send(`Something went wrong!  \`\`\`${e}\`\`\`  `);
    }
    }
}