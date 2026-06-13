const Router = require('@koa/router');
const categoryService = require('../service/category');
const Joi = require('joi');

const validate = require('../core/validation');

const getAllCategories = async(ctx) => {
    ctx.body = await categoryService.getAll();
}
getAllCategories.validationScheme = null;

const getCategoryById = async (ctx) => {
    ctx.body = await categoryService.getById(Number(ctx.params.id));
}
getCategoryById.validationScheme = {
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
        prefix: '/category',
    });

    router.get('/', validate(getAllCategories.validationScheme), getAllCategories);
    router.get('/:id', validate(getCategoryById.validationScheme),getCategoryById);

    app.use(router.routes()).use(router.allowedMethods());
};