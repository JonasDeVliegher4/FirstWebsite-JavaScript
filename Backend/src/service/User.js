const ServiceError = require('../core/serviceError');
const userRepository = require('../repository/User')
const handleDBError = require('./_handleDBError');
const Role = require('../core/roles');
const { generateJWT,verifyJWT } = require('../core/jwt');
const { verifyPassword, hashPassword } = require('../core/password');
const config = require('config');
const { getLogger } = require('../core/logging');

const checkAndParseSession = async (authHeader) => {
    if (!authHeader) {
      throw ServiceError.unauthorized('You need to be signed in');
    }   

    if (!authHeader.startsWith('Bearer ')) {
        throw ServiceError.unauthorized('Invalid authentication token');
    }

    const authToken = authHeader.substring(7);

    try {
        const { roles, userId } = await verifyJWT(authToken); 
    
        return {
          roles,
          userId,
          authToken,
        }; 
    } catch (error) {
        getLogger().error(error.message, { error });
        throw new Error(error.message);
    } 
};

const checkRole = (role, roles) => {
    const hasPermission = roles.includes(role);
  
    if (!hasPermission) {
      throw ServiceError.forbidden(
        'You are not allowed to view this part of the application'
      );
    }
};
  

const makeExposedUser = ({id, name, email, phoneNr, roles }) => ({
    id, 
    name, 
    email, 
    phoneNr, 
    roles,
});

const makeLoginData = async (user) => {
    const token = await generateJWT(user);
    return {
        user: makeExposedUser(user),
        token,
    };
};

const login = async (email, password) => {
    const user = await userRepository.findByEmail(email);

    if(!user) {
        throw ServiceError.unauthorized('The given email and password do not match');
    }

    const passwordValid = await verifyPassword(password, user.password_hash); 

    if (!passwordValid) {
        // DO NOT expose we know the user but an invalid password was given
        throw ServiceError.unauthorized(
          'The given email and password do not match'
        );
    }

    return await makeLoginData(user); 
}


const register = async ({name, email, phoneNr, password}) => {
    try {
        const passwordHash = await hashPassword(password);

        const userId = await userRepository.create({
            name, 
            email, 
            phoneNr,
            passwordHash,
            roles: [Role.USER],
        });
        const user = await userRepository.findById(userId);
        return await makeLoginData(user);
    }catch(error){
        throw handleDBError(error);
    }
};

/**
 * Get all users.
 */
const getAll = async () => {
    const items = await userRepository.findAll();
    return {
        items,
        count: items.length,
    };
};


/**
 * Get the user with the given id.
 *
 * @param {number} id - Id of the user to get.
 */
const getById = async (id) => {
    const user = await userRepository.findById(id);

    if(!user) {
        throw ServiceError.notFound(`No user with id ${id} exists`, {id});
    }

    return user
}


/**
 * Update an existing user.
 *
 * @param {number} id - Id of the user to update.
 * @param {object} user - User to save.
 * @param {string} [user.name] - Name of the user.
 * @param {string} [user.email]
 * @param {bigint} [user.phoneNr]
 */
const updateById = async (id, {name, email, phoneNr}) => {
    try {
        await userRepository.updateById(id, {
            name,  
            email, 
            phoneNr, 
        });
        return getById(id);
    } catch(error) {
        throw handleDBError(error);
    }
}

/**
 * Delete an existing user.
 *
 * @param {number} id - Id of the user to delete.
 */
const deleteById = async (id) => {
    try {
        const deleted = await userRepository.deleteById(id);

        if (!deleted){
            throw ServiceError.notFound(`No user with id ${id} exists`, {id});
        }
    } catch (error){
        throw handleDBError(error);
    }
};

module.exports = {
    getAll,
    checkAndParseSession,
    login,
    register,
    checkRole,
    getById,
    updateById,
    deleteById,
  };