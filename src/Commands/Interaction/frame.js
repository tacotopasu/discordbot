const {SlashCommandBuilder, AttachmentBuilder} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("frame")
    .setDescription("Adds a frame to your profile picture!")
    .addStringOption((option) =>
    option.setName('achievement')
    .setDescription('The name of the achievement you just got')
    .setRequired(true)),
    async execute(interaction){
        interaction.deferReply();
        const achievement = interaction.options.getString('achievement');
        const Canvas = require('canvas');
        const canvas = Canvas.createCanvas(1024, 1024); 
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('../../res/achievementUnlocked.png');
    
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#74037b';
        ctx.font = '25px sans-serif';
        ctx.fillStyle = '#d6cec7';

        ctx.fillText(achievement, canvas.width / 3.8, canvas.height / 1.4);
        const Attachment = new AttachmentBuilder(canvas.toBuffer(), 'achievement.jpeg');
        interaction.editReply(Attachment)
    }
}
