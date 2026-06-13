const {getLogger } =require('../core/logging');
const {tables, getKnex} = require('../data/index');


/**
 * Find all users.
 */
const findAll = async() => {
    getLogger().info('Finding all users');
    return await getKnex()(tables.user).select().orderBy('name', 'ASC');
  };

  /**
 * Calculate the total number of users.
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.user).count();
  return count['count(*)'];
};

  /**
 * Find a users with the given `name`.
 *
 * @param {string} name - Name to look for.
 */
const findByName = async (name) => {
    return await getKnex()(tables.user).where('name', name).first();
  };

  const findByEmail = async (email) => {
    return await getKnex()(tables.user).where('email', email).first();
  };


  /**
 * Find a users with the given `id`.
 *
 * @param {number} id - Id of the place to find.
 */
const findById = async (id) => {
    getLogger().info('Querying users by id ' + id );
    return await getKnex()(tables.user).where('id', id).first();
  };
  
  /**
 * Create a new place with the given `name` and `rating`.
 *
 * @param {object} user
 * @param {string} user.name
 * @param {string} user.email 
 * @param {number} [user.phoneNr]

 * @returns {Promise<number>} Created place's id
 */
const create = async ({ name, email, phoneNr, passwordHash, roles,}) => {
    try {
      const [id] = await getKnex()(tables.user).insert({
        name,
        email,
        phoneNr,
        password_hash: passwordHash,
        roles: JSON.stringify(roles),
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
 * Update an existing place with the given `name` and `rating`.
 *
 * @param {number} id - Id of the place to update.
* @param {object} user
 * @param {string} [user.name]
 * @param {string} [user.email] 
 * @param {number} [user.phoneNr]
 * @returns {Promise<number>} Place's id
 */
const updateById = async (id, { name, email, phoneNr  }) => {
    try {
      await getKnex()(tables.user)
        .update({
          name,
          email,
          phoneNr
        })
        .where('id', id);
  
      return id;
    } catch (error) {
      getLogger().error('Error in updateById', {
        error,
      });
      throw error;
    }
};
  
/**
* Delete a place.
*
* @param {number} id - Id of the place to delete.
*
* @returns {Promise<boolean>} Whether the place was deleted.
*/
const deleteById = async (id) => {
    try {
      const rowsAffected = await getKnex()(tables.user).delete().where('id', id);
  
      return rowsAffected > 0;
    } catch (error) {
      getLogger().error('Error in deleteById', {
        error,
      });
      throw error;
    }
};

module.exports = {
    findAll,
    findCount,
    findById,
    findByName,
    findByEmail,
    create,
    updateById,
    deleteById,
};
  