const {tables} = require('..')

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.afspraken, (table) => {
            table.increments('id');

            table.dateTime('date_StartTime').notNullable();

            table.integer('user_id').unsigned().notNullable();
            table
                .foreign('user_id', 'fk_afspraken_user')
                .references(`${tables.user}.id`)
                .onDelete('CASCADE');
            
            table.integer('typeAfspraak_id').unsigned().notNullable();
            table
                .foreign('typeAfspraak_id', 'fk_afspraak_typeafspraak')
                .references(`${tables.typeAfspraak}.id`)
                .onDelete('CASCADE');
        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.afspraken);
    },
};