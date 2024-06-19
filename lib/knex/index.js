'use strict';

const create = require('./create');

module.exports = (db) => {
  const knex = require('knex')(db);
  return {
    create:create(knex)
  }
};
