const categoryRepository = require('../repository/category');
const ServiceError = require('../core/serviceError');



const getAll = async () => {
    const items = await categoryRepository.findAll();
    return {
        items,
        count: items.length,
    };
};

const getById = async (id) => {
    const category = await categoryRepository.findById(id);

    if(!category){
        throw ServiceError.notFound(`No type afspraak with id ${id} exists`, { id });
    }

    return category;
}

module.exports = {getAll, getById}