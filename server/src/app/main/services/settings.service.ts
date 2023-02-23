import { MongoClient } from 'mongodb';
import dbClient from '../../shared/db-client';
import { Premiere } from '../../shared/model/types';

export default class SettingService {
  private mongoClient: MongoClient;

  private premiere: Premiere;

  constructor() {
    this.mongoClient = new MongoClient('mongodb+srv://rs-clone');
    this.premiere = {
      ID: '301',
      link: 'https://youtu.be/8qB8EGNOtr8',
    };
  }

  public async setPremiere(ID: string, link: string) {
    this.premiere.ID = ID;
    this.premiere.link = link;
    const collection = await dbClient.getSettingsCollection();
    const data = await collection.updateOne({}, { $set: { premiere: this.premiere } });
    console.log(data);
    return this.premiere;
  }

  public async getPremiere() {
    const collection = await dbClient.getSettingsCollection();
    const data = await collection.findOne();
    if (data) this.premiere = data.premiere;
    return this.premiere;
  }
}
