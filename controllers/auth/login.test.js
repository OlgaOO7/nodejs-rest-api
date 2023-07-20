const mongoose = require('mongoose');
const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = require('../../app');
const login = require('./login');
const {User} = require('../../models/user');
const { HttpError } = require('../../helpers');

const {SECRET_KEY} = process.env;
const {DB_HOST} = process.env;

mongoose.set('strictQuery', true);

describe('test login controller', () => {
  let server;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(3000);
  })

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST);
    server.close();
  })

  test('Status code 200 for user login', async () => {
    const requestBody = {
      email: 'vika@mail.com',
      password: '99999999',
    };

    const response = await request(app).post('/api/auth/login').send(requestBody);
    expect(response.status).toBe(200);
    expect(typeof (response.body.token)).toBe('string');
    expect(typeof (response.body.user)).toBe('object');
    expect(typeof (response.body.user)).toBe('string');
    expect(typeof (response.body.user)).toBe('string');
  });
});