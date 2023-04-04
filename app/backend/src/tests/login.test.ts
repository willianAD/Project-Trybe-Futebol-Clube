import * as chai from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
import { token, user, loginEmail, loginError1, login } from './mocks/loginMock';

chai.use(chaiHttp);

describe('Testando  a rota /login', function () {
  it('Verifica se retorna um status 200 e retorna um token', async () => {
    sinon.stub(User, 'findOne').resolves(user as User);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(jwt, 'sign').resolves(token);
    
    const res: Response = await chai.request(app).post('/login').send(login);
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(token);
  });

  it('Verifica se sem os campos retorna um status 400 e uma mensagen de erro', async () => {
    const res: Response = await chai.request(app).post('/login').send();
    
    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.deep.equal({ "message": "All fields must be filled" });
  });

  it('Verifica se com email e senha invalidos retorna um status 401 e uma mensagen de erro', async () => { 
    const res: Response = await chai.request(app).post('/login').send(loginError1);
    
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({"message": "Invalid email or password" });
  });

  afterEach(()=>{ sinon.restore() });
});
