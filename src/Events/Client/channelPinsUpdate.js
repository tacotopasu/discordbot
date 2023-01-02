const { EmbedBuilder } = require('discord.js');
const logSchema = require("../../Models/Logs");

module.exports = async (client, channel, guildId) => {
    logSchema.findOne({ Guild: guildId }, async (err, data) => {
        if (data) {
            const logchannel = data.Channel;
            var embed = new EmbedBuilder()
                .setColor("Blue")
                .setAuthor({ name: `Channel PINS Update`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/265/pushpin_1f4cc.png')
                .setDescription(`Message has been pinned or unpinned`)
                .addFields(
                    { name: `Channel`, value: `${channel.name}`, inline: true },
                    { name: `Mention`, value: `<#${channel.id}>`, inline: true },
                    { name: `Channel ID`, value: `${channel.id}`, inline: true },
                )
                .setTimestamp()

            logchannel.send({ embeds: [embed] })
            console.log(`${`[DEBUG]`.brightMagenta} ${`Message has been pinned or unpinned`.brightWhite}`)
        }
        if (err) {
            console.log(err);
        }
    })
};