import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		// for all setName: lowercase, - and _ only, max 32 characters
		.setName('ex-add_options')
		.setDescription('Adds two integers together')
		.addIntegerOption(option => option
			.setName('num1')
			.setDescription('First integer')
			.setRequired(true))
		.addIntegerOption(option => option
			.setName('num2')
			.setDescription('Second integer'),
		),
	async execute(interaction) {
		// First option is required so command will not run without a value
		const num1 = interaction.options.getInteger('num1');
		// Second option is not required so we set a default with nullish coalescing operator ??
		const num2 = interaction.options.getInteger('num2') ?? 5;

		await interaction.reply(`The sum is ${num1 + num2}`);
	},
};
