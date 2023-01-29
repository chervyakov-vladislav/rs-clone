import { GaragePage } from '../../main/pages/garage-page/garage-page';
import { WinnersPage } from '../../main/pages/winners-page/winners-page';

export interface RouterOptions {
  path: string;
  template: GaragePage | WinnersPage;
}
