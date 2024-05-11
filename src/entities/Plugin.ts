import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./BaseEntity";

@Entity()
export class Plugin extends CustomBaseEntity {
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
