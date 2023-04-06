import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import { app } from '../app';

import { Response } from 'superagent';

import { leaderboard } from './mocks/leaderboardMock';
import { home } from './mocks/leaderboardHomeMock';
import { away } from './mocks/leaderboardAwayMock';

chai.use(chaiHttp);

describe('Testando a rota /leaderboard', function () {
  it('Verifica se retorna um status 200 e todas as partidas de /leaderboard', async () => {
    const res: Response = await chai.request(app).get('/leaderboard');
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(leaderboard);
  });

  it('Verifica se retorna um status 200 e todas as partidas de /leaderboard/home', async () => {
    const res: Response = await chai.request(app).get('/leaderboard/home');
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(home);
  });

  it('Verifica se retorna um status 200 e todas as partidas de /leaderboard/away', async () => {
    const res: Response = await chai.request(app).get('/leaderboard/away');
    
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(away);
  });
});
