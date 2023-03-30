import * as jwt from 'jsonwebtoken';
import IToken from '../interfaces/IToken';
import IUser from '../interfaces/IUser';

const secret = process.env.JWT_SECRET || 'secret';
const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const newToken = (payload: IUser): string => jwt.sign(payload, secret, jwtConfig);

const validateToken = (token: string) => jwt.verify(token, secret) as IToken;

export { newToken, validateToken };
