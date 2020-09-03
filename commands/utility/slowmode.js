module.exports = {
  name: "slowmode",
  category: "utility",
  description: "Lets you set slowmode on the channel.",
  args: true,
  aliases: ['sm'],
  usage: "sm <time>",
  run: (client, message, args) => {
      const amount = parseInt(args[0])
      if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply({embed: {color: "0x000000", description: "**❌ You dont have permissions to use this command!**"}})
      if(isNaN(amount)) return message.channel.send({embed: {color: "0x000000", description: "**❌ It doesn\'t seem to be a valid number!**"}})
      if(args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount)
      if(amount > 1) {
      message.channel.send({embed: {color: "0x000000", description: "**✅ Slowmode is now " + amount + " seconds**"}})

      return
      }
      else {message.channel.send({embed: {color: "0x000000", description: "**✅ Slowmode is now " + amount + " second**"}})
      return }
  } if(args[0] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60)
      if(amount > 1) {
      message.channel.send({embed: {color: "0x000000", description: "**✅ Slowmode is now " + amount + " minutes**"}})
      return
      } else { 
          message.channel.send({embed: {color: "0x000000", description: "**✅ Slowmode is now " + amount + " minute**"}})
           
  
  return }
  } if(args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60)
      if(amount > 1) {
      message.channel.send({embed: {color: "0x000000", description: "**✅ Slowmode is now " + amount + " hours**"}})
      return
      } else {
          message.channel.send({embed: {color: "0x000000", description: "**✅ Slowmode is now " + amount + " hour**"}})
      return}
  } else {
      message.channel.send({embed: {color: "✅ 0x000000", description: "**❌ You can only set the time in s, min and h | e.g. 10s,10min,1h**"}})
  }

  }
}