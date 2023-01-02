const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test command, check if bot is getting requests"),
    execute(interaction){
        interaction.reply({content: 'Pong!', ephemeral: true})
    }
}
