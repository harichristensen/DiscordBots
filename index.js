
const keepAlive = require("./server")
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES","GUILD_MEMBERS","DIRECT_MESSAGES"], partials: [
        'CHANNEL', // Required to receive DMs
    ]})
const token = process.env['REQUESTS_TOKEN']

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  messageLoop()
})

client.on("messageCreate", msg => {
  if (msg.content === "ping") {
    msg.reply("pong")
  }
})

client.on("messageCreate", msg => {
  if (!msg.author.bot){
    
      // options
      if (msg.content === "options") msg.author.send('We offer a number of packages including: \n:green_circle: Basic Package $5 for 1 advertisement :green_circle:\n:blue_circle: Epic Package $25 for 6 advertisements :blue_circle:\n:red_circle: Insane Package $50 for 15 advertisements :red_circle:\nIf you are interested in purchasing you can DM this bot with the name of the package you want \nFor example, if you want the basic package reply with "basic"\nOr reply with help to talk to a mod')

      // welcome msg test
      if (msg.content === "welcome") msg.author.send(`Hello ${msg.author.displayName}, welcome to Prism Official Advertising™! We offer a number of packages including: \n:green_circle: Basic Package $5 for 1 advertisement :green_circle:\n:blue_circle: Epic Package $25 for 6 advertisements :blue_circle:\n:red_circle: Insane Package $50 for 15 advertisements :red_circle:with the name of the package you want \nFor example, if you want the basic package reply with "basic"\nOr reply with help to talk to a mod`)
      
      // basic package
      if (msg.content.toLowerCase() === 'basic') msg.author.send("Send $5 to jackman@gmail.com on paypal")

      // epic package
      if (msg.content.toLowerCase() === 'epic') msg.author.send("Send $25 to jackman@gmail.com on paypal")

      // Insane package
      if (msg.content.toLowerCase() === 'insane') msg.author.send("Send $50 to jackman@gmail.com on paypal")

      // Need help
      if (msg.content.toLowerCase() === 'help') client.channels.cache.get(`928987939554332672`).send(`<@&938722157867991080> ${msg.author} needs help!!
      React to/delete this message if it taken care of.`)
})

function messageLoop () {
  var interval = setInterval (function() {
          client.channels.cache.forEach((channel) => {
            if(channel.type === 'GUILD_TEXT') channel.send('Want to advertise your server? Message "options" to AdBot for our different packages!').catch(console.error)
            })
        }, 7200 * 1000);
}

client.on("guildMemberAdd", member => {
  member.send(`Hello ${member.displayName}, welcome to Prism Official Advertising™! We offer a number of packages including: \n:green_circle: Basic Package $5 for 1 advertisement :green_circle:\n:blue_circle: Epic Package $25 for 6 advertisements :blue_circle:\n:red_circle: Insane Package $50 for 15 advertisements :red_circle:with the name of the package you want \nFor example, if you want the basic package reply with "basic"\nOr reply with help to talk to a mod`)
})

keepAlive()
client.login(token)

