import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.[a-z]?$/i;

  if (emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  if (password < 6) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  return next();
};
