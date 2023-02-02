import e from "express";
import { Express } from "express";
import UsersRouter from "./main/components/users/users";

export default class Server {
  private PORT: string;
  private app: Express;
  private usersRouter: UsersRouter;

  constructor() {
    this.PORT = process.env.PORT || '3000';
    this.app = e();
    this.usersRouter = new UsersRouter();
  }

  public start() {
    this.app.use('/api/user', this.usersRouter.router);
    this.app.listen(this.PORT) 
    console.info(`Server is started on port ${this.PORT}`);
  }
}
