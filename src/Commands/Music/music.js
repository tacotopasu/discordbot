const { VolumeInterface } = require("discord.js");
const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji } = require("discord.js");
const client = require("../../index");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Play music in a voice channel")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("play")
        .setDescription("Play a song")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("Name or url of the song")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("volume")
        .setDescription("Adjust the volume")
        .addIntegerOption((option) =>
          option
            .setName("percent")
            .setDescription("Percentage of the volume. (10 = 10%, 100 = 100%)")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("pause").setDescription("Pause song playback")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("skip").setDescription("Skip current song")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("queue").setDescription("Display current queue")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("resume").setDescription("Resume song playback")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("stop")
        .setDescription("Stop playing songs and leave vc")
    ),

  async execute(interaction) {
    const { options, member, guild, channel } = interaction;

    const subcommand = options.getSubcommand();
    const query = options.getString("query");
    const volume = options.getNumber("percent");
    const voiceChannel = member.voice.channel;
    const embed = new EmbedBuilder();

    if (!voiceChannel) {
      embed.setColor("Red").setDescription("Please join a voice channel!");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (!member.voice.channelId == guild.members.me.voice.channelId) {
      embed.setColor("Red").setDescription("Please join a voice channel!");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    try {
      switch (subcommand) {
        case "play":
          client.distube.play(voiceChannel, query, {
            textChannel: channel,
            member: member,
          });
          return interaction.reply({ content: "🎶 Request received" });
        case "volume":
          client.distube.setVolume(voiceChannel, volume);
          return interaction.reply({
            content: `🔊 Volume has been set to ${volume}%`,
          });
        case "skip":
          queue = await client.distube.getQueue(voiceChannel);
          if (!queue) {
            embed.setColor("Red").setDescription("There's currently no queue!");
            return interaction.reply({ embeds: [embed], ephemeral: true });
          }
          await queue.skip(voiceChannel);
          embed.setColor("Blue").setDescription("⏭ The song has been skipped!");
          return interaction.reply({ embeds: [embed] });
        case "stop":
          queue = await client.distube.getQueue(voiceChannel);
          if (!queue) {
            embed.setColor("Red").setDescription("There's currently no queue!");
            return interaction.reply({ embeds: [embed] });
          }
          await queue.stop(voiceChannel);
          embed
            .setColor("Red")
            .setDescription(
              "⏹ The queue has been cleared and playback has been stopped!"
            );
          return interaction.reply({ embeds: [embed], ephemeral: true });
        case "pause":
          queue = await client.distube.getQueue(voiceChannel);
          if (!queue) {
            embed.setColor("Red").setDescription("There's currently no queue!");
            return interaction.reply({ embeds: [embed], ephemeral: true });
          }
          await queue.pause(voiceChannel);
          embed
            .setColor("Orange")
            .setDescription("⏸ The song has been paused!");
          return interaction.reply({ embeds: [embed] });
        case "resume":
          queue = await client.distube.getQueue(voiceChannel);
          if (!queue) {
            embed.setColor("Red").setDescription("There's currently no queue!");
            return interaction.reply({ embeds: [embed], ephemeral: true });
          }
          await queue.pause(voiceChannel);
          embed
            .setColor("Green")
            .setDescription("⏸ Playback has been resumed!");
          return interaction.reply({ embeds: [embed] });
        case "queue":
          queue = await client.distube.getQueue(voiceChannel);
          if (!queue) {
            embed.setColor("Red").setDescription("There's currently no queue!");
            return interaction.reply({ embeds: [embed], ephemeral: true });
          }
          embed
            .setColor("Purple")
            .setDescription(
              `${queue.songs.map(
                (song, id) =>
                  `\n**${id + 1}.** ${song.name} -\`${song.formattedDuration}\``
              )}`
            );
          return interaction.reply({ embeds: [embed] });
      }
    } catch (err) {
      embed.setColor("Red").setDescription("Something went wrong! Please try again later.");
      console.error(err);
      return interaction.reply({ embeds: [embed], ephemeral: true });
      
    }
  },
};
