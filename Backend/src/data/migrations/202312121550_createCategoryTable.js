const {tables} = require("../index");

module.exports = {
    up: async(knex) => {
        await knex.schema.createTable(tables.category, (table) => {
            table.increments("id");

            table.string("nameCategory", 255).notNullable();
        })
    },
    down:(knex) => {
        return knex.schema.dropTable(tables.category);
    },
};