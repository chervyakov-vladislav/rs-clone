export type TSObject = Record<string, string>;

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ResponseData<T> {
  total: number;
  items: T[];
}

export interface ResponseAuth {
  errors: TSObject;
  token: string;
  data: TSObject;
}
