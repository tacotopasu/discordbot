const { EmbedBuilder } = require('discord.js');
const logSchema = require("../../Models/Logs");

module.exports = async (client, member, reason, guildId) => {
    logSchema.findOne({ Guild: guildId }, async (err, data) => {
        if (data) {
            const logchannel = data.Channel;
            var embed = new EmbedBuilder()
                .setColor("Red")
                .setAuthor({ name: `Member has been banned`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/236/hammer_1f528.png')
                .setDescription([
                    `**${member.user.tag}** has been banned`,
                    ``,
                    `**User:**`,
                    `**Name:** ${member.user.tag}`,
                    `**ID:** ${member.user.id}`
                ].join('\n'))
                .setFooter({ text: `Reason: ${reason || 'None'}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()

            logchannel.send({ embeds: [embed] })
            console.log(`${`[DEBUG]`.brightMagenta} ${`Member has been banned`.brightWhite}`)
        }
        if (err) {
            console.log(err)
        }
    });
};