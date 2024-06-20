module.exports = async (knex) => {
  return await knex.schema
    .createTable('message', function (table) {
      table.increments('messageId').primary();
      table
        .enum('sendBy', null, {
          useNative: true,
          existingType: true,
          enumName: 'message_method',
        })
        .notNullable();
      table.integer('attemptCount').unsigned().notNullable().defaultTo(1);
      table.integer('recipientId').unsigned().notNullable();
      table
        .foreign('recipientId')
        .references('recipientId')
        .inTable('recipient')
        .onDelete('CASCADE');
      table.integer('templateId').unsigned().notNullable();
      table
        .foreign('templateId')
        .references('templateId')
        .inTable('message_template')
        .onDelete('CASCADE');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .toSQL();
};
