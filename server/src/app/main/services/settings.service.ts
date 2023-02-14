import { MongoClient } from 'mongodb';
import { Premiere, User } from '../../shared/types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default class SettingService {
private mongoClient: MongoClient;
private premiere: Premiere;

  constructor() {
    this.mongoClient = new MongoClient('mongodb+srv://rs-clone');
    this.premiere = {
      ID: '301',
      link: 'https://youtu.be/8qB8EGNOtr8',
    }
  }

  public setPremiereID(ID: string) {
    this.premiere.ID = ID;
  }

  public setPremiereLink(link: string) {
    this.premiere.link = link;
  }

  public getPremiere() {
    return this.premiere;
  }
}