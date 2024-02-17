import { Events } from 'discord.js';
import { KattCount } from '../../models/katt-count.js';

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

			// using database example:
			// first check if author already exists in table
			const kattWhisperer = await KattCount.findOne({ where: { userId: interaction.author.id } });

			// if user exists, update count for author
			if (kattWhisperer) {
				await kattWhisperer.increment('count');
				return;
			}

			// else create a new post in table for author
			await KattCount.create({
				userId: interaction.author.id,
				userName: interaction.author.username,
				count: 1
			});
		}
	}
};
