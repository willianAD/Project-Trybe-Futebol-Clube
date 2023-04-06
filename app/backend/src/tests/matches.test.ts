import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import { app } from '../app';

import { Response } from 'superagent';
import Matche from '../database/models/Matche';
import {
  matches,
  matchesTrue,
  matchesFalse,
  createMatch,
  createResult,
  createInvalid,
  messageTeams,
  messageInvalid,
  createInvalidId,
} from './mocks/matchesMock';
import IMatches from './interfaces/IMacthes';
import { payload, tokenMock } from './mocks/loginMock';


chai.use(chaiHttp);

describe('Testando  a rota /matches', function () {
  it('Verifica se retorna um status 200 e todas as partidas', async () => {
    sinon.stub(Matche, 'findAll').resolves(matches as IMatches[]);
    
    const res: Response = await chai.request(app).get('/matches');
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(matches);
  });

  it('Verifica se retorna um status 200 e todas as partidas inProgress', async () => {
    sinon.stub(Matche, 'findAll').resolves(matchesTrue as IMatches[]);
    
    const res: Response = await chai.request(app).get('/matches?inProgress=true');
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(matchesTrue);
  });

  it('Verifica se retorna um status 200 e todas as partidas que NÃO estão inProgress', async () => {
    sinon.stub(Matche, 'findAll').resolves(matchesFalse as IMatches[]);
    
    const res: Response = await chai.request(app).get('/matches?inProgress=false');
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(matchesFalse);
  });

  it('Verifica se finaliza uma partida e retorna um status 200 e uma messagem de finalizada', async () => {
    sinon.stub(Matche, 'update').resolves();
    sinon.stub(jwt, 'verify').callsFake(() => payload);
    
    const res: Response = await chai.request(app).patch('/matches/48/finish').send().set('Authorization', tokenMock);
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal({ "message": "Finished" });
  });

  it('Verifica se é possivel atualizar uma partida retorna um status 200 e uma messagem de finalizada', async () => {
    sinon.stub(Matche, 'update').resolves();
    sinon.stub(jwt, 'verify').callsFake(() => payload);
    
    const res: Response = await chai.request(app).patch('/matches/48').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }).set('Authorization', tokenMock);
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal({ "message": "Finished" });
  });

  it('Verifica se é possivel criar uma nova partida e retorna um status 200 e a partida', async () => {
    sinon.stub(Matche, 'findAll').resolves([createMatch] as any);
    sinon.stub(Matche, 'create').resolves(createResult as any);
    sinon.stub(jwt, 'verify').callsFake(() => payload);
    
    const res: Response = await chai.request(app).post('/matches').send(createMatch).set('Authorization', tokenMock);
    
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.deep.equal(createResult);
  });

  it('Verifica se não cria uma partida com parametros invalidos e retorna um status 422 e a menssagem', async () => {
    sinon.stub(Matche, 'findAll').resolves([createInvalid] as any);
    sinon.stub(Matche, 'create').resolves();
    sinon.stub(jwt, 'verify').callsFake(() => payload);
    
    const res: Response = await chai.request(app).post('/matches').send(createInvalid).set('Authorization', tokenMock);
    
    expect(res.status).to.be.equal(422);
    expect(res.body).to.be.deep.equal(messageTeams);
  });

  it('Verifica se não cria uma partida com id invalidos e retorna um status 404 e a menssagem', async () => {
    sinon.stub(Matche, 'findAll').resolves();
    sinon.stub(Matche, 'create').resolves();
    sinon.stub(jwt, 'verify').callsFake(() => payload);
    
    const res: Response = await chai.request(app).post('/matches').send(createInvalidId).set('Authorization', tokenMock);
    
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.deep.equal(messageInvalid);
  });

  afterEach(()=>{ sinon.restore() });
});
