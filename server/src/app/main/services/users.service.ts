import { MongoClient } from 'mongodb';
import { User } from '../../shared/types';

export default class UsersService {
private mongoClient: MongoClient;
private users: User[];

  constructor() {
    this.mongoClient = new MongoClient('mongodb+srv://sdfs');
    this.users = [];
    this.users.push({ name: 'exi', password: '3256'});
    this.users.push({ name: 'guest', password: '111' })
    this.users.push({ name: 'admin', password: 'p@ssw0rd' })
  }
  public findByName(name: string) {
    return this.users.find((user) => user.name === name);
  }
}