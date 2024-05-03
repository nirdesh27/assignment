import request from 'supertest';
import { app } from '../../app';
var cookie: string;
it('should be passed to get Empty List', async () => {
    const response =  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test02@test.com',
      password: 'password'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
  cookie = `${response.get('Set-Cookie')}`;
    const saveResponse = await request(app)
      .get('/api/users/my-list')
      .send()
      .set('Cookie',[cookie]);
      expect(saveResponse.status).toBe(200);
      expect(saveResponse.body).toBeInstanceOf(Object);
      expect(saveResponse.body).toHaveProperty('page');
      expect(saveResponse.body).toHaveProperty('totalPages');
      expect(saveResponse.body).toHaveProperty('totalCount');
      expect(saveResponse.body).toHaveProperty('data');
      expect(saveResponse.body.data).toBeInstanceOf(Array);
  });
it('should pass for one Page', async () => {
    const saveResponse = await request(app)
    .post('/api/users/add-list/')
    .send({
        "id": "123452222",
        "title": "list1",
        "description": "film",
        "genres": [
            "Action"
        ]
    })
    .set('Cookie',[cookie]);
    expect(saveResponse.status).toBe(201);

    const response = await request(app)
      .get('/api/users/my-list?page=@&limit=@')
      .send()
      .set('Cookie',[cookie]);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeLessThanOrEqual(1); // Limit should be respected
      if (response.body.data.length > 0) {
          expect(response.body.data[0]).toHaveProperty('_id');
          expect(response.body.data[0]).toHaveProperty('id');
          expect(response.body.data[0]).toHaveProperty('title');
          expect(response.body.data[0]).toHaveProperty('description');
          expect(response.body.data[0]).toHaveProperty('genres');
          expect(response.body.data[0]).toHaveProperty('email');
      }
  });
