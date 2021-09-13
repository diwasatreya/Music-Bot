const { MessageEmbed } = require('discord.js');

module.exports = {
 
        name: 'nowplaying',
        category: "music",
        aliases: ["np"],
        description: 'Now playing command',
        usage: "Shows current song playing",
        accessableby: "everyone",
    run: async (bot, message, args, ops) => {
        try {
            const { channel } = message.member.voice;
            if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to see the current song playing!');
            if (message.guild.me.voice.channel !== message.member.voice.channel) {
                return message.channel.send("**You Have To Be In The Same Channel With The Bot!**");
            };
            const serverQueue = ops.queue.get(message.guild.id);
            if (!serverQueue) return message.channel.send('❌ **Nothing playing in this server**');
            let video = serverQueue.songs[0];
            let description;
            if (video.duration == 'Live Stream') {
                description = 'Live Stream';
            } else {
                description = playbackBar(video);
            }
            const videoEmbed = new MessageEmbed()
                .setThumbnail(video.thumbnail)
                .setColor('GREEN')
                .setTitle(video.title)
                .setDescription(description)
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()
            message.channel.send(videoEmbed);
            return;

            function playbackBar(video) {
                const passedTimeInMS = serverQueue.connection.dispatcher.streamTime;
                const passedTimeInMSObj = {
                    seconds: Math.floor((passedTimeInMS / 1000) % 60),
                    minutes: Math.floor((passedTimeInMS / (1000 * 60)) % 60),
                    hours: Math.floor((passedTimeInMS / (1000 * 60 * 60)) % 24)
                };
                const passedTimeFormatted = formatDuration(
                    passedTimeInMSObj
                );

                const totalDurationObj = video.duration;
                const totalDurationFormatted = formatDuration(
                    totalDurationObj
                );

                let totalDurationInMS = 0;
                Object.keys(totalDurationObj).forEach(function (key) {
                    if (key == 'hours') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 3600000;
                    } else if (key == 'minutes') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 60000;
                    } else if (key == 'seconds') {
                        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 100;
                    }
                });
                const playBackBarLocation = Math.round(
                    (passedTimeInMS / totalDurationInMS) * 10
                );
                
                let playBack = '';
                for (let i = 1; i < 21; i++) {
                    if (playBackBarLocation == 0) {
                        playBack = ':musical_note:▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
                        break;
                    } else if (playBackBarLocation == 11) {
                        playBack = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬:musical_note:';
                        break;
                    } else if (i == playBackBarLocation * 2) {
                        playBack = playBack + ':musical_note:';
                    } else {
                        playBack = playBack + '▬';
                    }
                }
                playBack = `${playBack}\n\n\`${passedTimeFormatted} / ${totalDurationFormatted}\``;
                return playBack
            }

            function formatDuration(durationObj) {
                const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
                    durationObj.minutes ? durationObj.minutes : '00'
                    }:${
                    (durationObj.seconds < 10)
                        ? ('0' + durationObj.seconds)
                        : (durationObj.seconds
                            ? durationObj.seconds
                            : '00')
                    }`;
                return duration;
            }
        } catch {
            message.channel.send("**Something Went Wrong!**")
        }
    }
}