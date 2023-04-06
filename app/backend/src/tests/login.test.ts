import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
import { tokenMock, user, loginError1, login, payload } from './mocks/loginMock';
import * as token from '../database/utils/token';

chai.use(chaiHttp);

describe('Testando  a rota /login', function () {
  it('Verifica se retorna um status 200 e retorna um token', async () => {
    sinon.stub(User, 'findOne').resolves(user as User);
    
    const res: Response = await chai.request(app).post('/login').send(login);
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.key('token');
    expect(res.body.token).to.be.a('string');
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

  it('Verifica se não tiver um token retorna um status 401 e a menssagem', async () => {
    sinon.stub(User, 'findOne').resolves(user as User);
    
    const res: Response = await chai.request(app).get('/login/role');
    
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('Verifica se tiver um token invalido retorna um status 401 e a menssagem', async () => {
    sinon.stub(User, 'findOne').resolves(user as User);
    
    const res: Response = await chai.request(app).get('/login/role').set({ 'Authorization': 'batatinha' });
    
    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Verifica se tiver um token valido retorna um status 200 e o role', async () => {
    sinon.stub(User, 'findOne').resolves(user as User);
    sinon.stub(token, 'validateToken').returns(payload);

    
    const res: Response = await chai.request(app).get('/login/role').set({ 'Authorization': tokenMock });
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal({ role: "admin" });
  });

  afterEach(()=>{ sinon.restore() });
});
