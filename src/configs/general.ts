import { env } from '@/env'

export const generalConfig: GeneralConfigType = {

	name: 'LNReader Bot', // the name of your bot
	description: '', // the description of your bot
	defaultLocale: 'en', // default language of the bot, must be a valid locale
	ownerId: env.BOT_OWNER_ID,
	timezone: 'Europe/Paris', // default TimeZone to well format and localize dates (logs, stats, etc)

	simpleCommandsPrefix: '.', // default prefix for simple command messages (old way to do commands on discord)
	automaticDeferring: true, // enable or not the automatic deferring of the replies of the bot on the command interactions

	// useful links
	links: {
		invite: 'https://discord.com/oauth2/authorize?client_id=1238700375956131841&permissions=412317182016&scope=bot',
		supportServer: 'https://discord.gg/QdcWN4MD63',
		gitRemoteRepo: 'https://github.com/LNReader/lnreader',
	},

	automaticUploadImagesToImgur: false, // enable or not the automatic assets upload

	devs: [], // discord IDs of the devs that are working on the bot (you don't have to put the owner's id here)

	// define the bot activities (phrases under its name). Types can be: PLAYING, LISTENING, WATCHING, STREAMING
	activities: [
		{
			text: 'LNReader is reading Youzitsu year 2 vol 5',
			type: 'PLAYING',
		},
		{
			text: 'LNReader is using TTS',
			type: 'LISTENING',
		},
	],

}

// global colors
export const colorsConfig = {

	primary: '#2F3136',
}
