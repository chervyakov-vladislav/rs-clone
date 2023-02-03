import { MongoClient } from 'mongodb';
import { User } from '../../shared/types';

export default class UsersService {
private mongoClient: MongoClient;
private users: User[];

  constructor() {
    this.mongoClient = new MongoClient('mongodb+srv://sdfs');
    this.users = [];
    this.users.push({ name: 'exi', password: '$2a$10$ZVeTin07G8KvTVsMRS0JCOiIaFhPlL4EMkuqHqX5b30THx8WYoKBi'}); //3256
    this.users.push({ name: 'guest', password: '$2a$10$PhbuteuClinD4c6HI.ZIlerUb5ap/cicvGQFoBGbJYbAsVs19npw6' }); //111
    this.users.push({ name: 'admin', password: '$2a$10$HbL13/39z5vqWGGr1My3.OHuXLhE1n4VfYxHYIA1i6e6WuPZAVDHm' }); //p@ssw0rd
  }
  public findByName(name: string) {
    return this.users.find((user) => user.name === name);
  }
}