const ButtonPages = require('discord-button-pages');
const { MessageEmbed } = require('discord.js')
const disbutpages = require("discord-embeds-pages-buttons")
const Discord = require("discord.js");
const disbut = require("discord-buttons");
const MessageButton = require("discord-buttons");
const { prefix, developerID, support, bot } = require("../../config.json")

module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Information",

  run: async (client, message, args) => {
    let helpEmbed = new MessageEmbed()
    .setTitle(`Invite ${bot}`)
      .setDescription(`*Choose an option below to redirect*`)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(`Requested by: ${message.author.tag}`)
      .setColor("#FFFFF0")


      let button1 = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Invite') 
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);
      let button2 = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Support Server') 
      .setURL(`${support}`);


      return message.channel.send(helpEmbed,{
        button: [button1,button2],
      });

  },
};