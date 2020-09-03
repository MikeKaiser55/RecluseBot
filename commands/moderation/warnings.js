const db = require("quick.db")

module.exports = {
  name: "warnings",
  description: "Get the warnings of yours or mentioned person",
  category: "moderation",
  aliases: ["warns"],
  usage: "wars <@user>",
  run: (client, message, args) => {
    const user = message.mentions.members.first() || message.author
    
    //fetches the warnings
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
    //send the warnings of a mentioned user
    message.channel.send({embed: {color: "0x000000",description:`${user} have **${warnings}** warning(s)`}})
  
  
  }
}