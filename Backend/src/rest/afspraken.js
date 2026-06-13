const Router = require('@koa/router');
const afsprakenRepository = require('../service/afspraken');
const Joi = require('joi');
const validate = require('../core/validation');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const { getLogger } = require('../core/logging');
const roles = require('../core/roles');

const getAllAfspraken = async (ctx) => {
    const { userId } = ctx.state.session;
    ctx.body = await afsprakenRepository.getAll(userId);
};
getAllAfspraken.validationScheme = null;

const getAfsprakenAdmin = async (ctx) => {
    ctx.body = await afsprakenRepository.getAfsprakenForAdmin();
};
getAfsprakenAdmin.validationScheme = null;

const createAfspraken = async (ctx) => {
    const newAfspraken = await afsprakenRepository.create({
        ...ctx.request.body,
        date_StartTime: new Date(ctx.request.body.date_StartTime),
        userId: ctx.state.session.userId,
        typeAfspraakId: Number(ctx.request.body.typeAfspraakId),
    });
    ctx.status = 201;
    ctx.body = newAfspraken;
};
createAfspraken.validationScheme = {
    body: {
        typeAfspraakId: Joi.number().integer().positive().required(),
        date_StartTime: Joi.date().iso().greater('now').required(),
    },
};

const getAfsprakenById = async (ctx) => {
    ctx.body = await afsprakenRepository.getById(Number(ctx.params.id));
};
getAfsprakenById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required(),
    }),
};

const getAfsprakenByDate = async (ctx) => {
    const date = ctx.params.date;
    ctx.body = await afsprakenRepository.getByDate(date);
}
getAfsprakenByDate.validationScheme = {
    params : Joi.object({
        date: Joi.date().iso().required(),
    }),
};

const updateAfspraken = async (ctx) => {
    ctx.body = await afsprakenRepository.updateById(Number(ctx.params.id), {
        ...ctx.request.body,
        date_StartTime: new Date(ctx.request.body.date_StartTime),
        userId: Number(ctx.request.body.userId),
        typeAfspraakId: Number(ctx.request.body.typeAfspraakId),
    });
};
updateAfspraken.validationScheme = {
    params: {
        id: Joi.number().integer().positive().required(),
    },
    body: {
        date_StartTime: Joi.date().iso().greater('now').required(),
        typeAfspraakId: Joi.number().integer().positive().required(),
        userId: Joi.number().integer().positive().required(),
    },
};

const deleteAfspraken = async (ctx) => {
    await afsprakenRepository.deleteById(ctx.params.id);
    ctx.status = 204;
};
deleteAfspraken.validationScheme = {
    params: {
        id: Joi.number().integer().positive().required(),
    },
};


/**
 * Install afspraken routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
    const router = new Router({
      prefix: '/afspraken',
    });

    const requireAdmin = makeRequireRole(roles.ADMIN);

    router.get(
        '/', requireAuthentication,
        validate(getAllAfspraken.validationScheme), 
        getAllAfspraken
    );
    router.get(
        '/admin', requireAuthentication,
        validate(getAfsprakenAdmin.validationScheme),
        getAfsprakenAdmin
    );
    router.post(
        '/', requireAuthentication,
        validate(createAfspraken.validationScheme),
        createAfspraken
    );
    router.get( 
        '/:id', requireAuthentication,
        validate(getAfsprakenById.validationScheme), 
        getAfsprakenById
    );
    router.get(
        '/date/:date', requireAuthentication,
        validate(getAfsprakenByDate.validationScheme),
        getAfsprakenByDate
    )
    router.put(
        '/:id', requireAuthentication,
        validate(updateAfspraken.validationScheme), 
        updateAfspraken
    );
    router.delete(
        '/:id', requireAuthentication,
        validate(deleteAfspraken.validationScheme), 
        deleteAfspraken
    );

    app.use(router.routes()).use(router.allowedMethods());
};