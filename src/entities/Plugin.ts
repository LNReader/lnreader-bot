import { Entity, EntityRepository, EntityRepositoryType, FilterQuery, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({customRepository: () => PluginRepository})
export class Plugin {
    [EntityRepositoryType]?: PluginRepository

    @PrimaryKey({autoincrement: false})
    id: string

    @Property()
    name: string

    @Property()
    site: string;

    @Property()
    lang: string;

    @Property()
    version: string;

    @Property()
    url: string;

    @Property()
    iconUrl: string;
}

export class PluginRepository extends EntityRepository<Plugin> {
    public pageSize = 10;
    async findWithPage(page: number, language: string = '', keyword: string = '') {
        language = '%' + language + '%';
        keyword = '%' + keyword + '%';
        const offset = this.pageSize * (page - 1);
        const filterQuery: FilterQuery<Plugin> = {
            $and: [
                { lang: {$like: language} },
                { $or: 
                    [
                        { name: {$like: keyword} },
                        { id: {$like: keyword} },
                        { site: {$like: keyword} }
                    ]
                }
            ]
        }
        return this.findAndCount(filterQuery, {
            limit: this.pageSize,
            offset
        })
    }
}