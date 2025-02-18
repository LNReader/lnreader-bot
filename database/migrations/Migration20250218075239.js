'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20250218075239 extends Migration {

  async up() {
    this.addSql('alter table `plugin` add column `custom_css` text null;');
    this.addSql('alter table `plugin` add column `custom_js` text null;');
  }

}
exports.Migration20250218075239 = Migration20250218075239;
