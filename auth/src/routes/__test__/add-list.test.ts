import request from 'supertest';
import { app } from '../../app';
var cookie: string;
it('should be passed for valid params', async () => {
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
  });
  
it('fails when a wrong genere is passed', async () => {
  await request(app)
    .post('/api/users/add-list')
    .send({
        "id": "12345",
        "title": "list1",
        "description": "film",
        "genres": [
            "Action",
            "SciFi",
            "Dr"
        ]
    })
    .expect(400);
});

it('fails when an id already added', async () => {
  const response = await request(app)
    .post('/api/users/add-list')
    .send({
        "id": "12345555",
        "title": "list1",
        "description": "film",
        "genres": [
            "Action",
            "SciFi"
        ]
    })
    .set('Cookie',[cookie]);
    expect(response.status).toBe(201);

  const duplicateKeyResponse = await request(app)
    .post('/api/users/add-list')
    .send({
        "id": "12345555",
        "title": "list1",
        "description": "film",
        "genres": [
            "Action",
            "SciFi"
        ]
    })
    .set('Cookie',[cookie]);
    expect(duplicateKeyResponse.status).toBe(400);
});
