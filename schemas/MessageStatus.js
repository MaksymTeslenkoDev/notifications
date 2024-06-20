module.exports = async (knex) => {
  return await knex.schema
    .createTable('message_status', function (table) {
      table.increments('messageStatusId').primary();
      table.integer('messageId').unsigned().notNullable();
      table
        .foreign('messageId')
        .references('messageId')
        .inTable('message')
        .onDelete('CASCADE');
      table
        .enu('status', ['pending', 'sent', 'failed'], {
          useNative: true,
          enumName: 'message_status',
        })
        .notNullable();
      table.integer('attemptCount').unsigned().notNullable();
      table.string('error').nullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .toSQL();
};
