module.exports = {

        name: 'leave',
        aliases: ['stop', 'dc'],
        category: 'music',
        description: 'Leaves The User\'s VC',
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
        if (!message.guild.me.voice.channel) return message.channel.send('❌  Bot is Not In A VC! ');

        if (serverQueue || serverQueue.playing) {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("Left The Voice Channel! ");
        } else {
        await channel.leave();
        return message.channel.send("Left The Voice Channel! ");
        }
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send(" Something Went Wrong, Please Try Again! ");
      }
    }
}