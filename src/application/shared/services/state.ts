import { StateInterface } from '../models/state';
import { apiService } from './api.service';

class State {
  public allData: StateInterface;

  constructor() {
    this.allData = {
      carsPage: 1,
      cars: null,
      carsCount: 0,
      winnersPage: 1,
      winnersCount: 0,
      sortBy: 'time',
      sortOrder: 'ASC',
      updateID: 0,
      animation: {},
      time: 0,
      distance: 0,
    };
  }

  public async updateGarageState(page: number) {
    const res = await apiService.getCars(page);
    this.allData.cars = res?.cars;
    this.allData.carsCount = Number(res?.count);
  }

  public getAnimationID(id: number) {
    return this.allData.animation[id];
  }

  public setAnimationID(id: number, animationID: number) {
    this.allData.animation[id] = animationID;
  }

  public getTime() {
    return this.allData.time;
  }

  public setTime(time: number) {
    this.allData.time = time;
  }

  public getSortType(): 'id' | 'wins' | 'time' {
    return this.allData.sortBy;
  }

  public setSortType(sortBy: 'id' | 'wins' | 'time') {
    this.allData.sortBy = sortBy;
  }

  public getSortOrder(): 'ASC' | 'DESC' {
    return this.allData.sortOrder;
  }

  public setSortOrder(sortOrder: 'ASC' | 'DESC') {
    this.allData.sortOrder = sortOrder;
  }

  public getCarsPage(): number {
    return this.allData.carsPage;
  }

  public setCarsPage(page: number) {
    this.allData.carsPage = page;
  }

  public getWinnersPage(): number {
    return this.allData.winnersPage;
  }

  public setWinnersPage(page: number) {
    this.allData.winnersPage = page;
  }
}

const state = new State();
export { state };
