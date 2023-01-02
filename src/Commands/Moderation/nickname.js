const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nickname")
    .setDescription("Change a user's nickname")
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Whose nickname you want to change")
        .setRequired(true)
    )
    .addStringOption((option) =>
    option
        .setName("nickname")
        .setDescription("The nickname to change to")
        .setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const member = await interaction.guild.members.fetch(target.id);
    const oldnickname = member.nickname;
    const nickname = interaction.options.getString('nickname');
    try {
        await member.setNickname(`${nickname}`);
        await interaction.reply({content: `User's nickname has been changed from "${oldnickname}" to "${nickname}".`, ephemeral: true});
    } catch (err) {
        console.error(err);
        await interaction.reply({content: "Sorry, I can't change this user's nickname!", ephemeral: true});
    }
  },
};
