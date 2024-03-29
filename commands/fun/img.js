const img = require('images-scraper')
const Discord = require('discord.js')
const google = new img({
    puppeteer : {
        headless : true,
    }
})
module.exports = {
    name: "img",
    aliases: ['image'],
    description: "Shows you the image you desire!",
    async run(client, message, args) {
        const query = args.join(" ")
        if (!query) return message.channel.send('Please enter a search query')
 
        var random = Math.floor((Math.random() * 90) + 0);
        console.log(random)
        const results = await google.scrape(query, 100)
        const hasil = results[random].url
        let embedpic = new Discord.MessageEmbed()
            .setTitle("There you Go!")
            .setImage(hasil)
        message.channel.send(embedpic)
    }
}