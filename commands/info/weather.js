const weather = require('weather-js');
const discord = require('discord.js')




//TIME TO END STREAM
module.exports = {
  name: "weather",
  description: "Get the weather of anywhere",
  category: "info",
  usage: "weather <city>",
  run: (client, message, args) => {
    
    
    if(!args.length) {
      return message.channel.send({embed:{color: "0x000000",description:"**❌ Please give the weather location**"}})
    }
    
 weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
try {
 
let embed = new discord.MessageEmbed()
.setTitle(`Weather - ${result[0].location.name}`)
.setColor("0x000000")
.setDescription("Temperature units can may be differ some time")
.addField("Temperature", `${result[0].current.temperature} Celcius`, true)
.addField("Sky Text", result[0].current.skytext, true)
.addField("Humidity", `${result[0].current.humidity}%`, true)
.addField("Wind Speed", result[0].current.windspeed, true)//What about image
.addField("Observation Time", result[0].current.observationtime, true)
.addField("Wind Display", result[0].current.winddisplay, true)
.setThumbnail(result[0].current.imageUrl);
   message.channel.send(embed)
} catch(err) {
  return message.channel.send({embed:{color: "0x000000",description:"**❌ Unable To Get the data of Given location**"}})
}
});   
    //LETS CHECK OUT PKG
    
  }
}