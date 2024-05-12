import { Slash, SlashChoice, SlashOption } from "@/decorators";
import { Category } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord } from "discordx";

@Discord()
@Category('LNReader')
export default class DataHelperCommand {
    @Slash({name: 'migrate'})
    async migrate(
        @SlashChoice(...['v1.1.19', 'v2.0.0-beta.1'])
        @SlashOption({
            name: 'version',
            description: 'Your current version',
            type: ApplicationCommandOptionType.String,
            localizationSource: 'COMMANDS.MIGRATE.DESCRIPTION'
        })
        version: string,
        interaction: CommandInteraction
    ){
        let instructions = 'Just install the latest version';
        if(version === 'v1.1.19'){
            instructions = `
1. Create v1.1.9 backup
2. Uninstall the current app
3. Download converted file from https://lnreader.github.io/plugins-migration/
4. Install beta
5. Clear app data
6. Download required plugins
7. Bypass cloudflare for all plugins (if needed)
8. Perform legacy restore
            `
        }
        const embed = new EmbedBuilder()
            .setDescription(instructions)
            .setAuthor({
                name: "LNReader Bot",
                iconURL: "https://avatars.githubusercontent.com/u/81222734?s=200&v=4",
                url: "https://github.com/LNReader"
            })
            .setTitle(`Migration from ${version} instructions`)
        interaction.followUp({
            embeds: [embed]
        })
    }
}