const Discord = require("discord.js");
const owners = ["493776261026545674"];
const EmbedColor = `RANDOM`;
const Users_Guilds = ["${guilds}", "${users}"]; //Please Don't Change Postion Example: Gulds In 2nd Place | It Won't Work If You Do It!

module.exports = {
  name: "setactivity",
  aliases: [],
  description: "Set The Bot Activity!",
  usage: "setactivity <Type> <Text>",
  category: "owner",
  run: async (client, message, args) => {
    if (owners.length === 0)
      return message.author.send(`Owner ID Is Not Setted!`);

    if (owners[0] === "Owner ID!")
      return message.author.send(`Owner ID Is Not Setted!`);

    if (!owners.includes(message.author.id))
      return message.channel.send(`Only Owner(s) Can Use This Command!`);

    if (!args[0]) {
      return message.channel.send("Please Give Me Activity Type!");
    }

    let Activitys = ["playing", "watching", "listening", "streaming"];

    if (!Activitys.includes(args[0].toLowerCase()))
      return message.channel.send(
        `Invalid Activity Type! Types : Playing , Watching , Listening , Streaming`
      );

    if (args[0].toLowerCase() === "streaming")
      return message.channel.send(`Streaming Is Currently Not Available!`);

    if (!args[1])
      return message.channel.send(
        `Please Give Me Text Of Activity! Example : Listening To Spotify`
      );

    let typ = args[0].toLowerCase();

    let type = typ.toUpperCase();

    let Text = args.slice(1).join(" ");

    Text = Text.replace(Users_Guilds[0], client.guilds.cache.size).replace(
      Users_Guilds[1],
      client.users.cache.size
    );

    try {
      client.user.setActivity(`${Text}`, { type: type });
      let embed = new Discord.MessageEmbed()
        .setColor(0x000000)
        .setTitle(`Done!`)
        .setDescription(`Bot Activity Has Been Setted Successfully!`)
        .setFooter(`Setted By ${message.author.username}`)
        .setTimestamp();
      message.channel.send(embed);
    } catch (error) {
      return message.channel
        .send(`Failed To Change My Activity!`)
        .then(() => console.log(error));
    }
  }
};