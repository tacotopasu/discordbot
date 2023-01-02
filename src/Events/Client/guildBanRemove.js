const { EmbedBuilder } = require('discord.js');
const logSchema = require("../../Models/Logs");

module.exports = async (client, member, reason, guildId) => {
    logSchema.findOne({ Guild: guildId }, async (err, data) => {
        if (data) {
            const logchannel = data.Channel;
            var embed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({ name: `Member has been unbanned`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setDescription([
                    `**${member.user.tag}** has been unbanned`,
                    ``,
                    `**User:**`,
                    `**Name:** ${member.user.tag}`,
                    `**ID:** ${member.user.id}`
                ].join('\n'))
                .setTimestamp()

            logchannel.send({ embeds: [embed] })
            console.log(`${`[DEBUG]`.brightMagenta} ${`Member has been unbanned`.brightWhite}`)
        }
        if (err) {
            console.log(err)
        }
    });
};