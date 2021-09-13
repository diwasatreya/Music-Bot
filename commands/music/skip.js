module.exports = {
        name: 'skip',
        description: 'Skip command.',
        category: "music",
        aliases: ["s"],
        usage: " ",
        accessableby: "everyone",
    run: async (bot, message, args, ops) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to skip music!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");
          }
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('❌ **Nothing playing in this server**');
      try {
        serverQueue.connection.dispatcher.end();
        return message.channel.send('⏩ Skipped')
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send("**Something Went Wrong!**")
      }
    }
};