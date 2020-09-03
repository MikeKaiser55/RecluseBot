const { MessageEmbed } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: 'trash',
    category: 'fun',
    description: "Trash someone",
    usage: "trash/trash <@user>",
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let response, data;
        try {
            response = await axios.get(`https://api.no-api-key.com/api/v1/trash?image=${user.user.displayAvatarURL({format: 'png'})}`)
            data = await response.data
        } catch (e) {
            return console.log(e)
        }
        const embed = new MessageEmbed()
            .setTitle('Ur trash bro')
            .setColor(0x000000)
            .setImage(data.url)
        await message.channel.send(embed)
    }
}