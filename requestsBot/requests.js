function requests () {
const payments = require("../paymentsBot/payments")
const keepAlive = require("../server") // import keepAlive from server.js
const Discord = require("discord.js") // import discord
// Create discord bot instance and set intents
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES","GUILD_MEMBERS","DIRECT_MESSAGES"], partials: [
        'CHANNEL', // Required to receive DMs
    ]})

// get token from secrets
const token = process.env['REQUESTS_TOKEN']

// When bot is ready
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  messageLoop() // start message loop
})

// What to do if someone sends a message
// @param msg the message that was sent
client.on("messageCreate", msg => {
  if (msg.content === "ping") {
    msg.reply("pong")
  }
})


// What to do if someone sends a message
// @param msg the message that was sent
client.on("messageCreate", msg => {
  if (!msg.author.bot){
    
      // options
      if (msg.content === "options") msg.author.send('We offer a number of packages including: \n:green_circle: Basic Package $5 for 1 advertisement :green_circle:\n:blue_circle: Epic Package $25 for 6 advertisements :blue_circle:\n:red_circle: Insane Package $50 for 15 advertisements :red_circle:\nIf you are interested in purchasing you can DM this bot with the name of the package you want \nFor example, if you want the basic package reply with "basic"\nOr reply with help to talk to a mod')

      // welcome msg test
      if (msg.content === "welcome") msg.author.send(`Hello ${msg.author.displayName}, welcome to Prism Official Advertisingâ„˘! We offer a number of packages including: \n:green_circle: Basic Package $5 for 1 advertisement :green_circle:\n:blue_circle: Epic Package $25 for 6 advertisements :blue_circle:\n:red_circle: Insane Package $50 for 15 advertisements :red_circle:with the name of the package you want \nFor example, if you want the basic package reply with "basic"\nOr reply with help to talk to a mod`)
      
      // basic package
      if (msg.content.toLowerCase() === 'basic') msg.author.send("Send $5 to jackman@gmail.com on paypal")

      // epic package
      if (msg.content.toLowerCase() === 'epic') msg.author.send("Send $25 to jackman@gmail.com on paypal")

      // Insane package
      if (msg.content.toLowerCase() === 'insane') msg.author.send("Send $50 to jackman@gmail.com on paypal")

      // Need help
      if (msg.content.toLowerCase() === 'help') client.channels.cache.get(`928987939554332672`).send(`<@&938722157867991080> ${msg.author} needs help!!
      React to/delete this message if it taken care of.`)
      // payment
      if (msg.content.toLowerCase() === 'payment') {
        msg.author.send("Starting payment")
        new payments()
      }
  }
})
function sendMessage(msg, val) {
  msg.author.send(val);
}
// Loop to send intervalled message to all channels in the server
function messageLoop () {
  var interval = setInterval (function() {
          client.channels.cache.forEach((channel) => {
            // Makes sure only sends to server channels
            if(channel.type === 'GUILD_TEXT') channel.send('Want to advertise your server? Message "options" to AdBot for our different packages!').catch(console.error)
            })
        }, 2999 * 1000);  // every 49 minutes
}

// When someone joins the server
client.on("guildMemberAdd", member => {
  member.send(`Hello ${member.displayName}, welcome to Prism Official Advertisingâ„˘! We offer a number of packages including: \n:green_circle: Basic Package $5 for 1 advertisement :green_circle:\n:blue_circle: Epic Package $25 for 6 advertisements :blue_circle:\n:red_circle: Insane Package $50 for 15 advertisements :red_circle:with the name of the package you want \nFor example, if you want the basic package reply with "basic"\nOr reply with help to talk to a mod`)
})

keepAlive() // makes bot stay up
client.login(token) // log in to bot account

} 
module.exports = requests // export function