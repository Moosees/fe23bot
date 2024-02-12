import { Events } from 'discord.js';

export default {
	name: Events.MessageCreate,
	async execute(interaction) {
		// console.log(interaction); // to find out what we have to work with

		// check if a interaction contains the word katt
		if (interaction.content.toLowerCase().includes('katt')) {
			// react to message
			await interaction.react('🐱');
			// and reply to message
			await interaction.reply('KAAAATT!!!');
		}
	}
};
