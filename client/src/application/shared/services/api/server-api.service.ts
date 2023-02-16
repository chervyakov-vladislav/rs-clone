import apiLoader from './server-api.loader';
import { ResponseAuth, TSObject } from '../../models/base-types';
import { PremiereInfoBackend } from '../../models/response-data';

class ApiService {
  public loginUser(data: TSObject): Promise<ResponseAuth> {
    return apiLoader.post('user/login', data);
  }

  public registerUser(data: TSObject): Promise<ResponseAuth> {
    return apiLoader.post('user/register', data);
  }

  public authorizationUser(): Promise<ResponseAuth> {
    return apiLoader.get('user/me', {});
  }

  public deleteUser(id: string) {
    return apiLoader.delete(`user/delete/${id}`);
  }

  public getPremiere(): Promise<PremiereInfoBackend> {
    return apiLoader.get('settings/premiere', {});
  }

  public setPremiere(data: TSObject): Promise<TSObject> {
    return apiLoader.post('settings/premiere', data);
  }
}

const apiService = new ApiService();
export default apiService;
