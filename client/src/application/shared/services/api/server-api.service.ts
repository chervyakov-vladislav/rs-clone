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

  public updateUser(data: TSObject, avatar?: File): Promise<ResponseAuth> {
    console.log(data);
    const formData = new FormData();
    formData.append('login', data.login);
    formData.append('name', data.name);
    formData.append('password', data.password);
    formData.append('role', data.role);
    if (avatar) {
      const avatarFileName = avatar ? `${data.login}_av.${avatar.name.split('.').pop()}` : '';
      formData.append('avatar', `http://localhost:3000/${avatarFileName}`);
      formData.append('file', avatar, avatarFileName);
    }

    return apiLoader.patchFormData('user/update', formData);
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
