import 'dotenv/config.js';
import { readdirSync } from 'fs';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';

const srcPath = import.meta.url;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Add useful collections
client.commands = new Collection();
client.cooldowns = new Collection();

// Loading command files
const commandFolders = readdirSync(new URL('./commands', srcPath));

for (const folder of commandFolders) {
	const folderPath = './commands/' + folder;
	const commandFiles = readdirSync(new URL(folderPath, srcPath))
		.filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = folderPath + '/' + file;
		const { default: command } = await import(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Loading event files
const eventFiles = readdirSync(new URL('./events', srcPath))
	.filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const { default: event } = await import('./events/' + file);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
