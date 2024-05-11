import { Entity, EntityRepository, EntityRepositoryType, PrimaryKey, Property } from "@mikro-orm/core";

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
}