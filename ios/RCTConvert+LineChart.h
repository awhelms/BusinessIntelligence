//
//  RCTConvert+LineChart.h
//  BusinessIntelligence
//
//  Created by Anthony Helms on 4/17/22.
//

#ifndef RCTConvert_LineChart_h
#define RCTConvert_LineChart_h

#import <React/RCTConvert.h>
#import "BusinessIntelligence-Swift.h"

@import Charts;

@interface RCTConvert (LineChart)
+ (LineChartData*) lineChartDataFromJSON:(id) json;
@end

@implementation RCTConvert (LineChart)

+ (LineChartData*) lineChartDataFromJSON:(id) json {
  LineChartData* lineChartData = [LineChartData new];
  json = [self NSDictionary:json];
  NSArray* inDataSets = json[@"dataSets"];
  for (NSDictionary* inDataSet in inDataSets) {
    LineChartDataSet* dataSet = [LineChartDataSet new];
    NSString* inAxisDependency = inDataSet[@"axisDependency"];
    AxisDependency axisDependency = ([inAxisDependency isEqualToString:@"LEFT"] ? AxisDependencyLeft : AxisDependencyRight);
    [dataSet setAxisDependency:axisDependency];
    [dataSet setLabel:inDataSet[@"label"]];
    
    NSArray* inEntries = inDataSet[@"entries"];
    for (NSDictionary* inEntry in inEntries) {
      ChartDataEntry* entry = [ChartDataEntry new];
      entry.x = [inEntry[@"xValue"] doubleValue];
      entry.y = [inEntry[@"yValue"] doubleValue];
      
      [dataSet addEntry:entry];
    }

    UIColor* primary = [UIColor colorWithRed: 0.61 green: 0.15 blue: 0.69 alpha: 1.00];
    [dataSet setColor:primary];
    [dataSet setCircleColor:primary];
    [lineChartData addDataSet:dataSet];
  }
  [lineChartData setValueFormatter:[ChartsLargeValueFormatter new]];
  [lineChartData setValueFont:[UIFont systemFontOfSize:12]];
  return lineChartData;
}

@end
#endif /* RCTConvert_LineChart_h */
