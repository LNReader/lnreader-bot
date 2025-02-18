import { Injectable, Slash, SlashChoice, SlashOption } from "@/decorators";
import { Category } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord } from "discordx";
import { languages } from "./utils/language";
import { Database } from "@/services";
import { Plugin } from "@/entities";
import { pluginRepoVersion } from "@/utils/constants/plugins";

@Discord()
@Category('LNReader')
@Injectable()
export default class PluginsCommand {
    constructor(
		private db: Database,
	) {}
    @Slash({name: 'plugins'})
    async plugins(
        @SlashChoice(...Object.values(languages))
        @SlashOption({
            description: "Filter plugins with language",
            name: 'language',
            type: ApplicationCommandOptionType.String,
            required: false,
            localizationSource: 'COMMANDS.PLUGINS.DESCRIPTION'
        })
        language: string,
        @SlashOption({
            description: "Search plugins with keyword",
            name: "keyword",
            type: ApplicationCommandOptionType.String
        })
        keyword: string,
        @SlashOption({
            description: 'Page of request',
            name: 'page',
            type: ApplicationCommandOptionType.Integer,
            minValue: 1,
        })
        page: number = 1,
        interaction: CommandInteraction
    ) {
        const pluginRepository = this.db.em.getRepository(Plugin)
        const [plugins, totalPlugins] = await pluginRepository.findWithPage(page, language, keyword)
        const totalPages = Math.ceil(totalPlugins / pluginRepository.pageSize);
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "LNReader Bot",
                iconURL: "https://avatars.githubusercontent.com/u/81222734?s=200&v=4",
                url: "https://github.com/LNReader"
            })
            .setDescription(this.buildDescription(page, plugins))
            .setFooter({text: `LNReader Plugins v${pluginRepoVersion}`})
            .setTitle(`Page: ${page}/${totalPages} - Lang: ${language || 'All'}${keyword ? ' - ' + keyword : ''}`)
        interaction.followUp({
            embeds: [embed.toJSON()]
        });
    }

    buildDescription(page: number, plugins: Plugin[]) {
        if(plugins.length === 0){
            return "No result."
        }
        return plugins
            .map(
                (plugin, index) => `${index + 1 + (page - 1) * 10}. [**${plugin.name}**](${plugin.site})\n ${plugin.id} - v${plugin.version}`
            )
            .join('\n')
    }

    @Slash({name: 'issue'})
    async issue(
        @SlashChoice(...['App', 'Plugins'])
        @SlashOption({
            name: "repo",
            type: ApplicationCommandOptionType.String,
            required: true,
            description: "Choose repo to make issue/request",
            localizationSource: 'COMMANDS.ISSUE.DESCRIPTION'
        })
        repo: string,
        interaction: CommandInteraction
    ){
        const link = repo === 'App' ? 'https://github.com/LNReader/lnreader/issues/new/choose'  : 'https://github.com/LNReader/lnreader-plugins/issues/new/choose'
        const embed = new EmbedBuilder()
            .setAuthor({
                name: "LNReader Bot",
                iconURL: "https://avatars.githubusercontent.com/u/81222734?s=200&v=4",
                url: "https://github.com/LNReader"
            })
            .setTitle(`${repo === 'App' ? 'App' : 'Plugins'} issue / request`)
            .setDescription(`To report an issue, click [here](${link}) and follow the instructions.`)
        interaction.followUp({
                embeds: [embed.toJSON()]
            });
    }
}