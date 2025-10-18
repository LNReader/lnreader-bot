import { Category } from '@discordx/utilities'
import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from 'discord.js'
import { Discord } from 'discordx'

import { Slash, SlashChoice, SlashOption } from '@/decorators'

@Discord()
@Category('LNReader')
export default class DataHelperCommand {

	@Slash({
		name: 'migrate',
		description: 'Get step-by-step migration instructions for upgrading LNReader',
	})
	async migrate(
		@SlashChoice(...['v1.1.19', 'v2.0.0-beta.1'])
		@SlashOption({
			name: 'version',
			description: 'Your current LNReader version',
			type: ApplicationCommandOptionType.String,
			required: true,
			localizationSource: 'COMMANDS.MIGRATE.DESCRIPTION',
		})
		version: string,
		interaction: CommandInteraction
	) {
		let title = `Migrating from ${version}`
		let description = ''
		let color = 0x5865F2

		if (version === 'v1.1.19') {
			title = `Migrating from ${version} to v2.0.0`
			description = `**Important:** This is a major version upgrade. Please follow these steps carefully:\n`
			description += `**1.** Create a backup in v1.1.19\n`
			description += `**2.** Uninstall the current app\n`
			description += `**3.** Convert your backup file:\n`
			description += `      → Visit [lnreader.app/tools/backup-upgrader](https://www.lnreader.app/tools/backup-upgrader)\n`
			description += `**4.** Install LNReader v2.0.0-beta or newer\n`
			description += `**5.** Clear app data (Settings → Advanced)\n`
			description += `**6.** Download required plugins\n`
			description += `**7.** Bypass Cloudflare for plugins if needed\n`
			description += `**8.** Restore from the converted backup (Legacy Restore)\n`
			description += `**Note:** Make sure to keep your backup safe until migration is complete!`
			color = 0xFFA500 // Orange for important migration
		} else if (version === 'v2.0.0-beta.1') {
			title = `Migrating from ${version}`
			description = `Good news! You're already on v2.0.0 or newer.\n`
			description += `**To update to the latest version:**\n`
			description += `Simply download and install the latest release from the GitHub releases page or our website.\n`
			description += `Your data will be preserved automatically. No special migration needed!`
			color = 0x57F287 // Green for easy migration
		}

		const embed = new EmbedBuilder().setTitle(title).setDescription(description).setColor(color)

		interaction.followUp({
			embeds: [embed.toJSON()],
		})
	}

}
