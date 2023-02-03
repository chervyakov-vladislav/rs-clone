import { body } from 'express-validator';

export const registerValidation = [
  body('name', 'login must have at least 3 symbols').isLength({ min: 3 }),
  body('password', 'password must have at least 6 symbols').isLength({ min: 6 })
];