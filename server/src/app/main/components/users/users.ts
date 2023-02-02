import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { User } from '../../../shared/types';

export default class UsersRouter {
  public router = express.Router();

  constructor() {
    this.router.post('/login', (req, res) => this.login(req ,res));
    this.router.post('/register', (req, res) => this.register(req ,res));
  }

  private async login(req: Request , res: Response) {
    console.log(req.body);
    res.send('Login succeed!')
  }

  private async register(req: Request , res: Response) {
    console.log(req.body);
    res.send('Rigistered!')
  }
}
