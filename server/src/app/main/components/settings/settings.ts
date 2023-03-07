import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { validationResult } from 'express-validator';
import { premiereValidation } from '../../../shared/model/validations';
import SettingService from '../../services/settings.service';
import UsersService from '../../services/users.service';

export default class SettingsRouter {
  public router = express.Router();

  private settingsService: SettingService;

  private usersService: UsersService;

  constructor() {
    this.settingsService = new SettingService();
    this.usersService = new UsersService();
    this.router.post('/premiere', premiereValidation, (req: Request, res: Response) => this.setPremiere(req, res));
    this.router.get('/premiere', (req: Request, res: Response) => this.getPremiere(req, res));
  }

  private async getPremiere(req: Request, res: Response) {
    const validateErr = validationResult(req);
    if (!validateErr.isEmpty()) {
      return res.status(400).json({ errors: validateErr.array()[0] });
    }
    console.log(req.method, req.originalUrl);
    try {
      const premiere = await this.settingsService.getPremiere();
      if (!premiere) {
        throw new Error('Отсутствует в базе');
      }
      res.json(premiere);
    } catch (err) {
      return res.status(400).json({
        errors: { msg: (err as Error).message },
      });
    }
  }

  private async setPremiere(req: Request, res: Response) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    try {
      const login = this.usersService.verifyToken(req.headers.authorization || '');
      if (!login) {
        throw new Error('Только администратор может устанавливать параметры сервера, пожалуйста авторизуйтесь.');
      }
      const existedUser = await this.usersService.findByLogin(login);
      if (!(existedUser && existedUser.role === 'admin')) {
        throw new Error('Только администратор может устанавливать параметры сервера');
      }

      const premiere = await this.settingsService.setPremiere(req.body.ID, req.body.link);

      res.json(premiere);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: 'setSettings' },
      });
    }
  }
}
