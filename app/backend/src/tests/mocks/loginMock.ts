import IToken from "../../database/interfaces/IToken"

const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2ODA2MzYxNTgsImV4cCI6MTY4MTI0MDk1OH0.WbUCFq9lZFbkrCZBhCb943GKC3TpowKBsv-73MxIsFA";

const payload = {
  "id": 1,
  "username": "Admin",
  "role": "admin",
  "email": "admin@admin.com",
  "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
  "iat": 1680636158,
  "exp": 1681240958
}

const user = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const login = {
  "email": "admin@admin.com",
  "password": "secret_admin"
}

const loginError1 = {
  "email": "batatinha",
  "password": "123"
}

export { payload, tokenMock, user, loginError1, login };
