module.exports = async (knex) => {
  return await knex.schema
    .createTable('recipient', function (table) {
      table.increments('recipientId').primary();
      table.string('email').unique().notNullable().index(['email']);
      table.string('name').notNullable().index(['name']);
      table.string('phone').notNullable();
      table
        .enu('method', ['sms','email'], {
          useNative: true,
          enumName: 'message_method',
        })
        .notNullable();
    })
    .toSQL();
};
