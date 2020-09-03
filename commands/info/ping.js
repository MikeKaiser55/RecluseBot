const {MessageEmbed} = require('discord.js');
module.exports = {
    name:'ping',
    category: 'info',
    aliases: ['ding', 'test'],
    description: 'returns latency',
    usage: 'ping',
    run: async(client, message, args) => {
       const emo = client.emojis.cache.find(emoji => emoji.name === 'shyweibo');
        message.channel.send(`I hope you dont kill me${emo}`).then((msg) => {
        const embed = new MessageEmbed()
        .setTitle("Your & Api's Ping")
        .setDescription(
          `**Your Ping:** ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms \n**Bot's Ping:** ${Math.round(client.ws.ping)}ms`)
        .setColor("0x000000")
        msg.edit(embed);
        })
    }
}