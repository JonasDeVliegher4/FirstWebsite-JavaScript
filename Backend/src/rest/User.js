const Router = require('@koa/router');
const userService = require('../service/User');
const Joi = require('joi');
const validate = require('../core/validation');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const Role = require('../core/roles');

const login = async (ctx) => {
    const {email, password} = ctx.request.body
    const token = await userService.login(email, password);
    ctx.body = token;
}
login.validationScheme = { 
    body: {
      email: Joi.string().email(),
      password: Joi.string(),
    },
};

const checkUserId = (ctx, next) => {
    const { userId, roles } = ctx.state.session;
    const { id } = ctx.params;
  
    // You can only get our own data unless you're an admin
    if (id !== userId && !roles.includes(Role.ADMIN)) {
      return ctx.throw(
        403,
        "You are not allowed to view this user's information",
        {
          code: 'FORBIDDEN',
        }
      );
    }
    return next();
};

const getAllUsers = async (ctx) => {
    ctx.body = await userService.getAll();
};
getAllUsers.validationScheme = null;

const register = async (ctx) => {
    const token = await userService.register(ctx.request.body);
    ctx.body = token;
    ctx.status = 200;
    
};
register.validationScheme = {
    body: {
        name: Joi.string().max(255),
        email: Joi.string().email(),
        phoneNr: Joi.number().integer(),
        password: Joi.string().min(8).max(30)
    },
};

const getUserById = async (ctx) => {
    ctx.body = await userService.getById(Number(ctx.params.id));
};
getUserById.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
};

const updateUserById = async (ctx) => {
    const users = await userService.updateById(ctx.params.id, ctx.request.body);
    ctx.status = 200;
    ctx.body = users;
};
updateUserById.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
    body: {
        name: Joi.string().max(255),
        email: Joi.string(),
        phoneNr: Joi.number().integer()
    },
};

const deleteUserById = async (ctx) => {
    await userService.deleteById(ctx.params.id);
    ctx.status = 204;
}
deleteUserById.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/user',
  });

  router.post('/login', validate(login.validationScheme), login);
  router.post('/register', validate(register.validationScheme),register);
  
  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get('/', requireAuthentication, requireAdmin, validate(getAllUsers.validationScheme), getAllUsers);
  router.get('/:id', requireAuthentication, validate(getUserById.validationScheme), checkUserId, getUserById);
  router.put('/:id', requireAuthentication, validate(updateUserById.validationScheme), checkUserId, updateUserById);
  router.delete('/:id', requireAuthentication, validate(deleteUserById.validationScheme), checkUserId, deleteUserById);

  app.use(router.routes()).use(router.allowedMethods());
};