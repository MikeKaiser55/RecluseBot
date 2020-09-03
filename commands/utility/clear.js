const Discord = require('discord.js');
module.exports = {
    name: 'clear',
    category: "utility",
    aliases: ['purge', ''],
    description: 'bulkdeletes the messages',
    usage: 'clear <Number of msgs you want to clear>',
    run: async (client, message, args) => {
        //check if message author has the permission
        if (!message.member.hasPermission(["ADMINISTRATOR", "CHANNEL_MANAGE"])) return message.reply({ embed: { color: "0x000000", description: "**❌ You dont have permissions to use this command!**" } });
        if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.reply({ embed: { color: "0x000000", description: "**❌ Please specify the number of messages to clear | e.g. !clear 10**" } });//check if the user specified the amount messages properly
        const messages = await message.channel.messages.fetch({
            limit: Math.min(args[0], 100),
            before: message.id,
        });
        message.delete();
        await message.channel.bulkDelete(messages)//deltes the messages
            .then(deleted => message.channel.send({ embed: { color: "0x000000", description: `**✅ Succesfully deleted \`${deleted.size}\` messages!**` } }).then(m => m.delete({ timeout: 1500 })))//confrims that the messages have been deleted

    }
}