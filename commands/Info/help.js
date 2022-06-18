const request = require('node-superfetch');
const Color = "RANDOM";
const Discord = require("discord.js");
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");
const { prefix, developerID, bot, support } = require("../../config.json")



module.exports = {
  name: "help",
  description: "Info",

  run: async (client, message, args) => {


    const embed = new Discord.MessageEmbed()
    .setTitle(`${bot} Help`)
    .setDescription(` Hello **${message.author.username}**, \n *Choose a category below to see the commands* \n\n :question: New to ${bot}? Check out server \n ${support} \n\n Be sure to join the developer server too! \n https://discord.gg/gU7XAxTpX5`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setFooter(`Requested by: ${message.author.tag}`)


    const music = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle(`Music`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Here are all the music commands: \n\n \`join\`, \`leave\`, \`loop\`, \`nowplaying\`, \`pause\`,  \`play\`,  \`queue\`,  \`remove\`,  \`resume\`,  \`search\`,  \`skip\`,  \`skipall\`,  \`stop\`,  \`volume\``)
    .setFooter(`Requested by: ${message.author.tag}`)



    const info = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle(`Info`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Here are all the Info commands: \n\n \`help\`, \`invite\`, \`setprefix\`,  \`setpre\`,  \`removepremium\``)
    .setFooter(`Requested by: ${message.author.tag}`)


    const button1 = new MessageButton()
    .setLabel(`Music`)
    .setID(`music`)
    .setStyle("blurple");
    

    const button2 = new MessageButton()
    .setLabel(`Info`)
    .setID(`info`)
    .setStyle("green");



    const row = new MessageActionRow()
    .addComponents(button1, button2);



    const MESSAGE = await message.channel.send(embed, row);

    const filter = ( button ) => button.clicker.user.id === message.author.id 
    const collector = MESSAGE.createButtonCollector(filter, { time : 3e5 });

    collector.on('collect', async (b) => {

        if(b.id == "music") {

            MESSAGE.edit(music, row);
            await b.reply.defer()
            
        }

         if(b.id == "info") {

            MESSAGE.edit(info, row);
            await b.reply.defer()
            
        }


    });


   
}};