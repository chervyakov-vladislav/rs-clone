import { body, oneOf } from 'express-validator';

export const registerValidation = [
  body('login', 'логин должен иметь не меньше 3 символов').isLength({ min: 3 }),
  body('login', 'логин не должен содержать более 15 символов').isLength({ max: 15 }),
  body('password', 'длина пароля должна быть больше 5 символов').isLength({ min: 6 }),
];

export const loginValidation = [
  body('login', 'логин не может быть пустым').exists(),
  body('password', 'вход без пароля не возможен').exists(),
];

export const userUpdateValidation = [
  body('name', 'Имя пользователя должно иметь не меньше 3 символов').isLength({ min: 3 }),
  body('name', 'Имя пользователя не должно содержать более 15 символов').isLength({ max: 15 }),
  body('password', 'длина пароля должна быть больше 5 символов').isLength({ min: 6 }),
];

export const premiereValidation = [
  body('ID', 'ID не может быть пустым').exists(),
  body('link', 'неверная ссылка').isURL(),
];

export const postValidation = [
  body('author', 'Необходимо указать автора').exists(),
  body('title', 'Длина заголовка должна быть не менее 3 символов').isLength({ min: 3 }),
  oneOf([
    body('title', 'Недопустимые символы в заголовке').isAlphanumeric('ru-RU', { ignore: ' ' }),
    body('title', 'Недопустимые символы в заголовке').isAlphanumeric('en-US', { ignore: ' ' }),
  ]),
  body('description', 'Слишком короткий текст рецензии').isLength({ min: 20 }),
];
