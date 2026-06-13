const { tables} = require('../../src/data');
const Role = require('../../src/core/roles');
const { withServer, login, loginAdmin } =  require('../supertest.setup');
const {testAuthHeader} = require('../common/auth');


const data = {
    users: [{
      id: 3,
      name: 'user One',
      email:"useOne@test.com",
      phoneNr: 1111111113,
      password_hash: 'doesntmatter',
      roles: JSON.stringify([Role.USER]),
    },
    {
      id: 4,
      name: 'user Two',
      email:"userTwo@test.com",
      phoneNr: 1111111114,
      password_hash: 'doesntmatter',
      roles: JSON.stringify([Role.USER]),
    },
    {
      id: 5,
      name: 'user Three',
      email:"userThree@test",
      phoneNr: 1111111115,
      password_hash: 'doesntmatter',
      roles: JSON.stringify([Role.USER]),
    }]
};

const dataToDelete = {
    users: [3, 4, 5]
};

describe('Users', () => {
  
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
    
  const url = '/api/user';


  describe('GET /api/user', () => {

    beforeAll(async () => {
      await knex(tables.user).insert(data.users);
    });
    
    afterAll(async () => {
      await knex(tables.user)
        .whereIn('id', dataToDelete.users)
        .delete();
    });

    it('should 200 and return all users', async () => {
      const response = await request.get(url)
        .set('Authorization', adminAuthHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(3);
      expect(response.body.items.length).toBeGreaterThanOrEqual(3);

      expect(response.body.items).toEqual(expect.arrayContaining([{
        id: 1,
        name: 'Test User',
        email: 'test.user@hogent.be',
        phoneNr: 11111111111,
        password_hash:
          '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
          roles: [Role.USER],
      },
      {
        id: 2,
        name: 'Admin User',
        email: 'admin.user@hogent.be',
        phoneNr: 22222222222,
        password_hash:
          '$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU',
        roles: [Role.ADMIN, Role.USER],
      },
      {
        id: 3,
        name: 'user One',
        email:"useOne@test.com",
        phoneNr: 1111111113,
        password_hash: 'doesntmatter',
        roles: [Role.USER],
      }, 
      {
        id: 4,
        name: 'user Two',
        email:"userTwo@test.com",
        phoneNr: 1111111114,
        password_hash: 'doesntmatter',
        roles: [Role.USER],
      },
      {
        id: 5,
        name: 'user Three',
        email:"userThree@test",
        phoneNr: 1111111115,
        password_hash: 'doesntmatter',
        roles: [Role.USER],
      }]));
    });

        
    it('should 400 when given an argument', async () => {
      const response = await request.get(`${url}?invalid=true`)
        .set('Authorization', adminAuthHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.query).toHaveProperty('invalid');
    });

    testAuthHeader(() => request.get(url));
  });

  describe('GET /api/user/:id', () => {

    beforeAll(async () => {
      await knex(tables.user).insert(data.users[0]);
    });
        
    afterAll(async () => {
      await knex(tables.user)
        .whereIn('id', dataToDelete.users)
        .delete();
    });
        
    it('should 200 and return the requested user', async () => {
      const response = await request.get(`${url}/3`)
        .set('Authorization', adminAuthHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: 3,
        name: 'user One',
        email:"useOne@test.com",
        phoneNr: 1111111113,
        password_hash: 'doesntmatter',
        roles: [Role.USER],
      });
    });
        
    it('should 400 with invalid user id', async () => {
      const response = await request.get(`${url}/invalid`)
        .set('Authorization', adminAuthHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });

    testAuthHeader(() => request.get(`${url}/1`));
  });
    

  describe('POST /api/user/register', () => {

    afterAll(async () => {
      // Delete the created user
      await knex(tables.user)
        .where('id', '>', 2) // test user id = 1, admin id = 2
        .delete();
    })

    it('should 200 and return the created user', async () => {
      const response = await request.post(`${url}/register`)
        .send({
          name: 'New user',
          email: 'new@user.be',
          phoneNr: '324444444',
          password: '12345678',
        });
    
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeTruthy();
        expect(response.body.user.name).toBe('New user');
        expect(response.body.user.email).toBe('new@user.be');
        expect(response.body.user.phoneNr).toBe(324444444);
        expect(response.body.user.passwordHash).toBeUndefined();
    });

    it('should 400 when missing name', async () => {
      const response = await request.post(`${url}/register`)
        .send({
          email: 'register@hogent.be',
          phoneNr: '324444444',
          password: '12345678',
        });
  
        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe('VALIDATION_FAILED');
        expect(response.body.details.body).toHaveProperty('name');
      });
  });

  describe('PUT /api/user/:id', () => {

      beforeAll(async () => {
        await knex(tables.user).insert(data.users[0]);
      });
  
      afterAll(async () => {
        // Delete the update users
        await knex(tables.user)
          .whereIn('id', dataToDelete.users)
          .delete();
      });
    
      it('should 200 and return the updated user', async () => {
        const response = await request.put(`${url}/3`)
          .set('Authorization', adminAuthHeader)
          .send({
            name: 'Changed name',
            email: 'changed@user.be',
            phoneNr: 1111111116,
          });
  
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          id: 3,
          name: 'Changed name',
          email: 'changed@user.be',
          password_hash: 'doesntmatter',
          phoneNr: 1111111116,
          roles: [Role.USER],
        });
      });
    
      it('should 400 when missing name', async () => {
        const response = await request.put(`${url}/5`)
          .set('Authorization', adminAuthHeader)
          .send({
            email: 'update.user@hogent.be',
            phoneNr: 1111111116,
          });
  
        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe('VALIDATION_FAILED');
        expect(response.body.details.body).toHaveProperty('name');
      });
    
      it('should 404 with not existing user', async () => {
        const response = await request.delete(`${url}/123`)
          .set('Authorization', adminAuthHeader);
  
        expect(response.statusCode).toBe(404);
        expect(response.body).toMatchObject({
          code: 'NOT_FOUND',
          message: 'No user with id 123 exists',
          details: {
            id: 123,
          },
        });
        expect(response.body.stack).toBeTruthy();
      });
  })

  describe('DELETE /api/user/:id', () => {

    beforeAll(async () => {
      await knex(tables.user).insert(data.users[0]);
    });

    it('should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/3`)
        .set('Authorization', adminAuthHeader);

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 400 with invalid user id', async () => {
      const response = await request.get(`${url}/invalid`)
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });
    
    it('should 404 with not existing user', async () => {
      const response = await request.delete(`${url}/123`)
        .set('Authorization', adminAuthHeader);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No user with id 123 exists',
        details: {
          id: 123,
        },
      });
      expect(response.body.stack).toBeTruthy();
    });
  });
});