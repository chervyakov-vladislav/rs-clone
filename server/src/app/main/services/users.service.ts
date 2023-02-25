import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../shared/model/types';
import dbClient from '../../shared/db-client';

export default class UsersService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async findByLogin(login: string) {
    const collection = await dbClient.getUsersCollection();
    const data = await collection.findOne<User>({ login });
    return data;
  }

  public async getAllUsers() {
    const collection = await dbClient.getUsersCollection();
    const data = await collection.find().toArray();
    console.log('Get all users from DB');
    return data;
  }

  public async create(user: User) {
    const collection = await dbClient.getUsersCollection();
    const createdAt = new Date();

    const { insertedId } = await collection.insertOne({
      createdAt,
      updatedAt: createdAt,
      login: user.login,
      name: user.login,
      password: user.password,
      role: user.role,
    });
    console.log(insertedId);
    console.log('created user', user);
    return user;
  }

  public async update(user: User) {
    const collection = await dbClient.getUsersCollection();
    const updatedAt = new Date();
    const { value } = await collection.findOneAndUpdate(
      { login: user.login },
      {
        $set: {
          updatedAt,
          name: user.name || user.login,
          password: user.password,
          role: user.role || 'user',
          avatar: user.avatar,
        },
      }
    );
    console.log(value, user);
    return user;
  }

  public async hashPassword(password: string) {
    if (!password) return '';
    const salt = await bcrypt.genSalt(5);
    return bcrypt.hash(password, salt);
  }

  public createToken(login: string) {
    return jwt.sign({ login }, process.env.TOKEN_SECRET || 'secret');
  }

  public verifyToken(auth: string) {
    const token: string = auth.split(' ')[0] === 'Bearer' ? auth.split(' ')[1] : '';
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET || 'secret') as JwtPayload;
      console.log('verified', verified);
      return verified.login as string;
    } catch (err) {
      return '';
    }
  }
}
