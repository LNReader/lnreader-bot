import { Category } from '@discordx/utilities'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from 'discord.js'
import { Client } from 'discordx'

import { generalConfig } from '@/configs'
import { Discord, Injectable, Slash } from '@/decorators'
import { Guard } from '@/guards'
import { Stats } from '@/services'
import { getColor, isValidUrl, timeAgo } from '@/utils/functions'

import packageJson from '../../../package.json'

dayjs.extend(relativeTime)

const links = [
	{ label: 'Invite me!', url: generalConfig.links.invite },
	{ label: 'Support server', url: generalConfig.links.supportServer },
	{ label: 'Github', url: generalConfig.links.gitRemoteRepo },
]

@Discord()
@Injectable()
@Category('General')
export default class InfoCommand {

	constructor(private stats: Stats) {}

	@Slash({
		name: 'info',
		description: 'Display information about the LNReader bot',
	})
	@Guard()
	async info(interaction: CommandInteraction, client: Client) {
		const totalStats = await this.stats.getTotalStats()
		const uptime = timeAgo(new Date(Date.now() - client.uptime!))

		const embed = new EmbedBuilder()
			.setTitle('LNReader Bot')
			.setDescription('Discord bot for LNReader community support')
			.setColor(getColor('primary'))
			.addFields([
				{
					name: 'Version',
					value: `v${packageJson.version}`,
				},
				{
					name: 'Uptime',
					value: uptime,
				},
				{
					name: 'Servers',
					value: `${totalStats.TOTAL_GUILDS}`,
				},
			])

		const buttons = links
			.map((link) => {
				const url = link.url.split('_').join('')
				if (isValidUrl(url)) {
					return new ButtonBuilder().setLabel(link.label).setURL(url).setStyle(ButtonStyle.Link)
				}

				return null
			})
			.filter(link => link) as ButtonBuilder[]

		const components = []
		if (buttons.length > 0) {
			const row = new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons)
			components.push(row)
		}

		interaction.followUp({
			embeds: [embed.toJSON()],
			components,
		})
	}

}
