import React from 'react';
import { ViewProps } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../theme';
import { Business } from '../types';

export interface RevenueTrendProps extends ViewProps {
  business: Business;
}

enum RevenueTrendDirection {
  up, down, flat
}

// arbitrary business rule; normally would be in a different file
export const getTrendDirection = (business: Business): RevenueTrendDirection => {
  const latest = business.revenue.find((r) => r.seq === 0);
  const previous = business.revenue.find((r) => r.seq === 1);

  const diff = latest?.value - previous?.value;
  if (diff > 5) {
    return RevenueTrendDirection.up;
  } else if (diff < -5) {
    return RevenueTrendDirection.down;
  }
  return RevenueTrendDirection.flat;
}

export const RevenueTrend = (props: RevenueTrendProps) => {
  const {business, style} = props;
  const trendDirection = getTrendDirection(business);
  const iconName = (trendDirection === RevenueTrendDirection.down) ? 'trending-down' :
    (trendDirection === RevenueTrendDirection.up) ? 'trending-up' : 'trending-flat';

  return <MaterialIcons name={iconName} color={Colors.secondary} size={32} style={style} />
};
