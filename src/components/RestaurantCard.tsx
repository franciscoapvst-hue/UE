import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant } from '../data/restaurants';

interface Props {
  restaurant: Restaurant;
  onPress: (restaurant: Restaurant) => void;
}

export function RestaurantCard({ restaurant, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, !restaurant.isOpen && styles.cardClosed]}
      onPress={() => onPress(restaurant)}
      activeOpacity={0.85}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
        {!restaurant.isOpen && (
          <View style={styles.closedOverlay}>
            <Text style={styles.closedText}>Cerrado</Text>
          </View>
        )}
        {restaurant.deliveryFee === 0 && (
          <View style={styles.freeBadge}>
            <Text style={styles.freeBadgeText}>Envío gratis</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{restaurant.name}</Text>

        <View style={styles.row}>
          <Ionicons name="star" size={13} color="#FFB800" />
          <Text style={styles.rating}>{restaurant.rating}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.meta}>{restaurant.deliveryTime}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.meta}>{restaurant.distance}</Text>
        </View>

        <View style={styles.tagRow}>
          {restaurant.tags.slice(0, 2).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {restaurant.deliveryFee > 0 && (
            <Text style={styles.fee}>S/ {restaurant.deliveryFee.toFixed(2)} delivery</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardClosed: {
    opacity: 0.7,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#eee',
  },
  closedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closedText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  freeBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#06C167',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  freeBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  info: {
    padding: 12,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  dot: {
    color: '#999',
    fontSize: 13,
  },
  meta: {
    fontSize: 13,
    color: '#666',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    marginTop: 2,
  },
  tag: {
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 11,
    color: '#666',
  },
  fee: {
    fontSize: 11,
    color: '#666',
    marginLeft: 'auto',
  },
});
