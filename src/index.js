import 'dotenv/config.js';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { getAllFilesInFolder } from './tools/index.js';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Add useful collections
client.commands = new Collection();
client.cooldowns = new Collection();

// Loading command files
const commandFiles = getAllFilesInFolder('commands');

for (const file of commandFiles) {
	// Dynamic import of default export from file
	const { default: command } = await import(file);

	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Loading event files
const eventFiles = getAllFilesInFolder('events');

for (const file of eventFiles) {
	const { default: event } = await import(file);

	// Add all events listeners to bot
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
