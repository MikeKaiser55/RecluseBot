const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "lock",
    category: "utility",
    description: "Completely lock/unlock a server",
    usage: "lock <on/off>",
    run: async (client, message, args) => {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');                                                        //checks if the user has the permissions
        if(!message.member.hasPermission(["ADMINISTRATOR", "CHANNEL_MANAGE"])) return message.reply({embed: {color: "0x000000", description: "**❌ You dont have permissions to use this command!**"}});
        if(!args[0]) return message.reply({embed: {color: "0x000000", description: `**❌ Please specify! | e.g. lock on/off**`}})//checks if the user has specified 

        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)//adds an emoji to conifrm that the channel is locked
                })
            })
            return message.channel.send({embed: {color: "0x000000", description: "**🔒 Locked all channels!**"}});
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))//removes the emoji to confirm that the channel is unlocked
                    }
                )
            })
            return message.channel.send({embed: {color: "0x000000", description: "**🔓 Unlocked all channels!**"}})
        }
    }
}