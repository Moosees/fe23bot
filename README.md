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

## Contributing

### Pull requests

1. Fork the repo
2. Follow steps above to setup and run the bot
3. Make changes with help from the guidelines below
4. Lint code with *npm run lint* or manually with eslint
5. Create a pull request

### Files and folders

* Try to put all addition into new files and avoid making changes to core files
* When adding events or commands, create a new "personal" folder inside the src/commands or src/events and put all relevant files there. Use default export for the event or command and it will be automatically added to the bot
* When adding db models, create a new file in src/models, use a named export for easy access in the rest of the app and don't forget to sync the model in src/models/index.js
* If adding a tool, create a new file and export it from src/tools/index.js

## Useful links

* [Discord.js docs](https://old.discordjs.dev/#/docs)
* [sequelize docs](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
