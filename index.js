const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const Database = require("@replit/database")

const db = new Database()
const client = new Discord.Client()

const helper = ["pls help", "help", "!help"]

const starterEncouragements = ["Please type in chat the word: commands"]

db.get("encouragements").then(encouragements => {
  if (!encouragements || encouragements.length < 1) {
    db.set("encouragements", starterEncouragements)
  }
})

db.get("responding").then(value => {
  if (value == null) {
    db.set("responding", true)
  }
})

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
function updateEncouragements(encouragingMessage) {
  db.get("encouragements").then(encouragements => {
    encouragements.push([encouragingMessage])
    db.set("encouragements", encouragements)
  })
}

function deleteEncouragement(index) {
  db.get("encouragements").then(encouragements => {
    if (encouragements.length > index) {
      encouragements.splice(index, 1)
      db.set("encouragements", encouragements)
    }
  })  
}

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
})

client.on("message", msg => {
  if (msg.author.bot) return

  if (msg.content === "inspire me") {
    getQuote().then(quote => msg.channel.send(quote))
  }

  db.get("responding").then(responding =>{
    if (responding && helper.some(word => msg.content.includes(word))) {
      db.get("encouragements").then(encouragements => {
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        msg.reply(starterEncouragements)
      })
    }
  })

  if (msg.content.startsWith("$new")) {
    encouragingMessage = msg.content.split("$new ")[1]
    updateEncouragements(encouragingMessage)
    msg.channel.send("New encouraging message added.")
  }

  if (msg.content.startsWith("$del")) {
    index = parseInt(msg.content.split("$del ")[1])
    deleteEncouragement(index)
    msg.channel.send("Encouraging message deleted.")
  }

  if (msg.content.startsWith("pls list")) {
    db.get("encouragements").then(encouragements => {
      msg.channel.send(encouragements)
    })
  }
  if(msg.content.startsWith("mine")){
    const mining = Math.floor(Math.random() * 10000) + 1;
    msg.channel.send("You went mining and got")
    msg.channel.send("coins")
  }
  if(msg.content.startsWith("commands")) {
    msg.channel.send("|         The available commands are:      |")
    msg.channel.send("|->inspre me - for inspirations quote      |")
    msg.channel.send("|->$resoping - turning on/off bot response |")
  }
  if (msg.content.startsWith("$responding")) {
    value = msg.content.split("$responding ")[1]

    if (value.toLowerCase() == "true") {
      db.set("responding", true)
      msg.channel.send("Responding is on.")
    } else {
       db.set("responding", false)
      msg.channel.send("Responding is off.")     
    }
  }

})
keepAlive()
client.login(process.env.TOKEN)
