import express from 'express';
import { ParamsDictionary, Request, Response } from 'express-serve-static-core';
import { User } from '../../../shared/types';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsersService from '../../services/users.service';
import bodyParser from 'body-parser';
import { registerValidation } from '../../../shared/validations';
import { ParsedQs } from 'qs';

export default class UsersRouter {
  public router = express.Router();
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
    this.router.post('/login', (req, res) => this.login(req ,res));
    this.router.post('/register', registerValidation, (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) => this.register(req ,res));
  }

  private async login(req: Request , res: Response) {
    console.log(req.body);
    
    const validateErr = validationResult(req);
    if (!validateErr.isEmpty()) {
      return res.status(400).json({ errors: validateErr.array()[0] });
    }

    try {
      const isUserExist = await this.usersService.findByLogin(req.body.login);
      if (!isUserExist) {
        throw new Error('Login is wrong');
      }
      console.log(isUserExist);
      const validPassword = await bcrypt.compare(
        req.body.password,
        isUserExist.password
      );
      if (!validPassword) {
        throw new Error('Password is wrong');
      }

      const payLoad = { login: isUserExist.login };

      const token = jwt.sign(payLoad, process.env.TOKEN_SECRET||'secret');

    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: (err as Error).message,
      });
    }
    res.send('Login succeed!')
  }

  private async register(req: Request , res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }

    try {
      const isUserExist = await this.usersService.findByLogin(req.body.login);
      if (isUserExist) {
        throw new Error('login is already exists');
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

      const payLoad = { login: user.login };

      const token = jwt.sign(payLoad, process.env.TOKEN_SECRET||'secret');

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
