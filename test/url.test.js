require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');


describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  async function postAUrl() {
    let userId;

    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'abc' })
      .then(res => {
        userId = res.body._id;
      });


    const url = { 
      urlText: 'Joe',
      shortUrlText: 'Dog', 
      count: 1, 
      user: userId 
    };


    const result =  await agent
      .post('/api/v1/url')
      .send(url)
      .then(res => res.body);

    return { result, url, agent };
  }

  it('can create a url model with appropriate input', async()=> {

    await postAUrl()
      .then(({ result }) => {
        expect(result).toEqual({
          urlText: 'Joe',
          shortUrlText: 'Dog', 
          count: 1, 
          id: expect.any(String)
        });
      }); 
  });

  it('can get a url by id', async()=> {
    let agentLocal;
    let url;

    await postAUrl()
      .then(({ result, agent }) => {
        agentLocal = agent;
        url = result;
      });

    await agentLocal
      .get(`/api/v1/url/${url.id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...url,
          id: expect.any(String),
        });
      });
  });

  it('can get all urls', async()=> {
    let agentLocal;
    let url;

    await postAUrl()
      .then(({ result, agent }) => {
        agentLocal = agent;
        url = result;
      });

    await agentLocal
      .get('/api/v1/url')
      .then(res => {
        expect(res.body[0]).toEqual({
          urlText: 'Joe',
          shortUrlText: 'Dog',
          id: expect.any(String)
        });
      });
  }); 

  it('can delete a url by id', async()=> {
    let agentLocal;
    let url;

    await postAUrl()
      .then(({ result, agent }) => {
        agentLocal = agent;
        url = result;
      });

    await agentLocal
      .delete(`/api/v1/url/${url.id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...url,
          id: expect.any(String)
        });
      });
  });

});
