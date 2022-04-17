export interface Business {
  id: number;
  name: string;
  location: {
    address: string;
    city: string;
    country: string;
  }
  revenue: BusinessRevenue[];
}

export interface BusinessRevenue {
  seq: number;
  date: string;
  value: number;
}
