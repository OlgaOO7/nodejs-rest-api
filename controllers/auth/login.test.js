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
      email: 'vika2@mail.com',
      password: '99999992',
    };

    const response = await request(app).post('/api/auth/login').send(requestBody);
    console.log(response);
    expect(response.status).toBe(200);
    const {token} = response.body;
    expect(typeof token).toBe('string');
    const {user} = response.body;
    expect(typeof user).toBe('object');
    expect(typeof user.email).toBe('string');
    expect(typeof user.subscription).toBe('string');
  });
});