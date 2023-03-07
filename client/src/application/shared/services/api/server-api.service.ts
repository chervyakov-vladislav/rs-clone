import apiLoader from './server-api.loader';
import { ResponseAuth, TSObject } from '../../models/base-types';
import { IReviewsDataBackend, PremiereInfoBackend } from '../../models/response-data';

const PATH = 'https://pvd.giize.com/';
// const PATH = 'http://146.255.188.74:3000';
// const PATH = 'http://localhost:3000/';

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

  public getAllUsers(): Promise<ResponseAuth> {
    return apiLoader.get('user/all', {});
  }

  public deleteUser(id: string) {
    return apiLoader.delete(`user/delete/${id}`);
  }

  public updateUser(data: TSObject, avatar?: File): Promise<ResponseAuth> {
    console.log(data);
    const formData = new FormData();
    formData.append('login', data.login);
    if (data.name) formData.append('name', data.name);
    if (data.password) formData.append('password', data.password);
    if (data.role) formData.append('role', data.role);
    if (avatar) {
      const avatarFileName = avatar ? `${data.login}_av.${avatar.name.split('.').pop()}` : '';
      formData.append('avatar', `${PATH}${avatarFileName}`);
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

  public createReview(data: TSObject, filmID: string): Promise<TSObject> {
    return apiLoader.post(`posts/new/${filmID}`, data);
  }

  public getAllReviews(): Promise<TSObject> {
    return apiLoader.get('posts/all', {});
  }

  public getFilmReviews(filmID: number): Promise<TSObject> {
    return apiLoader.get(`posts/byfilm/${filmID}`, {});
  }

  public getUserReviews(login: string): Promise<IReviewsDataBackend> {
    return apiLoader.get(`posts/bylogin/${login}`, {});
  }

  public deleteUserReviews(login: string): Promise<TSObject> {
    return apiLoader.delete(`posts/${login}`);
  }
}

const apiService = new ApiService();
export default apiService;
