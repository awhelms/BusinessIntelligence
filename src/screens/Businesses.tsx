import React, { useEffect, useMemo } from 'react';
import { FlatList, ListRenderItem, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { useBusiness } from '../context';
import { Business } from '../types';
import { Colors } from '../theme';
import { RevenueTrend } from '../components/RevenueTrend';

export const createRenderBusinessItem = 
  (navigate: (routeName: string, params: any) => void): ListRenderItem<Business> => 
    ({item: business}) => {
      const {name, location, id} = business;
      const onPress = () => navigate('Profile', { id });

      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.rowContainer}>
            <RevenueTrend business={business} style={styles.trend} />
            <View style={styles.businessData}>
              <Text style={styles.primaryText}>{name}</Text>
              <Text style={styles.secondaryText}>{location.city}</Text>
            </View>
            <MaterialIcon name='chevron-right' size={24} color='black' style={styles.icon} />
          </View>
        </TouchableOpacity>
      );
  };

export const keyExtractor = (item: Business) => String(item.id);

export const Businesses = () => {
  const {loading, error, businesses, refresh} = useBusiness();
  const {navigate} = useNavigation();

  const renderBusinessItem = useMemo(() => createRenderBusinessItem(navigate), [navigate]);

  useEffect(() => {
    if (!businesses.length && !loading) {
      refresh();
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (error) {
    // TODO - retry
    return (
      <View style={styles.container}>
        <Text>An error occurred while getting the list of businesses.</Text>
      </View>
    );
  }

  if (businesses) {
    return (
      <FlatList
        data={businesses}
        renderItem={renderBusinessItem}
        keyExtractor={keyExtractor}
      />
    )
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  businessData: {
    flex: 1,
  },
  trend: {
    marginRight: 16,
  },
  icon: {
    marginLeft: 16,
  },
  primaryText: {
    color: Colors.text.dark,
    fontSize: 16,
    marginBottom: 2,
  },
  secondaryText: {
    color: Colors.text.medium,
    fontSize: 14,
  },
})