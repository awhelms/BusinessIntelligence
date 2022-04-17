import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useBusiness } from '../context';

export const BusinessDetail = () => {
  const {params: {id}} = useRoute();
  const {setOptions} = useNavigation();
  const {businesses} = useBusiness();

  const business = businesses?.find((b) => b.id === id);

  useEffect(() => {
    setOptions({
      title: business?.name
    });
  }, [business]);

  return (
    <View style={styles.container}>
      <Text>{business?.location.address}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
