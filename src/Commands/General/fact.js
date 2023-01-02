const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('fact')
    .setDescription('Returns a random useless fact!'),
    async execute(interaction){
        await interaction.deferReply();
        embed = new EmbedBuilder();
        await fetch('https://uselessfacts.jsph.pl/random.json').then(async (res) => {
            try {
        		let content = await res.json();
                await interaction.editReply({embeds: [embed.setDescription(`${content.text}`).setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })]});
      		} catch (err) {
        		console.error(err)
                await interaction.deferReply();
        		await interaction.editReply({content: `Fact API is currently unavailable!`});
        		return;
      		}
        })
          
    }

}
