module.exports = {
 
        name: 'join',
        aliases: ['joinvc'],
        category: 'music',
        description: 'Join The User\'s VC',
        usage: ' ',
        accessableby: 'everyone',
    run: async (bot, message, args, ops) => {
        const { channel } = message.member.voice;
        const serverQueue = ops.queue.get(message.guild.id);
      try {
        if (!channel) return message.channel.send(' You Need To Join A Voice Channel! ');
        if (!channel.permissionsFor(bot.user).has(['CONNECT', 'SPEAK', 'VIEW_CHANNEL'])) {
            return message.channel.send(" Missing Voice Permissions! ");
        };
        if (message.guild.me.voice.channel) return message.channel.send('❌  Bot is Already In The VC! ');
      
        if (serverQueue || serverQueue.playing) {
          return message.channel.send(" Cannot Join Another VC While Playing! ")
        }
        await channel.join();
        return message.channel.send(" ✅ Joined The Voice Channel! ")
      } catch {
          serverQueue.connection.dispatcher.end();
          return message.channel.send(" Something Went Wrong, Please Try Again! ");
      }
    }
}