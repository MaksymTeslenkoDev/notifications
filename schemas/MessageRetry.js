module.exports = async (knex) => {
  return await knex.schema
    .createTable('message_retry', function (table) {
      table.increments('retryId').primary();
      table.integer('messageId').unsigned().notNullable();
      table
        .foreign('messageId')
        .references('messageId')
        .inTable('message')
        .onDelete('CASCADE');
      table.timestamp('retryAt').notNullable();
      table.boolean('isCancelled').defaultTo(false);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .toSQL();
};
