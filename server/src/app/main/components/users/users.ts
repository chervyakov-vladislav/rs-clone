import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import UsersService from '../../services/users.service';
import { loginValidation, registerValidation } from '../../../shared/validations';

export default class UsersRouter {
  public router = express.Router();
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
    this.router.post('/login', loginValidation, (req: Request, res: Response) => this.login(req ,res));
    this.router.post('/register', registerValidation, (req: Request, res: Response) => this.register(req ,res));
    this.router.get('/auth', (req, res) => this.authentification(req, res));
  }

  private async login(req: Request , res: Response) {
    const validateErr = validationResult(req);
    if (!validateErr.isEmpty()) {
      return res.status(400).json({ errors: validateErr.array()[0] });
    }

    try {
      const existedUser = await this.usersService.findByLogin(req.body.login);
      if (!existedUser) {
        throw new Error('Login is wrong');
      }
      const validPassword = await bcrypt.compare(req.body.password, existedUser.password);
      if (!validPassword) {
        throw new Error('Password is wrong');
      }

      const token = this.usersService.createToken(existedUser.login);

      res.header('auth-token', token).json({
        error: null,
        token,
        data: existedUser,
      });

    } catch (err) {
      return res.status(400).json({
        errors: (err as Error).message,
      });
    }
  }

  private async register(req: Request , res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }

    try {
      const existedUser = await this.usersService.findByLogin(req.body.login);
      if (existedUser) {
        throw new Error('user is already exists');
      }
    } catch (err) {
      return res.status(400).json({
        errors: (err as Error).message,
      });
    }

    try {
      const password = await this.usersService.hashPassword(req.body.password);

      const user = await this.usersService.create({
        login: req.body.login,
        password,
      });

      const token = this.usersService.createToken(user.login);

      res.header('auth-token', token).json({
        error: null,
        token,
        data: user,
      });
    } catch (err) {
      res.send('error');
    }
  }

  private async authentification(req: Request, res: Response) {
    try {
      if (!this.usersService.verifyToken(req.headers.authorization || '')) {
        throw new Error('Invalid token');
      }
      res.send('authorization success');
    } catch (err) {
      return res.status(400).json({
        errors: (err as Error).message,
      });
    }
  }
}
