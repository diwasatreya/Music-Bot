const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");
const db = require("quick.db");
const { prefix, developerID, support, bot } = require("../../config.json")
// Helllo bro whats up? I am poor guy LMAO
module.exports = {
  name: "removepremium",
  aliases: ["rpremium"],
  description: "Information",

  run: async (client, message, args) => {

    if(message.author.id != 519666024220721152){
    return message.channel.send(`Only Bot Owner can use this command`)
  } 

 let guild = client.guilds.cache.get(args[0])

 if (!guild)  return message.channel.send(`Gime me a Guild ID`)
 

db.set(`premium_${args[0]}`, false)

 message.channel.send(`Removed ${guild.name} as premium server!`)

  }
};