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
  // add item and remove it
  const saveResponse = await request(app)
  .post('/api/users/add-list/')
  .send({
      "id": "1000001",
      "title": "list1",
      "description": "film",
      "genres": [
          "Action"
      ]
  })
  .set('Cookie',[cookie]);
  expect(saveResponse.status).toBe(201);

  const removeResponse = await request(app)
  .delete('/api/users/remove-list/1000001')
  .send()
  .set('Cookie',[cookie]);
  expect(removeResponse.status).toBe(200);
  expect(removeResponse.body).toBeInstanceOf(Object);
  expect(removeResponse.body).toHaveProperty('message');
  
});
  
it('should fail for invalid id', async () => {
 // pass invalid id to remove
  const removeResponse = await request(app)
  .delete('/api/users/remove-list/1000002')
  .send()
  .set('Cookie',[cookie]);
  expect(removeResponse.status).toBe(404);
  expect(removeResponse.body).toBeInstanceOf(Object);
  expect(removeResponse.body).toHaveProperty('error');

});