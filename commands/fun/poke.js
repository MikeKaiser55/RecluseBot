const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name:'poke',
    category: 'fun',
    description: 'Poke Somebody',
    usage: "poke/poke <@user>",
    run: async(client, message, args) => {
        const data = await fetch("https://nekos.life/api/v2/img/poke").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const poked = message.author.id === user.id ? "themselfs" : user.username;

    const embed = new MessageEmbed()
    
      .setFooter(message.author.username)
      .setColor("0x000000")
      .setTitle(`${message.author.username} poked ${poked}`)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send({ embed });
    }
}