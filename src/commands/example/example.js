import { SlashCommandBuilder } from 'discord.js';
import { wait } from '../../tools/index.js';

export default { // default export will automatically be loaded in bot
	cooldown: 5, // prevent command from being used again for 5 seconds (default is 3s)
	data: new SlashCommandBuilder()
		.setName('example') // /example to run the command
		.setDescription('The command to command them all, or not'),
	async execute(interaction) {
		// discord need the bot to reply withing three seconds
		// deferReply allows us to delay our reply without sending a reply
		await interaction.deferReply();
		// instead of await interaction.reply('example');

		// wait is just a setTimeout in promise form
		await wait(3000);

		// deferReply counts as the reply so we cannot do another reply
		// but we can edit the deferReply same as a reply
		await interaction.editReply('hello');

		// we can get a reference to the reply
		const message = await interaction.fetchReply();
		console.log({ message });
		await wait(1000);

		// we can send followup messages with .followUp
		// and save a reference to the messages we send from return statement
		const message2 = await interaction.followUp('HELLO!!!');
		console.log({ message2 });
		await wait(1000);

		// and modify a message through a reference
		message2.edit('Hi there');
		await wait(1000);

		// or modify the original reply (or deferReply) without a reference
		await interaction.deleteReply();
		await wait(1000);
	},
};
