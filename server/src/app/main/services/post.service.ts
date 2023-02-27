import { Post } from '../../shared/model/types';
import dbClient from '../../shared/db-client';

export default class PostsService {
  private posts: Post[];

  constructor() {
    this.posts = [];
  }

  public async create(post: Post, filmID: string, login: string) {
    const collection = await dbClient.getPostsCollection();
    const createdAt = new Date();

    const { insertedId } = await collection.insertOne({
      filmID,
      login,
      author: post.author,
      date: createdAt,
      description: post.description,
      kinopoiskId: post.kinopoiskId,
      negativeRating: post.negativeRating,
      positiveRating: post.positiveRating,
      title: post.title,
      type: post.type,
    });
    console.log('created post', insertedId);
    return post;
  }

  public async getAllPosts() {
    const collection = await dbClient.getPostsCollection();
    const data = await collection.find().toArray();
    console.log('Get all posts from DB');
    return data;
  }

  public async getPostsbyFilmID(filmID: string) {
    const collection = await dbClient.getPostsCollection();
    const data = await collection.find({ filmID }).toArray();
    console.log('Get posts by film ID from DB');
    return data;
  }

  public async getPostsbyLogin(login: string) {
    const collection = await dbClient.getPostsCollection();
    const data = await collection.find({ login }).toArray();
    console.log('Get posts by film ID from DB');
    return data;
  }
}
