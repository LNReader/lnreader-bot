import { Category } from '@discordx/utilities'
import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from 'discord.js'
import { Discord } from 'discordx'

import { Injectable, Slash, SlashChoice, SlashOption } from '@/decorators'
import { Plugin } from '@/entities'
import { Database } from '@/services'
import { pluginRepoVersion } from '@/utils/constants/plugins'

import { languages } from './utils/language'

@Discord()
@Category('LNReader')
@Injectable()
export default class PluginsCommand {
	constructor(private db: Database) {}

	@Slash({
		name: 'plugins',
		description: 'Browse and search available LNReader plugins',
	})
	async plugins(
		@SlashChoice(...Object.values(languages))
		@SlashOption({
			description: 'Filter by language (e.g., English, Chinese, etc.)',
			name: 'language',
			type: ApplicationCommandOptionType.String,
			required: false,
			localizationSource: 'COMMANDS.PLUGINS.DESCRIPTION',
		})
		language: string,
		@SlashOption({
			description: 'Search by plugin name or keyword',
			name: 'keyword',
			type: ApplicationCommandOptionType.String,
			required: false,
		})
		keyword: string,
		@SlashOption({
			description: 'Page number (10 results per page)',
			name: 'page',
			type: ApplicationCommandOptionType.Integer,
			minValue: 1,
			required: false,
		})
		page: number = 1,
		interaction: CommandInteraction
	) {
		const pluginRepository = this.db.em.getRepository(Plugin)
		const [plugins, totalPlugins] = await pluginRepository.findWithPage(page, language, keyword)
		const totalPages = Math.ceil(totalPlugins / pluginRepository.pageSize)

		// Build title with filters
		let title = 'Available LNReader Plugins'
		const filters: string[] = []
		if (language) filters.push(`Language: ${language}`)
		if (keyword) filters.push(`Search: "${keyword}"`)
		if (filters.length > 0) title += ` (${filters.join(' • ')})`

		const embed = new EmbedBuilder()
			.setTitle(title)
			.setDescription(this.buildDescription(page, plugins, totalPlugins))
			.setFooter({ text: `Page ${page}/${totalPages} • Plugin Repository v${pluginRepoVersion}` })
			.setColor(0x5865f2)

		interaction.followUp({
			embeds: [embed.toJSON()],
		})
	}

	buildDescription(page: number, plugins: Plugin[], totalPlugins: number) {
		if (plugins.length === 0) {
			return 'No plugins found matching your search criteria.\nTry adjusting your filters or search terms.'
		}

		const pluginList = plugins
			.map(
				(plugin, index) =>
					`${index + 1 + (page - 1) * 10}. [${plugin.name}](${plugin.site}) (\`${plugin.id}\`) • v${plugin.version}`
			)
			.join('\n')

		return `Found ${totalPlugins} plugin${totalPlugins !== 1 ? 's' : ''}:\n${pluginList}`
	}

	@Slash({
		name: 'issue',
		description: 'Report a bug or request a feature for LNReader',
	})
	async issue(
		@SlashChoice(...['lnreader', 'lnreader-plugins'])
		@SlashOption({
			name: 'repo',
			type: ApplicationCommandOptionType.String,
			required: true,
			description: 'Select the repository (lnreader for app, lnreader-plugins for sources)',
			localizationSource: 'COMMANDS.ISSUE.DESCRIPTION',
		})
		repo: string,
		interaction: CommandInteraction
	) {
		const isApp = repo === 'lnreader'
		const link = isApp
			? 'https://github.com/LNReader/lnreader/issues/new/choose'
			: 'https://github.com/LNReader/lnreader-plugins/issues/new/choose'

		const title = isApp ? 'Report App Issue or Request Feature' : 'Report Plugin Issue or Request'
		const description = isApp
			? 'Having trouble with the LNReader app or have a feature idea?'
			: 'Found a broken plugin or want to request a new source?'
		const repoName = isApp ? 'lnreader' : 'lnreader-plugins'

		const embed = new EmbedBuilder()
			.setTitle(title)
			.setDescription(description)
			.addFields({
				name: 'Report Issue',
				value: `[${repoName}](${link})`,
			})
			.setColor(0x5865f2)

		interaction.followUp({
			embeds: [embed.toJSON()],
		})
	}
}
