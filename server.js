const express = require("express") // import express

const server = express() // start express

// let server know bot is running
server.all("/", (req, res) => {
  res.send("Bot is running!")
})

// make bot stay alive
function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready.")
  })
}

module.exports = keepAlive // export function