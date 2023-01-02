const { EmbedBuilder } = require('discord.js');
const logSchema = require("../../Models/Logs");

module.exports = {
    name: "messageDelete",
    once: false,
    async execute(interaction, client) {
        const guildId = interaction.guildId;
        if (interaction.author.bot) return;
        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (data) {
                const logchannel = client.channels.cache.get(data.Channel);
                var embed = new EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({ name: `Message has been deleted`})
                    .setThumbnail(interaction.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`
                **Author : ** <@${interaction.author.id}>
                **Channel : ** <#${interaction.channel.id}>
             `)
                    .addFields(
                        { name: `**Deleted Message**`, value: `${interaction.content.replace(/`/g, "'")}`, inline: true },
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