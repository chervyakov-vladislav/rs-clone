import Page from '../components/page';

export interface RouterOptions {
  id: string;
  template: () => Page;
}
