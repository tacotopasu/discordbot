const { EmbedBuilder } = require('discord.js');
const logSchema = require("../../Models/Logs");

module.exports = async (client, message, guildId) => {
    console.log("messagePinned called!");
    if (message.author.bot) return;
    logSchema.findOne({ Guild: guildId }, async (err, data) => {
        if (data) {
            const logchannel = data.Channel;
            var embed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({ name: `Message has been pinned`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setDescription(`
                **Author : ** <@${message.author.id}>
                **Channel : ** <#${message.channel.id}>
             `)
                .addFields(
                    { name: `**Deleted Message**`, value: `${message.content.replace(/`/g, "'")}`, inline: true },
                )
                .setTimestamp()
            logchannel.send({ embeds: [embed] })
        }
        if (err) {
            console.log(err);
        }
    })


};