import { ArgsOf, Client } from 'discordx'

import { Discord, Guard, On } from '@/decorators'
import { Maintenance } from '@/guards'

@Discord()
export default class MessageCreateEvent {

	@On('messageCreate')
	@Guard(
		Maintenance
	)
	async messageCreateHandler(
		[message]: ArgsOf<'messageCreate'>,
		client: Client
	) {
		if(message.content === 'nyagami onii-chan'){
			message.reply('This imouto-chan need your help, <@703930445502480384> onii-chan!');
		}
		await client.executeCommand(message, false)
	}

}
