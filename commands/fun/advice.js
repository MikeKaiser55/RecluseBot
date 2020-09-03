
const { Random } = require("something-random-on-discord")
const random = new Random();

module.exports = {
name: "advice",
category: "fun",
usage: "(prefix)advice",
description: "get fresh advice  D",
run: async (client, message, args) => {

let data = await random.getAdvice()
    message.channel.send(data)


}
}