const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Balance = require("../../Models/balance");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pay")
    .setDescription("Transfers the amount stated to the target")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you'd like to send money to")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount to send")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const userStoredBalance = await client.fetchBalance(interaction.user.id);
    await interaction.deferReply();
    amount = interaction.options.getNumber("amount");
    const selectedUser = interaction.options.getUser("target");

    if (selectedUser.bot || selectedUser.id == interaction.user.id)
      return await interaction.editReply({
        content: `You cannot send money to yourself, or a bot.`,
        ephemeral: true,
      });
    else if (amount < 1.0)
      return await interaction.editReply({
        content: `The amount to send must be over $1.00`,
        ephemeral: true,
      });
    else if (amount > userStoredBalance.amount)
      return await interaction.editReply({
        content: `You don't have enough funds to send that amount!`,
        ephemeral: true,
      });

    const selectedUserBalance = await client.fetchBalance(selectedUser.id);
    amount = await client.toFixedNumber(amount);
    await Balance.findOneAndUpdate(
      { _id: userStoredBalance._id },
      {
        balance: await client.toFixedNumber(userStoredBalance.balance - amount),
      }
    );
    await Balance.findOneAndUpdate(
      { _id: selectedUserBalance._id },
      {
        balance: await client.toFixedNumber(
          selectedUserBalance.balance + amount
        ),
      }
    ).then(async (balance) => {
        client.log(`[Balance] : Sent money from ${interaction.user.id} to ${selectedUser.id}`, true);
      })
      .catch(console.error);;

    await interaction.editReply({
      content: `${interaction.user} sent $${amount} to ${selectedUser}`,
    });
  },
};
