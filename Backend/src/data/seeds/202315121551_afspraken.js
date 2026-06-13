const { tables } = require('..');

module.exports = {
    seed: async (knex) => {
        await knex(tables.afspraken).delete();
    
        await knex(tables.afspraken).insert([
            {
                id:1,
                date_StartTime: new Date(2024, 8, 6, 17, 0),
                user_id:3,
                typeAfspraak_id:2,
            },
            {
                id:2,
                date_StartTime: new Date(2024, 8, 4, 18, 30),
                user_id:2,
                typeAfspraak_id:4,
            },
            {
                id:3,
                date_StartTime: new Date(2024, 8, 1, 15, 0),
                user_id:3,
                typeAfspraak_id:6
            },
            {
                id:4,
                date_StartTime: new Date(2024, 8, 1, 20, 0),
                user_id:2,
                typeAfspraak_id:8
            },
        ]);
    },
};