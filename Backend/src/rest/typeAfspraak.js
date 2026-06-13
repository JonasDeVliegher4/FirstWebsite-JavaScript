const Router = require('@koa/router');
const typeAfspraakService = require('../service/typeAfspraak');
const Joi = require('joi');

const validate = require('../core/validation');

const getAllTypeAfspraken = async(ctx) => {
    ctx.body = await typeAfspraakService.getAll();
}
getAllTypeAfspraken.validationScheme = null;

const getTypeAfsprakenById = async (ctx) => {
    ctx.body = await typeAfspraakService.getById(Number(ctx.params.id));
}
getTypeAfsprakenById.validationScheme = {
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
        prefix: '/typeAfspraak',
    });

    router.get('/', validate(getAllTypeAfspraken.validationScheme),getAllTypeAfspraken);
    router.get('/:id', validate(getTypeAfsprakenById.validationScheme),getTypeAfsprakenById);

    app.use(router.routes()).use(router.allowedMethods());
};