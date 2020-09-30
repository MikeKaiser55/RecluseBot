const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');
const db = require('quick.db');
module.exports = {
    name: "help",
    aliases: ["h","cmds"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async (client, message, args) => { 
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } 
        const emo = client.emojis.cache.find(emoji => emoji.name === 'bruh');
        const embed = new MessageEmbed()
        .setTitle('Recluse Command List')
        .setDescription(`This server\'s prefix is **${prefix}** \n To get help on a specific command: **${prefix}help  <command name>** \n Recluse Support Server: https://discord.gg/65jpkBz \n Wanna add Recluse to your server? [Click Here!](https://discord.com/oauth2/authorize?client_id=746318348677152778&permissions=8&scope=bot)`)
        .setThumbnail('https://media2.giphy.com/media/401pPJe8AtsC55e1y8/giphy.gif')
        .setColor(0x000000)
        .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL())
        .addFields(
            {
                name: `${emo} Moderation[7]`,
                value: '`ban`,`kick`,`mute`,`resetwarns`,`unmute`,`warn`,`warnings`.',
                inline: false
            },
            {
                name: `${emo} Utility[5]`,
                value: '`calculate`,`clear`,`lock(on/off)`,`slowmode`, \n `snipe`.',
                inline: false
            },
            {
                name: `${emo} Fun[17]`,
                value: '`8ball`,`advice`,`ascii`,`changemymind`,`fact`,`hug`,`joke`,`kiss`, \n `meme`,`pat`,`poke`,`slap`,`smug`,`trash`,`tweet`,`unoreverse`, \n `wouldyourather`.',
                inline: false
            },
            {
                name: `${emo} Information[11]`,
                value: '`avatar`,`botinfo`,`covid`,`help`,`oldest`,`ping`,`serverinfo`, \n `uptime`,`userinfo`,`weather`,`youngest`.',
                inline: false
            },
            {
                name: `${emo} Music[6]`,
                value: '`play`,`stop`,`skip`,`pause`,`resume`,`queue`,`np`.',
                inline: false
            },
            {
                name: `${emo} Owner[5]`,
                value: '`Bot owner only`.',
                inline: false
            },
            )
            message.channel.send(embed)
            function getCMD(client, message, input) {
                const embed = new MessageEmbed();
            
                const cmd =
                    client.commands.get(input.toLowerCase()) ||
                    client.commands.get(client.aliases.get(input.toLowerCase()));
            
                let info = `No information found for command **${input.toLowerCase()}**`;
            
                if (!cmd) {
                    return message.channel.send(embed.setColor('0x000000').setAuthor(`${message.author.username}, Requested Commands:` , message.author.displayAvatarURL()).setFooter(message.author.username, message.author.displayAvatarURL()).setDescription(info).setThumbnail(client.user.displayAvatarURL()));
                }
            
                if (cmd.name) info = `**Command name**: ${cmd.name}`;
                if (cmd.aliases)
                    info += `\n**Aliases**: ${cmd.aliases.map((a) => `\`${a}\``).join(", ")}`;
                if (cmd.description) info += `\n**Description**: ${cmd.description}`;
                if (cmd.usage) {
                    info += `\n**Usage**: ${cmd.usage}`;
                    embed.setFooter(`Syntax: <> = required, [] = optional`);
                }
                if (cmd.timeout) info += "\n**Timeout**: " + ms(cmd.timeout);
                return message.channel.send(embed.setColor('0x000000').setAuthor(`Requested By:${message.author.username}` , message.author.displayAvatarURL()).setDescription(info).setThumbnail(client.user.displayAvatarURL()));
            }
    }
}