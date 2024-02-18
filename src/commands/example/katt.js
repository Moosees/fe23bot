import { SlashCommandBuilder } from 'discord.js';
import { KattCount } from '../../models/katt-count.js';
import { Sequelize } from 'sequelize';

export default {
	data: new SlashCommandBuilder()
		.setName('ex-katt')
		.setDescription('Shows katt counts for users')
		.addUserOption(option => option
			.setName('target')
			.setDescription('Only show results for this user')),
	async execute(interaction) {
		const target = interaction.options.getUser('target');

		// if we call the command without an option we return all users
		if (!target) {
			// attributes determines what columns are returned
			// order takes an array of arrays with columns and sorting order
			// limit so we don't get too many results back
			const results = await KattCount.findAll({ attributes: ['userName', 'count'], order: [['count', 'DESC']], limit: 10 });

			// make a string from the results and provide a fallback in case there are no results
			const replyString = results.map(({ userName, count }) => `${userName} - ${count} katt`).join('\n') || 'No katt at all :(';

			return await interaction.reply(replyString);
		}

		// We could find a user in db or get null if no user is found
		const result = await KattCount.findOne({ where: { userId: target.id } });

		// To prevent a crash from trying to read a property of null we use the following:
		// ?. -> Optional chaining, stop if left side is undefined or null
		// ?? -> Nullish coalescing operator, return the right side if the left side is undefined or null
		const count = result?.count ?? 0;

		await interaction.reply(`Katt count for ${target.username} is ${count}`);
	},
};
