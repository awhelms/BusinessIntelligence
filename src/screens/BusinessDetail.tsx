import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCardAnimation } from '@react-navigation/stack';

import { useBusiness } from '../context';
import { Colors } from '../theme';

import LineChart, { LineChartProps } from '../components/LineChart';
import { Business } from '../types';
import { buildLineData, buildXAxisValueMap } from '../transforms';


export const getChartDataFromBusiness = (business: Business | undefined): LineChartProps => {
  return {
    data: buildLineData(business), 
    xAxisValueMap: buildXAxisValueMap(business),
  };
};

export const BusinessDetail = () => {
  const {params: {id}} = useRoute();
  const {setOptions, goBack} = useNavigation();
  const {businesses} = useBusiness();
  const { current } = useCardAnimation();

  const business = businesses?.find((b) => b.id === id);

  const chartData = getChartDataFromBusiness(business);

  useEffect(() => {
    setOptions({
      title: business?.name
    });
  }, [business]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={goBack}
        style={[StyleSheet.absoluteFill, styles.backdrop]}
      />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Revenue</Text>
          <LineChart {...chartData} style={styles.chart} />
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  title: {
    fontSize: 20,
    color: Colors.text.dark,
    marginBottom: 8,
  },
  chart: {
    height: 200,
    margin: 16
  },
});
