import type { Business } from '../types';

export interface ProviderState {
  loading: boolean;
  businesses: Business[];
  error: any;
}
