const Router = require('@koa/router');
const installTypeAfspraakRouter = require('./typeAfspraak');
const installUserRouter = require('./User');
const installAfsprakenRouter = require('./afspraken');
const installCategoryRouter = require('./category');

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installCategoryRouter(router);
  installTypeAfspraakRouter(router);
  installUserRouter(router);
  installAfsprakenRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};