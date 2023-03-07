import './auth-page.scss';
import Page from '../../../shared/components/page';
import Auth from '../../components/auth-page/auth';

export default class AuthPage extends Page {
  private auth: Auth;

  constructor(id: string) {
    super(id);

    this.auth = new Auth(this.node);
  }
}
