// inputting different files
const reactions = require('./reaction')
const command = require('./command')
const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const Database = require("@replit/database")
// defining client and database
const db = new Database()
const client = new Discord.Client()
// defining list of commands

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
keepAlive()
client.login(process.env.TOKEN)
