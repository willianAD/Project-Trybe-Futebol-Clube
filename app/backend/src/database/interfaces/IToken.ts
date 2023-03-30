export default interface IToken {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
  iat: number,
  exp: number
}
