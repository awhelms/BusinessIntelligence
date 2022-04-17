import type {Business} from '../types';
import businesses from '../../data.json';

export const getBusinesses = (): Promise<Business[]> => {
  return new Promise((resolve) => {
    const waitTime = Math.floor(Math.random() * 500);
    setTimeout(() => resolve(businesses as Business[]), waitTime);
  });
}