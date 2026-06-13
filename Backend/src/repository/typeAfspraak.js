const { getLogger } = require('../core/logging');
const {tables, getKnex} = require('../data/index');



const formatTypeAfspraak = ({
    category_id,
    category_name,
    ...typeAfspraak
}) => {
    return {
        ...typeAfspraak,
        category: {
            id: category_id,
            nameCategory: category_name,
        },
    };
};

const SELECT_COLUMNS = [
    `${tables.typeAfspraak}.id`,
    'name',
    'description',
    `${tables.category}.id as category_id`,
    `${tables.category}.nameCategory as category_name`,
    'price',
    'time',
];

/**
 * Get all typeAfspaken
 *
 */
const findAll = async () => {
    getLogger().info('Finding all type afspraken');
    const typeAfspraak = await getKnex()(tables.typeAfspraak)
    .join(
        tables.category,
        `${tables.category}.id`,
        '=',
        `${tables.typeAfspraak}.category_id`,
    )
    .select(SELECT_COLUMNS)
    .orderBy('name', 'ASC');

    return typeAfspraak.map(formatTypeAfspraak);
};


/**
 * Find a afspraak with the given `name`.
 *
 * @param {string} name - Name to look for.
 */
const findByName = async(name) => {
    const typeAfspraak = await getKnex()(tables.typeAfspraak)
    .join(
        tables.category,
        `${tables.category}.id`,
        '=',
        `${tables.typeAfspraak}.category_id`,
    )
    .where('name', name)
    .select(SELECT_COLUMNS)
    .first();

    return typeAfspraak.map(formatTypeAfspraak);
};

/**
 * Find a transaction with the given `id`.
 *
 * @param {number} id - Id of the transaction to find.
 */
const findById = async (id) => {
    getLogger().info('Quering typeAfspraak by id ' + id );
    /*const typeAfspraak = await getKnex()(tables.typeAfspraak)
    .join(
        tables.category,
        `${tables.category}.id`,
        '=',
        `${tables.typeAfspraak}.category_id`,
    )
    .where('id', id)
    .select(SELECT_COLUMNS)
    .first()

    return typeAfspraak.map(formatTypeAfspraak);*/

    return typeAfspraak = await getKnex()(tables.typeAfspraak).where('id', id).first();
};

const findCount = async () => {
    const [count] = await getKnex()(tables.typeAfspraak).count();
  
    return count['count(*)'];
};

module.exports = {
    findAll,
    findByName,
    findCount,
    findById,
}