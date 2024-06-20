const fs = require('node:fs').promises;
const path = require('node:path');

const sqlToString = (sql) => sql.map((item) => item.sql).join(';\n');

module.exports = (knex) => async (schemas, db) => {
  const schemasDir = await fs.readdir(schemas);
  const sqls = [];
  for (const schema of schemasDir) {
    if (!schema.endsWith('.js')) continue;
    const schemaPath = `${schemas}/${schema}`;
    const sql = await require(schemaPath)(knex);
    sqls.push(sqlToString(sql));
    sqls.push('\n');
  }
  await fs.writeFile(path.join(db, 'structure.sql'), sqls.join('\n'));
};
