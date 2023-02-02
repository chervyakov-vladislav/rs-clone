import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { User } from '../../../shared/types';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsersService from '../../services/users.service';
import bodyParser from 'body-parser';

export default class UsersRouter {
  public router = express.Router();
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
    this.router.post('/login', (req, res) => this.login(req ,res));
    this.router.post('/register', (req, res) => this.register(req ,res));
  }

  private async login(req: Request , res: Response) {
    console.log(req.body);
    
    const validateErr = validationResult(req);
    if (!validateErr.isEmpty()) {
      return res.status(400).json({ errors: validateErr.array()[0] });
    }

    try {
      const isNameExist = await this.usersService.findByName(req.body.name);
      if (!isNameExist) {
        throw new Error('Login is wrong');
      }
      console.log(isNameExist);
      const validPassword = await bcrypt.compare(
        req.body.password,
        isNameExist.password
      );
      if (!validPassword) {
        throw new Error('Password is wrong');
      }

      const payLoad = { name: isNameExist.name };

      const token = jwt.sign(payLoad, process.env.TOKEN_SECRET!);

      res.header('auth-token', token).json({
        error: null,
        token: { token },
        data: isNameExist,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: (err as Error).message,
      });
    }
    res.send('Login succeed!')
  }

  private async register(req: Request , res: Response) {
    console.log(req.body);
    res.send('Registered!')
  }
}
