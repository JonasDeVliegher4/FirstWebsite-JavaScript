const { tables} = require('../../src/data');
const { withServer, login } = require('../supertest.setup');
const { testAuthHeader } = require('../common/auth');

const data = {
    afspraken: [{
        id:1,
        date_StartTime: new Date(2023, 12, 23, 17, 0),
        user_id:1,
        typeAfspraak_id:1,
    },
    {
        id:2,
        date_StartTime: new Date(2023, 12, 24, 18, 30),
        user_id:1,
        typeAfspraak_id:1,
    },
    {
        id:3,
        date_StartTime: new Date(2023, 12, 25, 17, 0),
        user_id:1,
        typeAfspraak_id:1
    }],
    typeAfspraken: [{
        id: 1, 
        name:'test',
        description:'test', 
        category_id: 1,
        price: 1, 
        time:1
    }],
    categorys: [{
        id: 1,
        nameCategory:"test"
    }],
};

const dataToDelete = {
    afspraken: [1, 2, 3],
    typeAfspraken: [1],
    categorys: [1],
};


describe('Afspraken', () => {
    let request;
    let knex;
    let authHeader; 

    withServer(({
        supertest,
        knex: k,
      }) => {
        request = supertest;
        knex = k;
    });

    beforeAll(async () => {
        authHeader = await login(request);
    })

    const url = "/api/afspraken";

    describe('GET /api/afspraken', () => { 

        beforeAll(async () => {
            await knex(tables.category).insert(data.categorys);
            await knex(tables.typeAfspraak).insert(data.typeAfspraken);
            await knex(tables.afspraken).insert(data.afspraken);    
        });

        afterAll(async () =>{
            await knex(tables.afspraken)
                .whereIn('id', dataToDelete.afspraken)
                .delete();

            await knex(tables.typeAfspraak)
                .whereIn('id', dataToDelete.typeAfspraken)
                .delete();
            await knex(tables.category)
                .whereIn('id', dataToDelete.categorys)
                .delete();
        });

        it('should 200 and return all afspraken', async () => {
          const response = await request.get(url)
            .set('Authorization', authHeader);

          expect(response.status).toBe(200); 
          expect(response.body.items.length).toBe(3);

          expect(response.body.items[2]).toEqual({
            id:3,
            date_StartTime: new Date(2023, 12, 25, 17, 0).toJSON(),
            user: {
                id: 1,
                name: 'Test User',
            },
            typeAfspraak: {
                id: 1, 
                name:'test',
            }
          });
          expect(response.body.items[0]).toEqual({
            id:1,
            date_StartTime: new Date(2023, 12, 23, 17, 0).toJSON(),
            user: {
                id: 1,
                name: 'Test User',
            },
            typeAfspraak: {
                id: 1, 
                name:'test',
            },
          });
        });

        it('should 400 when given an argument', async () => {
            const response = await request.get(`${url}?invalid=true`).set('Authorization', authHeader);

            expect(response.statusCode).toBe(400);
            expect(response.body.code).toBe('VALIDATION_FAILED');
            expect(response.body.details.query).toHaveProperty('invalid');
        });

        testAuthHeader(()=> request.get(`${url}`));
    });

    describe('GET /api/afspraken/:id', () => {

        beforeAll(async () => {
            await knex(tables.category).insert(data.categorys);
            await knex(tables.typeAfspraak).insert(data.typeAfspraken);
            await knex(tables.afspraken).insert(data.afspraken);    
        });

        afterAll(async () =>{
            await knex(tables.afspraken)
                .whereIn('id', dataToDelete.afspraken)
                .delete();

            await knex(tables.typeAfspraak)
                .whereIn('id', dataToDelete.typeAfspraken)
                .delete();
            await knex(tables.category)
                .whereIn('id', dataToDelete.categorys)
                .delete();
        });

        it('should 200 and return the requested afspraken', async () => {
            const response = await request.get(`${url}/1`).set('Authorization', authHeader);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                id:1,
                date_StartTime: new Date(2023, 12, 23, 17, 0).toJSON(),
                typeAfspraak_id: 1,
                user_id: 1,
            });
        });

        it('should 404 when requesting not existing afspraken', async () => {
            const response = await request.get(`${url}/4`).set('Authorization', authHeader);

            expect(response.statusCode).toBe(404);
            expect(response.body).toMatchObject({
                code: 'NOT_FOUND',
                message: 'No appointment with id 4 exists',
                details: {
                    id: 4,
                },
            });
            expect(response.body.stack).toBeTruthy();
        });

        it('should 400 with invalid afspraken id', async () => {
            const response = await request.get(`${url}/invalid`).set('Authorization', authHeader);
      
            expect(response.statusCode).toBe(400);
            expect(response.body.code).toBe('VALIDATION_FAILED');
            expect(response.body.details.params).toHaveProperty('id');
        });

        testAuthHeader(()=> request.get(`${url}/4`));
    });


    describe('POST /api/afspraken', () => {
        const afsprakenToDelete = [];
        

        beforeAll(async () => {
            await knex(tables.category).insert(data.categorys);
            await knex(tables.typeAfspraak).insert(data.typeAfspraken);
        });

        afterAll(async () => {
            await knex(tables.afspraken)
                .whereIn('id', dataToDelete.afspraken)
                .delete();

            await knex(tables.typeAfspraak)
                .whereIn('id', dataToDelete.typeAfspraken)
                .delete();
            await knex(tables.category)
                .whereIn('id', dataToDelete.categorys)
                .delete();
        });

        /*it('should 201 and return the created afspraken', async () => {
           
            const response = await request.post(url).set('Authorization', authHeader)
              .send({
                date_StartTime:'2023-12-27T17:00:00.000Z',
                typeAfspraakId: 1,
            });
            
            expect(response.status).toBe(201);
            expect(response.body.id).toBeTruthy();
            expect(response.body.date_StartTime).toEqual('2023-12-27T17:00:00.000Z');
            expect(response.body.typeAfspraak_id).toEqual(1);
            expect(response.body.user_id).toEqual(1);

            afsprakenToDelete.push(response.body.id);
        });*/

        it('should 400 when missing date', async () => {
            const response = await request.post(url).set('Authorization', authHeader)
              .send({
                typeAfspraakId: 1,
              });
      
            expect(response.statusCode).toBe(400);
            expect(response.body.code).toBe('VALIDATION_FAILED');
            expect(response.body.details.body).toHaveProperty('date_StartTime');
        });
        testAuthHeader(()=> request.post(url));
    });

    describe('PUT /api/transactions/:id', () => {

        beforeAll(async () => {
            await knex(tables.category).insert(data.categorys);
            await knex(tables.typeAfspraak).insert(data.typeAfspraken);
            await knex(tables.afspraken).insert(data.afspraken);    
        });

        afterAll(async () =>{
            await knex(tables.afspraken)
                .whereIn('id', dataToDelete.afspraken)
                .delete();

            await knex(tables.typeAfspraak)
                .whereIn('id', dataToDelete.typeAfspraken)
                .delete();
            await knex(tables.category)
                .whereIn('id', dataToDelete.categorys)
                .delete();
        });

        it('should 200 and return the updated transaction', async () => {
            const response = await request.put(`${url}/1`).set('Authorization', authHeader)
            .send({
                date_StartTime:'2024-12-27T17:00:00.000Z',
                typeAfspraakId: 1,
                userId: 1,
            });

            expect(response.status).toBe(200);
            expect(response.body.id).toBeTruthy();
            expect(response.body.date_StartTime).toBe('2024-12-27T17:00:00.000Z');
            expect(response.body.typeAfspraak_id).toEqual(1);
            expect(response.body.user_id).toEqual(1);
        });

        it('should 400 when missing date', async () => {
            const response = await request.put(`${url}/4`).set('Authorization', authHeader)
              .send({
                typeAfspraakId: 1,
              });
      
            expect(response.statusCode).toBe(400);
            expect(response.body.code).toBe('VALIDATION_FAILED');
            expect(response.body.details.body).toHaveProperty('date_StartTime');
        });

        it('should 400 when missing typeAfspraakId', async () => {
            const response = await request.put(`${url}/4`).set('Authorization', authHeader)
            .send({
                date_StartTime:'2024-12-27T17:00:00.000Z',
              });
      
            expect(response.statusCode).toBe(400);
            expect(response.body.code).toBe('VALIDATION_FAILED');
            expect(response.body.details.body).toHaveProperty('typeAfspraakId');
        });
        
        testAuthHeader(()=> request.put(`${url}/4`));
    });

    describe('DELETE /api/afspraken/:id', () => {
        beforeAll(async () => {
            await knex(tables.category).insert(data.categorys);
            await knex(tables.typeAfspraak).insert(data.typeAfspraken);
            await knex(tables.afspraken).insert(data.afspraken);    
        });

        afterAll(async () =>{
            await knex(tables.afspraken)
                .whereIn('id', dataToDelete.afspraken)
                .delete();
            await knex(tables.typeAfspraak)
                .whereIn('id', dataToDelete.typeAfspraken)
                .delete();
            await knex(tables.category)
                .whereIn('id', dataToDelete.categorys)
                .delete();
        });

        it('should 204 and return nothing', async () => {
            const response = await request.delete(`${url}/1`).set('Authorization', authHeader);
      
            expect(response.statusCode).toBe(204);
            expect(response.body).toEqual({});
        });

        it('should 404 with not existing afspraak', async () => {
            const response = await request.delete(`${url}/4`).set('Authorization', authHeader);
      
            expect(response.statusCode).toBe(404);
            expect(response.body).toMatchObject({
              code: 'NOT_FOUND',
              message: 'No afspraken with id 4 exists',
              details: {
                id: 4,
              },
            });
            expect(response.body.stack).toBeTruthy();
        });

        it('should 400 with invalid afspraken id', async () => {
            const response = await request.delete(`${url}/invalid`).set('Authorization', authHeader);
      
            expect(response.statusCode).toBe(400);
            expect(response.body.code).toBe('VALIDATION_FAILED');
            expect(response.body.details.params).toHaveProperty('id');
        });
        testAuthHeader(()=> request.delete(`${url}/4`));
    });
});

