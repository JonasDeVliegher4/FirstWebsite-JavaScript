const afsprakenRepository = require('../repository/afspraken')
const usersService = require('./User');
const typeAfspraakService = require('./typeAfspraak');
const ServiceError = require('../core/serviceError');
const handleDBError = require('./_handleDBError');
const { getLogger } = require('../core/logging');

const getAll = async (userId) => {
    const items = await afsprakenRepository.findAll(userId);
    const count = await afsprakenRepository.findCount(userId);
    return {
        items,
        count,
    };
};

const getAfsprakenForAdmin = async () => {
   
    const items = await afsprakenRepository.findAllAdmin();
    return {
        items,
    };
};

const getById = async (id, userId) => {
   const afspraken = await afsprakenRepository.findById(id);

   if(!afspraken || afspraken.userId !== userId){
    throw ServiceError.notFound(`No appointment with id ${id} exists`, {id});
   }

   return afspraken;
}

const getByDate = async (date) => {
    return afspraken = await afsprakenRepository.findAfsprakenByDate(date);
}

const create = async ({date_StartTime, userId, typeAfspraakId}) => {
    getLogger().info("id " + typeAfspraakId);
    const existingTypeAfspraak = await typeAfspraakService.getById(typeAfspraakId);

    if(!existingTypeAfspraak) {
        throw ServiceError.notFound(`There is no type afspraak with id ${id}.`, {id});
    }
    
    // check voor afspraak overlap
    try{
        const id = await afsprakenRepository.create({
            date_StartTime,
            userId,
            typeAfspraakId
        });
        getLogger().info(id)
        return getById(id);
    } catch(error){
        throw handleDBError(error);
    }
};

const  updateById = async(id, { date_StartTime, userId, typeAfspraakId}) => {
    if(userId) {
        const existingUser = await usersService.getById(userId);

        if(!existingUser) {
            throw ServiceError.notFound(`There is no user with id ${id}.`, {id});
        }
    }

    if(typeAfspraakId){
        const existingTypeAfspraak = await typeAfspraakService.getById(typeAfspraakId);

        if(!existingTypeAfspraak){
            throw ServiceError.notFound(`There is no type afspraak with id ${id}`, {id});
        }
    }

    try{ 
        await afsprakenRepository.updateById(id, {
            date_StartTime, 
            typeAfspraakId,
            userId,
        });
        return getById(id);
    } catch (error){
        throw handleDBError(error);
    }
};

const deleteById = async (id) => {
    try {
        const deleted = await afsprakenRepository.deleteById(id);

        if(!deleted) {
            throw ServiceError.notFound(`No afspraken with id ${id} exists`, { id });
        }
    } catch (error) {
        throw handleDBError(error);
    }
};

module.exports = {
    getAll,
    getAfsprakenForAdmin,
    getById,
    getByDate,
    create,
    updateById,
    deleteById,
};
  


