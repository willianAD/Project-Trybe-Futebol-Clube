import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import { mockTeam, bestTeam, errorMessage } from './mocks/teamsMock';

chai.use(chaiHttp);

describe('Testando  a rota /teams', function () {
  it('Verifica se retorna um status 200 e todos os times', async () => {
    sinon.stub(Team, 'findAll').resolves(mockTeam as Team[]);
    
    const res: Response = await chai.request(app).get('/teams');
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(mockTeam);
  });

  it('Verifica se retorna um status 200 e busca por um id', async () => {
    sinon.stub(Team, 'findByPk').resolves(bestTeam as Team);
    
    const res: Response = await chai.request(app).get('/teams/4');
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(bestTeam);
  });

  it('Verifica se retorna um status 404 e uma menssagem de erro', async () => {
    sinon.stub(Team, 'findByPk').resolves();
    
    const res: Response = await chai.request(app).get('/teams/500');
    
    expect(res.status).to.be.equal(404);
    expect(res.body).to.be.deep.equal(errorMessage);
  });

  afterEach(()=>{ sinon.restore() });
});
