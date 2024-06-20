module.exports = async (knex) => {
  return await knex.schema
    .createTable('message_template', function (table) {
      table.increments('templateId').primary();
      table.string('subject').notNullable().unique().index(['subject']);
      table.json('content').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .toSQL();
};
