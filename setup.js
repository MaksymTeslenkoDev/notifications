const config = require('./config.js');
const path = require('node:path');
const knex = require('./lib/knex')({ client: 'pg', connection: config.db });

const DB = path.join(process.cwd(), './db');
const SCHEMAS = path.join(process.cwd(), './schemas');

(async () => {
  await knex.create(SCHEMAS, DB);
})();
