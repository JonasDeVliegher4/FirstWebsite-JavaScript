const { tables} = require('../../src/data');
const { withServer, login, loginAdmin } = require('../supertest.setup');

const data = {
    categorys: [
    {
        id: 1,
        nameCategory:"test1"
    },
    {
        id: 2,
        nameCategory:"test2"
    },
    {
        id: 3,
        nameCategory:"test3"
    },
]};

const dataToDelete = {
    categorys: [1, 2, 3],
};


describe('Categorys', () => {

    let request, knex, authHeader, adminAuthHeader;
  
      withServer(({
      supertest,
      knex: k,
    }) => {
      request = supertest;
      knex = k;
    });
  
    beforeAll(async () => {
      authHeader = await login(request);
      adminAuthHeader = await loginAdmin(request);
    });
      
    const url = '/api/category';
  
    describe('GET /api/category', () => {
          
      beforeAll(async () => {
        await knex(tables.category).insert(data.categorys);
      });
  
      afterAll(async () => {
        await knex(tables.category)
          .whereIn('id', dataToDelete.categorys)
          .delete();
      });
  
      it('should 200 and return all typeAfspraken', async () => {
        const response = await request.get(url);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.items.length).toBe(3);
        expect(response.body.items).toEqual(expect.arrayContaining([
          {
            id: 1, 
            nameCategory:'test1',
          },
          {
            id: 2, 
            nameCategory:'test2',
          },
          {
            id:3,
            nameCategory:'test3',
          }
        ]));
      });
  
          it('should 400 when given an argument', async () => {
              const response = await request.get(`${url}?invalid=true`);
        
              expect(response.statusCode).toBe(400);
              expect(response.body.code).toBe('VALIDATION_FAILED');
              expect(response.body.details.query).toHaveProperty('invalid');
          });
    });
  
    describe('GET /api/category/:id', () => {
  
      beforeAll(async () => {
        await knex(tables.category).insert(data.categorys);
      });
      
      afterAll(async () => {
        await knex(tables.category)
          .whereIn('id', dataToDelete.categorys)
          .delete();
      });
      
      it('should 200 and return the requested typeAfspraak', async () => {
        const response = await request.get(`${url}/1`);
      
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          id: 1, 
          nameCategory:'test1',
        });
      });
      
      it('should 404 when requesting not existing typeAfspraak', async () => {
        const response = await request.get(`${url}/4`);
      
        expect(response.statusCode).toBe(404);
        expect(response.body).toMatchObject({
          code: 'NOT_FOUND',
          message: "No type afspraak with id 4 exists",
          details: {
            id: 4,
          },
        });
        expect(response.body.stack).toBeTruthy();
      });
      
      it('should 400 with invalid typeAfspraak id', async () => {
        const response = await request.get(`${url}/invalid`);
      
        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe('VALIDATION_FAILED');
        expect(response.body.details.params).toHaveProperty('id');
      });
    });
  });