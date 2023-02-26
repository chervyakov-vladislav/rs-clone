import e, { Express } from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import UsersRouter from './main/components/users/users';
import SettingsRouter from './main/components/settings/settings';
import PostsRouter from './main/components/posts/posts';

export default class Server {
  private PORT: string;

  private app: Express;

  private usersRouter: UsersRouter;

  private settingsRouter: SettingsRouter;

  private postsRouter: PostsRouter;

  constructor() {
    dotenv.config();
    this.PORT = process.env.PORT || '3000';
    this.app = e();
    this.app.use(cors());
    this.app.use(fileUpload());
    this.app.use(bodyParser.raw());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(e.static('src/files'));
    this.usersRouter = new UsersRouter();
    this.settingsRouter = new SettingsRouter();
    this.postsRouter = new PostsRouter();
  }

  public start() {
    this.app.use('/api/user', this.usersRouter.router);
    this.app.use('/api/settings', this.settingsRouter.router);
    this.app.use('/api/posts', this.postsRouter.router);
    this.app.listen(this.PORT);
    console.info(`Server is started on port ${this.PORT}`);
  }
}
