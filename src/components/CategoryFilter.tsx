import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[styles.chip, selected === cat && styles.chipActive]}
          onPress={() => onSelect(cat)}
        >
          <Text style={[styles.chipText, selected === cat && styles.chipTextActive]}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F4F4F4',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#E6F9F0',
    borderColor: '#06C167',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  chipTextActive: {
    color: '#06C167',
  },
});
