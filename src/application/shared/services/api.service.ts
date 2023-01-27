import { CarInterface, EngineData, WinnerInterface } from '../models/response-data';

class ApiService {
  private baseUrl: string = 'http://localhost:3000';

  private garage: string = `${this.baseUrl}/garage`;

  private engine: string = `${this.baseUrl}/engine`;

  private winners: string = `${this.baseUrl}/winners`;

  public async getCars(page = 1, limit = 7): Promise<{ cars: CarInterface[]; count: string } | null> {
    const data = await fetch(`${this.garage}?_limit=${limit}&_page=${page}`);
    const res: CarInterface[] = await data.json();

    if (data.status === 200) {
      return {
        cars: res,
        count: data.headers.get('X-Total-Count') || '0',
      };
    }

    return null;
  }

  public async getCar(id: number): Promise<CarInterface | null> {
    const data = await fetch(`${this.garage}/${id}`);
    const res: CarInterface = await data.json();

    if (data.status === 200) {
      return res;
    }

    return null;
  }

  public async createCar(car: CarInterface): Promise<void> {
    await fetch(`${this.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  public async deleteCar(id: number): Promise<void> {
    await fetch(`${this.garage}/${id}`, {
      method: 'DELETE',
    });
  }

  public async updateCar(car: CarInterface): Promise<void> {
    await fetch(`${this.garage}/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  public async startEngine(id: number): Promise<{ status: number; res: EngineData }> {
    const data = await fetch(`${this.engine}?id=${id}&status=started`, { method: 'PATCH' });
    const res: EngineData = await data.json();
    return {
      status: data.status,
      res: res,
    };
  }

  public async stopEngine(id: number): Promise<number> {
    const data = await fetch(`${this.engine}?id=${id}&status=stopped`, { method: 'PATCH' });
    return data.status;
  }

  public async isBroken(id: number) {
    const data = await fetch(`${this.engine}?id=${id}&status=drive`, { method: 'PATCH' });
    return data;
  }

  public async getAllWinners(
    page: number,
    sort = 'time',
    order = 'ASC',
    limit = 10
  ): Promise<{ result: WinnerInterface[]; totalCount: string }> {
    const data = await fetch(`${this.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const res: WinnerInterface[] = await data.json();

    return {
      result: res,
      totalCount: data.headers.get('X-Total-Count') || '0',
    };
  }

  public async getWinner(winnerId: number): Promise<{ status: number; result: WinnerInterface }> {
    const data = await fetch(`${this.winners}/${winnerId}`);
    const res: WinnerInterface = await data.json();

    return {
      status: data.status,
      result: res,
    };
  }

  public async createWinner(carData: WinnerInterface): Promise<number> {
    const data = await fetch(`${this.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    return data.status;
  }

  public async updateWinner(carData: WinnerInterface): Promise<void> {
    await fetch(`${this.winners}/${carData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
  }

  public async deleteWinner(carID: number): Promise<void> {
    await fetch(`${this.winners}/${carID}`, {
      method: 'DELETE',
    });
  }
}

const apiService = new ApiService();
export { apiService };
