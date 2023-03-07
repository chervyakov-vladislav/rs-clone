import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { validationResult } from 'express-validator';
import { postValidation } from '../../../shared/model/validations';
import PostsService from '../../services/post.service';
import UsersService from '../../services/users.service';

export default class PostsRouter {
  public router = express.Router();

  private postsService: PostsService;

  private usersService: UsersService;

  constructor() {
    this.postsService = new PostsService();
    this.usersService = new UsersService();
    this.router.post('/new/:filmID', postValidation, (req: Request, res: Response) => this.newPost(req, res));
    this.router.delete('/:login', (req: Request, res: Response) => this.deletePosts(req, res));
    this.router.get('/all', (req: Request, res: Response) => this.getAllPosts(req, res));
    this.router.get('/byfilm/:filmID', (req: Request, res: Response) => this.getPostsbyFilmID(req, res));
    this.router.get('/bylogin/:login', (req: Request, res: Response) => this.getPostsbyLogin(req, res));
  }

  private async newPost(req: Request, res: Response) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    try {
      const login = this.usersService.verifyToken(req.headers.authorization || '');
      if (!login) throw new Error('Пользователь неавторизован');
      const post = await this.postsService.create(req.body, req.params.filmID, login);
      res.send({
        errors: null,
        token: '',
        data: post,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: 'post create' },
      });
    }
  }

  private async deletePosts(req: Request, res: Response) {
    console.log(`Удаление всех рецензий пользователя: ${req.params.login}`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    try {
      const login = this.usersService.verifyToken(req.headers.authorization || '');
      if (!login) throw new Error('Пользователь неавторизован');
      if (login !== req.params.login && !(await this.usersService.isAdmin(login)))
        throw new Error('Можно удалять только свои рецензии, либо это может сделать только админ');
      const result = await this.postsService.deletePostsbyLogin(req.params.login);
      res.send({
        errors: null,
        token: '',
        data: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: 'delete user posts' },
      });
    }
  }

  private async getAllPosts(req: Request, res: Response) {
    try {
      const data = await this.postsService.getAllPosts();
      console.log(data);
      res.send({
        errors: null,
        data,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: 'getAllPosts' },
      });
    }
  }

  private async getPostsbyFilmID(req: Request, res: Response) {
    try {
      const data = await this.postsService.getPostsbyFilmID(req.params.filmID);
      console.log(data);
      res.send({
        errors: null,
        data,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: 'getPostsByFilm' },
      });
    }
  }

  private async getPostsbyLogin(req: Request, res: Response) {
    try {
      const data = await this.postsService.getPostsbyLogin(req.params.login);
      console.log(data);
      res.send({
        errors: null,
        data,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: 'getPostsByFilm' },
      });
    }
  }
}
