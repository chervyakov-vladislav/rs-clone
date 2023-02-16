import { MongoClient } from 'mongodb';

class DBClient {
  private DBName: string;

  private DBUser: string;

  private DBPassword: string;

  private client: MongoClient;

  constructor() {
    this.DBName = 'rsclone';
    this.DBUser = process.env.DB_USER||'rs-clone';
    this.DBPassword = process.env.DB_PASSWORD||'Z94ai17';
    const uri = `mongodb+srv://${this.DBUser}:${this.DBPassword}@cluster0.2uewvbb.mongodb.net/?retryWrites=true&w=majority`;
    this.client = new MongoClient(uri);
  }

  public async connect() {
    try {
      this.client.connect();
    } catch (error) {
      console.log(error);
    }
    console.info(`mongo db client is connected to ${this.DBName}`);
        this.client.on(`close`, () => {
          console.info(`mongo db client is disconnected`);
        });
    return this.client.db(this.DBName);
  }

  public async getUsersCollection() {
    return (await this.connect()).collection('users');
  }

  public async getSettingsCollection() {
    return (await this.connect()).collection('settings');
  }
}

const dbClient = new DBClient();
export default dbClient;