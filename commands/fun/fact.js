const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: 'fact',
    category: "fun",
    description: "Returns a random fact",
    usage: "(prefix)fact",
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let response, data;
        try {
            response = await axios.get(`https://no-api-key.com/api/v1/facts`)
            data = await response.data
        } catch (e) {
            return console.log(e)
        }
        const embed = new MessageEmbed()
            .setTitle('Random Fact:')
            .setColor(0x000000)
            .setDescription(data.fact)
        await message.channel.send(embed)
    }
}