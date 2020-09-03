  
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    //checks if the user has perms
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send({ embed: { color: "0x000000", description: "**❌You dont have permissions to use this command!**" } });
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      //checks if the user has mentioned
      return message.channel.send({embed: {color: "0x000000", description:"**❌ Please Mention the person to who you want to warn - warn @mention <reaosn>**"}})
    }
    
    if(message.mentions.users.first().bot) {
      //checks if the user is trying to warn a bot
      return message.channel.send({embed: {color: "0x000000", description:"**❌ You can not warn bots!**"}})
    }
    
    if(message.author.id === user.id) {
      //checks if the user is trying to warn himself
      return message.channel.send({embed: {color: "0x000000", description:"**❌ You can not warn yourself!**"}})
    }
    
    if(user.id === message.guild.owner.id) {
      //checks if the user has warned the owmer of the guild
      return message.channel.send({embed: {color:"0x000000", description:"**❌ You jerk, how you can warn server owner -_-**"}})
    }
    
    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      //checks if the user has provide a reason
      return message.channel.send({embed:{color: "0x000000",description:"**❌ Please provide reason to warn - warn @mention <reason>**"}})
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === 6) {
      //checks if the person has already max warnings
      return message.channel.send({embed:{color:"0x000000",description:`**${message.mentions.users.first().username}** already reached his/her limit with 3 warnings`}})
    }
    
    if(warnings === null) {
      //sends the warned user !
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      user.send({embed: {color: "0x000000",description:`You have been warned in **${message.guild.name}** for ${reason}`}})
      await message.channel.send({embed: {color: "0x000000",description:`You warned **${message.mentions.users.first().username}** for ${reason}`}})
    } else if(warnings !== null) {
      //sends the warned a user!
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send({embed: {color: "0x000000",description:`You have been warned in **${message.guild.name}** for ${reason}`}})
      await message.channel.send({embed: {color: "0x000000",description:`You warned **${message.mentions.users.first().username}** for ${reason}`}})
    }
    
  
  } 
}