const { MessageEmbed } = require('discord.js');

module.exports = {
    name:'unoreverse',
    category: 'fun',
    description: 'Uno Reverse Someone',
    usage: 'unoreverse',
    run: async(client, message, args) => {
        const cards = require("../../cards.json")

        const card = cards[Math.floor(Math.random() * cards.length)];

        message.channel.send(card);
    }
}