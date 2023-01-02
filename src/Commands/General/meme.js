// "https://reddit.com/r/cats/random/.json"
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Get random meme from reddit")
        .addStringOption((option) => option
            .setName('subreddit')
            .setDescription('Choose a subreddit to get the random post from (\'cat\' for example)')
            .setRequired(false)),
        async execute(interaction){
            const embed = new EmbedBuilder();
            const subreddit = interaction.options.getString('subreddit') || 'memes';
            await interaction.deferReply();
            await fetch(`https://reddit.com/r/${subreddit}/random/.json`).then(async (res) => {
                let meme = await res.json();
                let title = meme[0].data.children[0].data.title;
                let url = meme[0].data.children[0].data.url;
                let author = `posted by @${meme[0].data.children[0].data.author} on r/${subreddit}`;
                return interaction.editReply({embeds: [embed.setTitle(title).setImage(url).setURL(url).setColor("Random").setFooter({text: author})]});
            })
        }

}