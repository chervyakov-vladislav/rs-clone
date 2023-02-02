import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { User } from '../../../shared/types';

export default class UsersRouter {
  public router = express.Router();

  constructor() {
    this.router.post('/login', (req, res) => this.login(req ,res));
    this.router.post('/register', (req, res) => this.register(req ,res));
  }

  private login(req: Request<{}, any, any, ParsedQs, Record<string, any>> , res: Response<any, Record<string, any>, number>) {
    console.log(req.body);
    res.send('Login succeed!')
  }

  private register(req: Request<{}, any, any, ParsedQs, Record<string, any>> , res: Response<any, Record<string, any>, number>) {
    console.log(req.body);
    res.send('Rigistered!')
  }
}
