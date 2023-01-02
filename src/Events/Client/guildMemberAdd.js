const { EmbedBuilder } = require('discord.js');
const logSchema = require("../../Models/Logs");
const moment = require('moment');

module.exports = async (client, member, guild, guildId) => {
    logSchema.findOne({ Guild: guildId }, async (err, data) => {
        if (data) {
            const logchannel = data.Channel;
            var embed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({ name: `${member.user.tag} has joined server`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/154/inbox-tray_1f4e5.png')
                .setDescription([
                    `<@${member.user.id}> has joined the server`
                ].join('\n'))
                .addFields(
                    { name: `Name`, value: `${member.user.tag}`, inline: false },
                    { name: `ID`, value: `${member.user.id}`, inline: false },
                    { name: `Account Age`, value: `Created **${moment.utc(member.user.createdAt).fromNow()}**`, inline: false },
                )

            logchannel.send({ embeds: [embed] })
            console.log(`${`[DEBUG]`.brightMagenta} ${`Member has joined server`.brightWhite}`)
        }
        if (err) {
            console.log(err)
        }
    });
};