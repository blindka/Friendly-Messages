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
db.get("commands").then(value => {
  if(value == "commands") {
    db.set("commands",true)
  } 
})
db.get("mine").then(value => {
  if(value == "mine"){
    db.set("mine",true)
  }
})
function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  reactions(client, '707283619336421407', 'hello world',['🔥'])
  command(client, 'embed', (message) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Welcome to the helper menu:')
    .setColor('#2C41F5')
    .addField({
      name: '!inspire',
      value: 'Gives inspiring Quote',
      inline: true,
    },
    {
      name: '!mine',
      value: 'Mining doge coins',
      inline: true,
    },
    {
      name: '!responding',
      value: 'Changes the bot response on/off',
      inline: true,
    })
    message.channel.send(embed)
  })
})

client.on("message", msg => {
  if (msg.author.bot) return

  if (msg.content === "inspire me") {
    getQuote().then(quote => msg.channel.send(quote))
  }
  if(msg.content.startsWith("!mine")){
    const mining = Math.floor(Math.random() * 10000) + 1;
    msg.channel.send("You went mining and got ",mining)
  }
})
keepAlive()
client.login(process.env.TOKEN)
