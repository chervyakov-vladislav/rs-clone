import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { UploadedFile } from 'express-fileupload';
import UsersService from '../../services/users.service';
import { loginValidation, registerValidation } from '../../../shared/model/validations';
import fileService from '../../services/file.service';

export default class UsersRouter {
  public router = express.Router();

  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
    this.router.post('/login', loginValidation, (req: Request, res: Response) => this.login(req, res));
    this.router.post('/register', registerValidation, (req: Request, res: Response) => this.register(req, res));
    this.router.patch('/update', (req: Request, res: Response) => this.update(req, res));
    this.router.get('/me', (req, res) => this.authorization(req, res));
    this.router.get('/all', (req, res) => this.getAllUsers(req, res));
  }

  private async login(req: Request, res: Response) {
    let paramErr = 'login';
    const validateErr = validationResult(req);
    if (!validateErr.isEmpty()) {
      return res.status(400).json({ errors: validateErr.array()[0] });
    }
    console.log(req.body);
    try {
      const existedUser = await this.usersService.findByLogin(req.body.login);
      if (!existedUser) {
        throw new Error('Неверный логин');
      }
      const validPassword = await bcrypt.compare(req.body.password, existedUser.password);
      if (!validPassword) {
        paramErr = 'password';
        throw new Error('Неверный пароль');
      }

      const token = this.usersService.createToken(existedUser.login);

      res.header('auth-token', token).json({
        errors: null,
        token,
        data: existedUser,
      });
    } catch (err) {
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: paramErr },
      });
    }
  }

  private async register(req: Request, res: Response) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }

    try {
      const existedUser = await this.usersService.findByLogin(req.body.login);
      if (existedUser) {
        throw new Error('Пользователь уже зарегистрирован');
      }
    } catch (err) {
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: 'login' },
      });
    }

    try {
      const password = await this.usersService.hashPassword(req.body.password);

      const user = await this.usersService.create({
        login: req.body.login,
        name: req.body.login,
        password,
        role: 'user',
      });

      const token = this.usersService.createToken(user.login);

      res.header('auth-token', token).json({
        errors: null,
        token,
        data: user,
      });
    } catch (err) {
      res.send('error');
    }
  }

  private async authorization(req: Request, res: Response) {
    try {
      const login = this.usersService.verifyToken(req.headers.authorization || '');
      if (!login) {
        throw new Error('Invalid token');
      }
      const existedUser = await this.usersService.findByLogin(login);
      if (!existedUser) {
        throw new Error('Такой пользователь не зарегистрирован');
      }
      res.send({
        errors: null,
        token: '',
        data: existedUser,
      });
    } catch (err) {
      return res.status(401).json({
        errors: { msg: (err as Error).message },
      });
    }
  }

  private async update(req: Request, res: Response) {
    console.log(req.body);
    if (req.files) fileService.saveFile(req.files.file as UploadedFile);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }

    try {
      const login = this.usersService.verifyToken(req.headers.authorization || '');
      if (!login) {
        throw new Error('Invalid token');
      }
      const existedUser = await this.usersService.findByLogin(login);
      if (!existedUser) {
        throw new Error('Такой пользователь не зарегистрирован');
      }
      const password = await this.usersService.hashPassword(req.body.password);

      const user = await this.usersService.update({
        login: req.body.login,
        name: req.body.name || existedUser.name,
        password: password || existedUser.password,
        role: req.body.role || existedUser.role,
        avatar: req.body.avatar || existedUser.avatar,
      });

      res.send({
        errors: null,
        token: '',
        data: user,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: 'update' },
      });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const login = this.usersService.verifyToken(req.headers.authorization || '');
      if (!login) {
        throw new Error('Только администратор имеет доступ к запрашиваемой информации, пожалуйста авторизуйтесь.');
      }
      const existedUser = await this.usersService.findByLogin(login);
      if (!(existedUser && existedUser.role === 'admin')) {
        throw new Error('Только администратор имеет доступ к этой информации');
      }
      const data = await this.usersService.getAllUsers();
      console.log(data);
      res.send({
        errors: null,
        token: '',
        data,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: 'getAllUsers' },
      });
    }
  }
}
