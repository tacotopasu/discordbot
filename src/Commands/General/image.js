const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("image")
    .setDescription("Get a random picture of the chosen content")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("What do you wanna see?")
        .setAutocomplete(true)
        .setRequired(true)
    ),

  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const choices = ["capybaras", "cats", "dogs", "nekogirls", "nekoboys"];
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue)
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction) {
    const { guild, options, member } = interaction;
    await interaction.deferReply();
    const option = interaction.options.getString("content");
    if(option == "capybaras") url = "https://api.capybara-api.xyz/v1/image/random";
    else if(option == "cats") url = "https://api.thecatapi.com/v1/images/search";
    else if(option == "dogs") url = "http://shibe.online/api/shibes";
    else if(option == "nekogirls") url = "https://api.waifu.pics/sfw/neko";
    else if(option == "nekoboys") url = "https://api.catboys.com/img";
    await fetch(url).then(async (res) => {
      try {
        let content = await res.json();
      } catch (err) {
        console.error(err)
        await interaction.editReply({content: `${option} API is currently unavailable!`});
        return;
      }
      
      if(option == "capybaras") {
        title = "Capybaras!"
        fancyUrl = "https://api.capybara-api.xyz"
        color = 0x5fc314
        image = content.image_urls.original;
    } else if(option == "cats"){
        title = "Cats!"
        fancyUrl = "https://api.thecatapi.com"
        color = 0xff4500
        image = content[0].url;
    } else if(option == "dogs"){
        title = "Dogs!"
        fancyUrl = "https://shibe.online/"
        color = 0xff4500
        image = content[0];
    } else if(option == "nekogirls"){
        title = "Neko Girls!"
        fancyUrl = "https://waifu.pics"
        color = 0xe83845
        image = content.url;
    } else if(option == "nekoboys"){
        title = "Neko Boys!"
        fancyUrl = "https://catboys.com"
        color = 0xe83845
        image = content.url;

    }
    console.log(`26 // Request made to ${url}\n   // Image: ${image}`)
      const embed = new EmbedBuilder();
      await interaction.editReply({
        embeds: [
          embed
            .setTitle(title)
            .setImage(image)
            .setURL(image)
            .setTimestamp()
            .setColor(color)
            .setFooter({
              text: `Image acquired from ${fancyUrl}`,
            }),
        ],
      });
    });
  },
};
