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
  }

  private async login(req: Request , res: Response) {
    console.log(req.body);
    
    const validateErr = validationResult(req);
    if (!validateErr.isEmpty()) {
      return res.status(400).json({ errors: validateErr.array()[0] });
    }

    try {
      const existedUser = await this.usersService.findByLogin(req.body.login);
      if (!existedUser) {
        throw new Error('Login is wrong');
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        existedUser.password
      );
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
      const salt = await bcrypt.genSalt(5);
      const password = await bcrypt.hash(req.body.password, salt);

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
}
