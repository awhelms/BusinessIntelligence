import { DateTime } from 'luxon';
import { Business } from '../types';
import { YAxisDependency, LineData } from '../components/LineChart';

export const buildXAxisValueMap = (business: Business | undefined): Record<number, string> => {
  if (!business) {
    return {} as Record<number, string>;
  }

  return business.revenue.reduce((obj, r) => {
    // 2019-03-12 00:14:10
    obj[r.seq] = DateTime.fromFormat(r.date, 'yyyy-MM-dd HH:mm:ss').toFormat('LLL yy');
    return obj;
  }, {} as Record<number, string>)
}

export const buildLineData = (business: Business | undefined): LineData => {
  if (!business) {
    return { dataSets: [] };
  }

  return {
    dataSets: [{
      entries: business.revenue.map((r) => ({
        xValue: r.seq,
        yValue: r.value,
      })),
      axisDependency: YAxisDependency.LEFT,
      label: 'Revenue',
    }],
  };
}
