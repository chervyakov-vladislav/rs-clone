export type User = {
  login: string;
  name: string;
  password: string;
  role: Role;
  avatar?: string;
};

export type Premiere = {
  ID: string;
  link: string;
};

export type Role = 'banned' | 'guest' | 'user' | 'admin';
