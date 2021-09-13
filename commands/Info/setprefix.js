const db = require('quick.db');

module.exports = {

        name: "setprefix",
        aliases: ['sp', 'prefix'],
        category: "moderation",
        description: "Sets Custom Prefix",
        usage: "[prefix]",
        accessableby: 'Administrators',
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**You Do Not Permission to change my prefix!")

        if (!args[0]) {
          let b = await db.fetch(`prefix_${message.guild.id}`);
          if (b) {
        return message.channel.send(
          `My prefix of this server is \`${b}\``
        );
      } else return message.channel.send("Please specify prefix");
    } 
      
        try {

            let a = args.join(' ');
            let b = await db.fetch(`prefix_${message.guild.id}`)

            if (a === b) {
                return message.channel.send('Please give me another prefix.')
            } else {
                db.set(`prefix_${message.guild.id}`, a.toLowerCase())

                return message.channel.send(`Now my prefix in this server is \`${a}\``)
            }
        } catch (e) {
            console.log(e)
        }
    }
}