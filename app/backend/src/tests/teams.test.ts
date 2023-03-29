// import * as chai from 'chai';
// import * as sinon from 'sinon';
// // @ts-ignore
// import chaiHttp = require('chai-http');
// const { expect } = chai;

// import { app } from '../app';

// import { Response } from 'superagent';
// import Team from '../database/models/Team';

// chai.use(chaiHttp);

// const mockTeam = [
//   {
//     "id": 1,
//     "teamName": "Avaí/Kindermann"
//   },
//   {
//     "id": 2,
//     "teamName": "Bahia"
//   },
//   {
//     "id": 3,
//     "teamName": "Botafogo"
//   },
//   {
//     "id": 4,
//     "teamName": "Corinthians"
//   },
//   {
//     "id": 5,
//     "teamName": "Cruzeiro"
//   },
//   {
//     "id": 6,
//     "teamName": "Ferroviária"
//   },
//   {
//     "id": 7,
//     "teamName": "Flamengo"
//   },
//   {
//     "id": 8,
//     "teamName": "Grêmio"
//   },
//   {
//     "id": 9,
//     "teamName": "Internacional"
//   },
//   {
//     "id": 10,
//     "teamName": "Minas Brasília"
//   },
//   {
//     "id": 11,
//     "teamName": "Napoli-SC"
//   },
//   {
//     "id": 12,
//     "teamName": "Palmeiras"
//   },
//   {
//     "id": 13,
//     "teamName": "Real Brasília"
//   },
//   {
//     "id": 14,
//     "teamName": "Santos"
//   },
//   {
//     "id": 15,
//     "teamName": "São José-SP"
//   },
//   {
//     "id": 16,
//     "teamName": "São Paulo"
//   }
// ]


// describe('Testando Teams', function () {
//   afterEach(()=>{ sinon.restore(); });

//   it('...', async function () {
//     const res = {};
//     const req = {};

//     sinon.stub(Team, 'findAll').resolves(mockTeam);

//     await chai.request(app).get('/teams');
    
//     expect(res.status).to.be.equal(200);
//     expect(res.json).to.be.deep.equal(mockTeam);
//   });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });
