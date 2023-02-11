import { body } from 'express-validator';

export const registerValidation = [
  body('login', 'логин должен иметь не меньше 3 символов').isLength({ min: 3 }),
  body('password', 'длина пароля должна быть больше 5 символов').isLength({ min: 6 })
];

export const loginValidation = [
  body('login', 'логин не может быть пустым').exists(),
  body('password', 'вход без пароля не возможен').exists()
];