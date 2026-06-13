const {tables}= require('../index');

module.exports = {
    up: async(knex) => {
        await knex.schema.createTable(tables.user, (table) => {
            table.increments("id");

            table.string("name", 255).notNullable();
            
            table.string("email").notNullable();

            table.bigInteger("phoneNr").notNullable();
            
            table.unique('email', "idx_users_email_unique");
        })
    },
    down:(knex) => {
        return knex.schema.dropTable(tables.user);
    },
};