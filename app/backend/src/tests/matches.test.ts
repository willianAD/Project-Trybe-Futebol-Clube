import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import { app } from '../app';

import { Response } from 'superagent';
import Matche from '../database/models/Matche';
import { matches, matchesTrue, matchesFalse } from './mocks/matchesMock';
import IMatches from './interfaces/IMacthes';


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

  // it('Verifica se retorna um status 200 e uma messagem de finalizada', async () => {
  //   sinon.stub(Matche, 'update').resolves([48]);
    
  //   const res: Response = await chai.request(app).patch('/matches/48/finish');
    
  //   expect(res.status).to.be.equal(200);
  //   expect(res.body).to.be.deep.equal({ "message": "Finished" });
  // });

  afterEach(()=>{ sinon.restore() });
});
