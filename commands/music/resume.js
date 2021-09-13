module.exports = {

        name: 'resume',
        aliases: ["res"],
        category: "music",
        description: 'resumes music',
        usage: " ",
        accessableby: "everyone",
    run: async (bot, message, args, ops) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to resume music!');
        const serverQueue = ops.queue.get(message.guild.id);
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");
        }
      try {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send('▶ **Resumed**');
        }
        return message.channel.send('**There is nothing to resume**.');
      } catch {
        serverQueue.connection.dispatcher.end();
        return message.channel.send("**Something Went Wrong!**")
      }
    }
};