import { MongoClient } from 'mongodb';
import { User } from '../../shared/model/types';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbClient from '../../shared/db-client';

export default class UsersService {
private mongoClient: MongoClient;
private users: User[];

  constructor() {
    this.mongoClient = new MongoClient('mongodb+srv://rs-clone');
    this.users = [];
}

  public async findByLogin(login: string) {
    const collection = await dbClient.getUsersCollection();
    const data = await collection.findOne<User>({ login: login });
    return data;
  }

  public async create(user: User) {
    const collection = await dbClient.getUsersCollection();
    const createdAt = new Date();

    const { insertedId } = await collection.insertOne({
      createdAt,
      updatedAt: createdAt,
      login: user.login,
      password: user.password,
    });
    console.log(insertedId);
    console.log('created user', user);
    return user;
  }

  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt);
  }

  public createToken(login: string) {
    return jwt.sign({ login: login }, process.env.TOKEN_SECRET||'secret');
  }

  public verifyToken(auth: string) {
    const token:string = auth.split(' ')[0] === 'Bearer' ? auth.split(' ')[1]: '';
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET!||'secret') as JwtPayload;
      console.log('verified', verified);
      return verified.login as string;
    } catch (err) {
      return '';
    }
  }
}