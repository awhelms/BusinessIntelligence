//
//  LineChartViewManager.m
//  BusinessIntelligence
//
//  Created by Anthony Helms on 4/17/22.
//

#import <Foundation/Foundation.h>

#import <React/RCTViewManager.h>
#import "RCTConvert+LineChart.h"

#import "BusinessIntelligence-Swift.h"

@import Charts;

@interface LineChartViewManager: RCTViewManager <IChartAxisValueFormatter>

@property NSDictionary* xAxisValueMap;

@end

@implementation LineChartViewManager


RCT_EXPORT_MODULE(LineChart)

RCT_CUSTOM_VIEW_PROPERTY(data, LineChartData, LineChartView) {
  [view setData:[RCTConvert lineChartDataFromJSON:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(xAxisValueMap, id, LineChartView) {
  self.xAxisValueMap = json;
}

- (UIView*) view {
  LineChartView* lineChartView = [LineChartView new];
  
  lineChartView.xAxis.valueFormatter = self;
  lineChartView.xAxis.labelPosition = XAxisLabelPositionBottom;
  lineChartView.xAxis.granularity = 1;
  
  ChartYAxisRenderer* yAxisRight = lineChartView.rightYAxisRenderer;
  [yAxisRight.axis setDrawLabelsEnabled:false];

  lineChartView.leftAxis.valueFormatter = [ChartsLargeValueFormatter new];
  [lineChartView.leftAxis setDrawZeroLineEnabled:false];
  [lineChartView.leftAxis setDrawGridLinesEnabled:false];

  return lineChartView;
}



#pragma mark IChartAxisValueFormatter
- (NSString*) stringForValue: (double) value
                        axis: (ChartAxisBase*) axis {
  NSString* stringValue = [NSString stringWithFormat:@"%.lf", value];
  if (!self.xAxisValueMap) {
    return stringValue;
  }
  
  NSLog(@"stringValue %@ mapped Value %@", stringValue, self.xAxisValueMap[stringValue]);
  return self.xAxisValueMap[stringValue];
}

@end
