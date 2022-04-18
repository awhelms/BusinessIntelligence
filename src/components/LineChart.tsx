import { ReactElement } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const LineChart = requireNativeComponent<LineChartProps>('LineChart');

export default LineChart;


export interface LineChartProps extends ViewProps {
  data: LineData;
  xAxisValueMap: Record<number, string>;
}

export enum YAxisDependency {
  LEFT = 'LEFT', RIGHT = 'RIGHT'
}

export interface Entry {
  xValue: string | number;
  yValue: string | number;
}

export interface LineDataSet {
  entries: Entry[];
  label: string;
  axisDependency: YAxisDependency;
}

export interface LineData {
  dataSets: LineDataSet[];
}
