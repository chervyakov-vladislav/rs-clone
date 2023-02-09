import apiLoader from './server-api.loader';
import { TSObject } from '../../models/base-types';

class ApiService {
  public loginUser(data: TSObject): Promise<TSObject> {
    return apiLoader.post('user/login', data);
  }

  public registerUser(data: TSObject): Promise<TSObject> {
    return apiLoader.post('user/register', data);
  }

  public deleteUser(id: string) {
    return apiLoader.delete(`user/delete/${id}`);
  }
}

const apiService = new ApiService();
export default apiService;
