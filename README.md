# fe23bot

## Setup the bot on your own discord server

1. Clone this repo
2. Run *npm install*
3. Follow discord.js [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to create a new bot app
4. Go to OAuth2 then URL Generator in [Discord Developer Portal](https://discord.com/developers/applications)
5. Select *applications.commands* and *bot* in Scopes
6. Select needed permissions in Bot Permissions, or *admin* if only using the bot for testing purposes
7. Copy the generated URL, paste it into browser and select the server to add the bot to (create a new server for testing purposes)
8. Create a .env file in the project root folder
9. Add a line in the .env reading *TOKEN=your-token*
10. Add a line in the .env reading *BOT_ID=your-bot-id*
11. Replace your-token with the token (reset token) from the Bot page and your-bot-id with the client id from the OAuth2 page in Discord Developer Portal

## Running the bot locally

* First follow the steps above to setup the bot
* *npm run register* registers the commands with Discord. This is only needed before starting the bot for the first time, or if a command is added or removed
* *npm start* starts the bot with nodemon and will restart the bot if any file is changed
