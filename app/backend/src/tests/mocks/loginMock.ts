const token = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2ODAyODIyNzAsImV4cCI6MTY4MDg4NzA3MH0.VWUnZNdyVuUcEmm1wA1KUrBYD--h10MpdUCcTQvpe6Y"
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

const loginEmail = {
  "email": "admin@admin.com",
}

const loginError1 = {
  "email": "batatinha",
  "password": "123"
}

const loginError2 = {
  "email": "admin@admin.com",
  "password": "123456789"
}

export { token, user, loginEmail, loginError1, login, loginError2 };
