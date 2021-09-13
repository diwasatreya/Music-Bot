module.exports = {

        name: 'stop',
        noalias: [''],
        category: "music",
        description: "stops the music playing",
        usage: ' ',
        acessableby: "everyone",
    run: async (bot, message, args, ops) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to stop music!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");
          }
        const serverQueue = ops.queue.get(message.guild.id);
      try {
        if (serverQueue) {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
        message.guild.me.voice.channel.leave();
        } else {
        channel.leave();
        }
        return message.channel.send('👋 **Disconnected**')
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("**Something Went Wrong!**");
      }
    }
};