const db = require('quick.db');

module.exports = {
    name: "setprefix",
    description: "Set a server's prefix",
    category: "utility",
    usage: "setprefix <Any desired prefix u want>",
    run: async(client, message, args) => {
        //checks if the user has the permissions
        if(!message.member.hasPermission(["ADMINISTRATOR", "CHANNEL_MANAGE"])) return message.reply({embed: {color: "0x000000", description: "**❌ You dont have permissions to use this command!**"}});
        //checks if the user has provide a prefix
        if(!args[0]) return message.channel.send({embed: {color: "0x000000", description: `**❌ Please provide a new prefix!**`}});
        //checks if the prefix has spaces b/w it
        if(args[1]) return message.channel.send({embed: {color: "0x000000", description:'**❌The prefix can\'t have two spaces!**'}});
        //changes the prefix
        db.set(`Oprefix_${message.guild.id}`, args[0])
        //confirms that the prefix is changed
        message.channel.send({embed: {color: 0x000000, description:`✅ Succesffully set new prefix to **${args[0]}**`}})
    }
}