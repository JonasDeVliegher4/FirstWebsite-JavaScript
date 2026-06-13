const {tables} = require("../index");

module.exports = {
    up: async(knex) => {
        await knex.schema.createTable(tables.typeAfspraak, (table) => {
            table.increments("id");

            table.string("name", 255).notNullable();
            

            table.string("description",500).notNullable();

            table.integer("category_id").unsigned().notNullable();

            table
                .foreign('category_id', 'fk_typeafspraak_category')
                .references(`${tables.category}.id`)
                .onDelete('CASCADE');

            table.integer("price").notNullable();

            table.integer("time").notNullable();

            table.unique("name", "idx_typeafspraak_name_unique");
        })
    },
    down:(knex) => {
        return knex.schema.dropTable(tables.typeAfspraak);
    },
};