const express = require("express") // import express

const server = express() // start express

// let server know bot is running
server.all("/", (req, res) => {
  res.send("Bot is running!")
})

// make bot stay alive
function secondKeepAlive() {
  server.listen(2999, () => {
    console.log("Server is ready.")
  })
}

module.exports = secondKeepAlive // export function