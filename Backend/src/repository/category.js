const { getLogger } = require('../core/logging');
const {tables, getKnex} = require('../data/index');


const findAll = async () => {
    getLogger().info('Finding all categories');
    return await getKnex()(tables.category).select().orderBy('nameCategory', 'ASC');
};

const findByName = async(name) => {
    return await getKnex()(tables.category).where('nameCategory', name).first();
};


const findById = async (id) => {
    getLogger().info('Quering category by id', { id });
    return await getKnex()(tables.category).where('id', id).first();
};

const findCount = async () => {
    const [count] = await getKnex()(tables.category).count();
  
    return count['count(*)'];
};

module.exports = {
    findAll,
    findByName,
    findCount,
    findById,
}