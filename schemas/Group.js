module.exports = async (knex) => {
  return await knex.schema
    .createTable('group', function (table) {
      table.increments('groupId').primary();
      table.string('title').unique().notNullable();
    })
    .toSQL();
};
