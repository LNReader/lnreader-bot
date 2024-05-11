'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240511131731 extends Migration {

  async up() {
    this.addSql('create table `plugin` (`id` text not null, `created_at` datetime not null, `updated_at` datetime not null, `name` text not null, `site` text not null, `lang` text not null, `version` text not null, `url` text not null, `icon_url` text not null, primary key (`id`));');
  }

}
exports.Migration20240511131731 = Migration20240511131731;
