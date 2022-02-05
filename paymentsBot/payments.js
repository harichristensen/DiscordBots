const secondKeepAlive = require("../secondServer"); // import keepAlive from server.js
const Discord = require("discord.js"); // import discord
const controller = require('./paymentsController');
const token = process.env['PAYMENTS_TOKEN']
class payments {
    constructor () {
      this.client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES","GUILD_MEMBERS","DIRECT_MESSAGES"], partials: [
            'CHANNEL', // Required to receive DMs
        ]});
      this.bot()
    }
    bot() {
      
      // When bot is ready
      this.client.on("ready", () => {
        console.log(`Logged in as ${this.client.user.tag}!`)
      })

      // What to do if someone sends a message
      // @param msg the message that was sent
      this.client.on("messageCreate", msg => {
        if (msg.content === "ping") {
          msg.reply("pong")
        }
      })

      // What to do if someone sends a message
      // @param msg the message that was sent
      this.client.on("messageCreate", msg => {
        if (msg.content === "basic") {
          this.control = new controller(msg)
          this.payment = this.control.createPaypalPayment(msg, "help", 10, "USD")
          msg.reply(thiscontrol.getPaypalSuccess())
        }
      })


      secondKeepAlive() // makes bot stay up
      this.client.login(token) // log in to bot account
}
} 


module.exports = payments