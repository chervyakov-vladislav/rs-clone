export type User = {
  login: string;
  name: string;
  password: string;
  role: Role;
  avatar?: string;
};

export type Post = {
  author: string;
  date: string;
  description: string;
  kinopoiskId: number;
  negativeRating: number;
  positiveRating: number;
  title: string;
  type: string;
};

export type Premiere = {
  ID: string;
  link: string;
};

export type Role = 'banned' | 'guest' | 'user' | 'admin';
