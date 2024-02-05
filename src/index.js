// Require the necessary discord.js classes
import 'dotenv/config.js';
import { readdirSync } from 'fs';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Loading command files
client.commands = new Collection();

const srcPath = import.meta.url;
const commandFolders = readdirSync(new URL('./commands', srcPath));

for (const folder of commandFolders) {
	const folderPath = './commands/' + folder;
	const commandFiles = readdirSync(new URL(folderPath, srcPath))
		.filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = folderPath + '/' + file;
		const command = await import(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command.default && 'execute' in command.default) {
			client.commands.set(command.default.data.name, command.default);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
// Log in to Discord with your client's token
client.login(process.env.TOKEN);
