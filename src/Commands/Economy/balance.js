const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Return the balance of the user mentioned")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you'd like to view the balance of")
    ),
  async execute(interaction, client) {
    await interaction.deferReply({});
    const selectedUser =
      interaction.options.getUser("target") || interaction.user;
    if(selectedUser.bot){
      const botEmbed = new EmbedBuilder();
      return interaction.editReply({embeds: [botEmbed.setTitle('Bots don\'t have balances dummy!')]})
    }
    const storedBalance = await client.getBalance(selectedUser.id);

    if (!storedBalance) {
      const failEmbed = new EmbedBuilder();
      return await interaction.editReply({
        embeds: [
          failEmbed
            .setDescription(`${selectedUser.tag} doesn't have a balance yet!`)
            .setTimestamp(),
        ],
        ephemeral: true,
      });
    } else {
      const successEmbed = new EmbedBuilder()
      .setTitle(`${selectedUser.username}'s Balance:`)
      .setTimestamp()
      .addFields([
        {
          name: `$${storedBalance.balance}`,
          value: `\u200b`
        }
      ])
      .setFooter({
        text: selectedUser.tag,
        iconURL: selectedUser.displayAvatarURL({ dynamic: true }),

      })
      await interaction.editReply({ embeds: [successEmbed], ephemeral: true})
    }
  },
};
