const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.category).delete();

    await knex(tables.category).insert([
        {
            id: 1,
            nameCategory:'Gelaatsverzorging'
        },
        {
            id: 2,
            nameCategory: 'Pedicure'
        },
        {
            id: 3,
            nameCategory: 'Make-up'
        },
    ]);
  },
};           