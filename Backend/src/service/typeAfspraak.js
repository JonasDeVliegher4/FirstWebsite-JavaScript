const typeAfspraakRepository = require('../repository/typeAfspraak');
const ServiceError = require('../core/serviceError');



const getAll = async () => {
    const items = await typeAfspraakRepository.findAll();
    return {
        items,
        count: items.length,
    };
};

const getById = async (id) => {
    const typeAfspraak = await typeAfspraakRepository.findById(id);

    if(!typeAfspraak){
        throw ServiceError.notFound(`No type afspraak with id ${id} exists`, { id });
    }

    return typeAfspraak;
}

module.exports = {getAll, getById}