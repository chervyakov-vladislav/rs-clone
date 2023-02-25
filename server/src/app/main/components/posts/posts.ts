import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { validationResult } from 'express-validator';
import { postValidation } from '../../../shared/model/validations';
import PostsService from '../../services/post.service';

export default class PostsRouter {
  public router = express.Router();

  private postsService: PostsService;

  constructor() {
    this.postsService = new PostsService();
    this.router.post('/new/:filmID', postValidation, (req: Request, res: Response) => this.newPost(req, res));
    this.router.get('/all', (req: Request, res: Response) => this.getAllPosts(req, res));
    this.router.get('/byfilm/:filmID', (req: Request, res: Response) => this.getPostsbyFilmID(req, res));
    this.router.get('/bylogin/:login', (req: Request, res: Response) => this.getAllPosts(req, res));
  }

  private async newPost(req: Request, res: Response) {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    try {
      const posts = await this.postsService.create(req.body, req.params.filmID);
      console.log(req.params.filmID, posts);
      res.send({
        errors: null,
        token: '',
        data: posts,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: { msg: (err as Error).message, param: 'post create' },
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
