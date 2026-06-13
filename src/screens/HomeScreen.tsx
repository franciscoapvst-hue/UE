import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AddressBar } from '../components/AddressBar';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { RestaurantCard } from '../components/RestaurantCard';
import { CATEGORIES, Restaurant } from '../data/restaurants';
import { fetchRestaurants } from '../services/restaurants.service';

// Coordenadas por defecto — se reemplazarán por geolocalización real
const DEFAULT_COORDS = { lat: -12.0464, lng: -77.0428 };

export function HomeScreen() {
  const [address, setAddress] = useState('Av. Principal 123, Lima');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRestaurants();
  }, []);

  async function loadRestaurants() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRestaurants(DEFAULT_COORDS);
      setRestaurants(data);
    } catch {
      setError('No se pudo conectar al servidor. Verifica que el microservicio esté corriendo.');
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const matchesSearch =
        search === '' ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'Todos' || r.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [restaurants, search, selectedCategory]);

  function handleRestaurantPress(restaurant: Restaurant) {
    console.log('Abriendo:', restaurant.name);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <AddressBar address={address} onAddressChange={setAddress} />
        <TouchableOpacity style={styles.cartBtn}>
          <Ionicons name="bag-outline" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#06C167" />
          <Text style={styles.loadingText}>Buscando restaurantes...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.centered}>
          <Ionicons name="wifi-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={loadRestaurants}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && (
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              onClear={() => setSearch('')}
            />
            <Text style={styles.sectionTitle}>Categorías</Text>
            <CategoryFilter
              categories={CATEGORIES}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>
                {selectedCategory === 'Todos' ? 'Restaurantes' : selectedCategory}
              </Text>
              <Text style={styles.resultCount}>{filtered.length} resultados</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <RestaurantCard restaurant={item} onPress={handleRestaurantPress} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No encontramos resultados</Text>
            <Text style={styles.emptySubtext}>Intenta con otro nombre o categoría</Text>
          </View>
        }
      />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  cartBtn: {
    marginLeft: 'auto',
    padding: 4,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  listHeader: {
    gap: 14,
    marginBottom: 4,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  resultCount: {
    fontSize: 13,
    color: '#999',
  },
  separator: {
    height: 12,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 32,
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
  },
  retryBtn: {
    marginTop: 8,
    backgroundColor: '#06C167',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#999',
  },
});
