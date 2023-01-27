import { CarInterface } from './response-data';

export interface StateInterface {
  carsPage: number;
  cars: CarInterface[] | null | undefined;
  carsCount: number;
  winnersPage: number;
  winnersCount: number;
  sortBy: 'id' | 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
  updateID: number;
  animation: Record<number, number>;
  time: number;
  distance: number;
}

export interface ResultsInterface {
  time: number;
  broken: boolean;
}
