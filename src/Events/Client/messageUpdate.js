const { EmbedBuilder } = require('discord.js');
const logSchema = require("../../Models/Logs");

module.exports = {
    name: "messageUpdate",
    once: false,
    async execute(oldMessage, newMessage, interaction) {
        const guildId = oldMessage.guildId;
        if(`${oldMessage}` == `${newMessage}`) return;
        if (oldMessage.author.bot) return;
        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (data) {
                const logchannel = interaction.channels.cache.get(data.Channel);
                var embed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({ name: `Message has been edited`})
                .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`
                **Author : ** <@${oldMessage.author.id}>
                **Channel : ** <#${oldMessage.channel.id}>
             `)
                .addFields(
                    { name: `**Before**`, value: `${oldMessage}`},
                    { name: `**After**`, value: `${newMessage}`},
                )
                .setTimestamp()
                logchannel.send({ embeds: [embed] })
            }
            if (err) {
                console.log(err);
            }
        })
    },
};