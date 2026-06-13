const usersService = require('../service/User');

const requireAuthentication = async (ctx, next) => {
    const { authorization } = ctx.headers; 

    const { authToken, ...session } = await usersService.checkAndParseSession(
        authorization
    );

    ctx.state.session = session;
    ctx.state.authToken = authToken;

    return next(); 
};

const makeRequireRole = (role) => async (ctx, next) => {
    const { roles = [] } = ctx.state.session; 
  
    usersService.checkRole(role, roles);
    return next();
};

module.exports = {
    requireAuthentication, 
    makeRequireRole, 
  };