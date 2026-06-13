const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.typeAfspraak).delete();

    await knex(tables.typeAfspraak).insert([
        {
            id: 1, 
            name:'Klassieke gelaatsverzorging',
            description:'Een klassieke gelaatsverzorging om het evenwicht van de huid te herstellen en te bewaren aangepast aan uw huidtype.', 
            category_id: 1,
            price: 50, //euro
            time: 60 //min
        },
        {
            id: 2, 
            name:'Intensieve gelaatsverzorging',
            description:'Een intensieve gelaatsverzorging aangepast aan uw huidtype, samen met een ontspannende en verstevigende massage.', 
            category_id: 1,
            price: 70, //euro
            time: 90, //min
        },
        {
            id: 3, 
            name:'Gelaatsverzorging voor de gevoelige huid',
            description:'Een kalmerende en hypoallergene verzorging voor de gevoelige huid.', 
            category_id: 1,
            price: 65, //euro
            time: 60, //min
        },
        {
            id: 4, 
            name:'Gespecialiceerde voetverzorging',
            description:'Voetpad + scrub van de voeten, knippen van de nagels, vijlen , frezen, wegsnijden van eelt en envetueel behandelen van ingegroeide, behandel van eeltpitten en eksterogen.', 
            category_id: 2,
            price: 23, //euro
            time: 60, //min
        },
        {
            id: 5, 
            name:'Lakken van de teennagels ',
            description:'Lakken van teennagels met nagellak naar keuze.', 
            category_id: 2,
            price: 7, //euro
            time: 30, //min
        },
        {
            id: 6, 
            name:'Gespeciaceerde voetverzorging + gellak teennagels',
            description:'zie uitleg Gespeciaceerde voetverzorging + aanbrengen van gellak die tot 6 weken kan blijvenzitten.', 
            category_id: 2,
            price: 38, //euro
            time: 90, //min
        },
        {
            id: 7, 
            name:'Lichte dagmake-up',
            description:'Tijdens deze sessie worden uw troeven in de kijker gezet en uw minpuntjes vakkundig gecamoufleerd.', 
            category_id: 3,
            price: 25, //euro
            time: 30, //min
        },
        {
            id: 8, 
            name:'Avondmake-up',
            description:'Tijdens deze sessie gaan we eerst een extra ampulle aanbrengen zodat uw make-up langer blijft zitten en worden ook uw troeven in de kijker gezet en uw minpuntjes vakkundig gecamoufleerd. Er wordt ook gekeken naar de kledij die je zal dragen voor je feest en de kleuren zullen daar naar aangepast worden.', 
            category_id: 3,
            price: 30, //euro
            time: 30, //min
        },
    ]);
  },
};