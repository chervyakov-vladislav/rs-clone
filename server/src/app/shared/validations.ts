import { body } from 'express-validator';

export const registerValidation = [
  body('login', 'login must have at least 3 symbols').isLength({ min: 3 }),
  body('password', 'password must have at least 6 symbols').isLength({ min: 6 })
];

export const loginValidation = [
  body('login', 'login cannot be empty').exists(),
  body('password', 'unsupported blank passwords').exists()
];