
require("moment-duration-format");
const moment = require("moment");

module.exports = {
    name:'uptime',
    category: 'info',
    description: 'Returns the uptime of the bot',
    usage: 'uptime',
    run: async(bot, message, args) => {
        const uptime = moment
            .duration(bot.uptime)
            .format(" D [days], H [hrs], m [mins], s [secs]");

        return message.channel.send({embed:{color: "0x000000", description:`${bot.user.username} has been up for **${uptime}**`}});
    }
}