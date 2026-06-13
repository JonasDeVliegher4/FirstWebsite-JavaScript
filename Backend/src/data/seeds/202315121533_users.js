const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
    seed: async (knex) => {
        await knex(tables.user).delete();
    
        // then add the fresh users (all passwords are 12345678)
        await knex(tables.user).insert([
            {
                id:1,
                name:"Sofie Vervaet",
                email:"vervaetsofie@gmail.com",
                phoneNr: 32472464939,
                password_hash:
                    '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
                roles: JSON.stringify([Role.ADMIN, Role.USER]),
            },
            {
                id:2,
                name:"Jonas De Vliegher",
                email:"devliegherjonas@gmail.com",
                phoneNr: 32468189394,
                password_hash: 
                    '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
                roles: JSON.stringify([Role.USER]),
            },
            {
                id:3,
                name:"Kris De Vliegher",
                email:"krisdevliegher@gmail.com",
                phoneNr: 32473249494,
                password_hash:
                    '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
                roles: JSON.stringify([Role.USER]),
            },
        ]);
    },
};