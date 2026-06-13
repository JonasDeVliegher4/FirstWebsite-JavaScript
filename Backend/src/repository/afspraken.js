const {getLogger} = require('../core/logging');
const { tables, getKnex } = require('../data/index');


const formatAfspraken = ({
    user_id,
    user_name,
    typeAfspraak_id,    
    typeAfspraak_name,
    ...afspraken
}) => {
    return {
        ...afspraken,
        user: {
            id: user_id,
            name: user_name,
        },
        typeAfspraak: {
            id: typeAfspraak_id,
            name: typeAfspraak_name,
        },
    };
};

const SELECT_COLUMNS = [
    `${tables.afspraken}.id`,
    'date_StartTime',
    `${tables.typeAfspraak}.id as typeAfspraak_id`,
    `${tables.typeAfspraak}.name as typeAfspraak_name`,
    `${tables.user}.id as user_id`,
    `${tables.user}.name as user_name`,

];

/**
 * Get all afspraken
 *
 */
const findAll = async (userId) => {
    getLogger().info('Quering afspraken for user');
    const afspraken = await getKnex()(tables.afspraken)
     .join(
        tables.typeAfspraak,
        `${tables.typeAfspraak}.id`,
        '=',
        `${tables.afspraken}.typeAfspraak_id`,
        
     )
     .join(
        tables.user,
        `${tables.user}.id`,
        '=',
        `${tables.afspraken}.user_id`,
     )
     .where(`${tables.afspraken}.user_id`, userId)
     .select(SELECT_COLUMNS)
     .orderBy('date_StartTime', 'ASC');

    return afspraken.map(formatAfspraken);

};

const findAllAdmin = async () => {
  getLogger().info('Quering afspraken for admin');
  const afspraken = await getKnex()(tables.afspraken)
  .join(
     tables.typeAfspraak,
     `${tables.typeAfspraak}.id`,
     '=',
     `${tables.afspraken}.typeAfspraak_id`,
     
  )
  .join(
     tables.user,
     `${tables.user}.id`,
     '=',
     `${tables.afspraken}.user_id`,
  )
  .select(SELECT_COLUMNS)
  .orderBy('date_StartTime', 'ASC');

  return afspraken.map(formatAfspraken);
}


/**
 * Calculate the total number of fspraken.
 *
 */
const findCount = async (userId) => {
    const [count] = await getKnex()(tables.afspraken)
    .count()
    .where(`${tables.afspraken}.user_id`, userId);
  
    return count['count(*)'];
  };

/**
 * Find a afspraken with the given `id`.
 *
 * @param {number} id - Id of the afspraken  to find.
 */
const findById = async (id) => {
  getLogger().info('Quering Afspraken by id ' + id);
  /*const afspraken = await getKnex()(tables.afspraken)
     .join(
        tables.typeAfspraak,
        `${tables.typeAfspraak}.id`,
        '=',
        `${tables.afspraken}.typeAfspraak_id`,
        
     )
     .join(
        tables.user,
        `${tables.user}.id`,
        '=',
        `${tables.afspraken}.user_id`,
     )
     .where(`${tables.afspraken}.id`, id)
     .first(SELECT_COLUMNS);
  
    return afspraken && formatAfspraken(afspraken);*/

    return await getKnex()(tables.afspraken).where('id', id).first();
  };


  const findAfsprakenByDate = async (date) => {
    getLogger().info('Quering tijden by date');
    
    const dateStr = (date instanceof Date) ? date.toISOString() : date;

    // Zorg ervoor dat 'date' alleen het datumgedeelte bevat
    const formattedDate = dateStr.split('T')[0]; 

    const afspraken = await getKnex()(tables.afspraken)
      .whereRaw('DATE(date_StartTime) = ?', [formattedDate])
      .orderBy('date_StartTime', 'ASC');

    return afspraken;
  }

  /**
 * Create a new Afspraak.
 *
 * @param {object} afspraken - The afspraak to create.
 * @param {Date} datum_StartTime
 * @param {number} afspraken.typeAfspraakId
 * @param {number} afspraken.userId 
 *
 * @returns {Promise<number>} 
 */
const create = async ({ date_StartTime, userId, typeAfspraakId}) => {
    getLogger().info('Quering creating a Afspraak');
    try {
      const [id] = await getKnex()(tables.afspraken).insert({
        date_StartTime, 
        user_id: userId,
        typeAfspraak_id: typeAfspraakId
      });
      return id;
    } catch (error) {
      getLogger().error('Error in create', {
        error,
      });
      throw error;
    }
};

/**
 * Update an existing afspraken.
 *
 * @param {number} id 
 * @param {object} afspraken
 * @param {Date} date_StartTime
 * @param {number} [afspraken.typeAfspraakId]
 * @param {number} [afspraken.userId] 
 *
 * @returns {Promise<number>}
 */
const updateById = async (id, { date_StartTime, typeAfspraakId, userId }) => {
    try {
      await getKnex()(tables.afspraken)
        .update({
          date_StartTime,
          user_id: userId, 
          typeAfspraak_id: typeAfspraakId,
        })
        .where(`${tables.afspraken}.id`, id);
      return id;
    } catch (error) {
      getLogger().error('Error in updateById', {
        error,
      });
      throw error;
    }
  };
  
  /**
   * Delete a afspraken with the given `id`.
   *
   * @param {number} id 
   * @param {number} userId 
   *
   * @returns {Promise<boolean>} 
   */
  const deleteById = async (id) => {
    try {
      const rowsAffected = await getKnex()(tables.afspraken)
        .where(`${tables.afspraken}.id`, id)
        .delete();
  
      return rowsAffected > 0;
    } catch (error) {
      getLogger().error('Error in deleteById', {
        error,
      });
      throw error;
    }
  };
 

  //const findFutureAfsraken = async()
  
  module.exports = {
    findAll,
    findAllAdmin,
    findCount,
    findById,
    findAfsprakenByDate,
    create,
    updateById,
    deleteById,
  };
