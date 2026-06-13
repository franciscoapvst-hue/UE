import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  address: string;
  onAddressChange: (address: string) => void;
}

export function AddressBar({ address, onAddressChange }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(address);

  function handleConfirm() {
    if (inputValue.trim()) {
      onAddressChange(inputValue.trim());
    }
    setModalVisible(false);
  }

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
        <Ionicons name="location-sharp" size={18} color="#06C167" />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Entregar en</Text>
          <Text style={styles.address} numberOfLines={1}>{address}</Text>
        </View>
        <Ionicons name="chevron-down" size={16} color="#333" />
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)} />
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>¿Dónde entregamos?</Text>
          <View style={styles.inputRow}>
            <Ionicons name="location-sharp" size={20} color="#06C167" />
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Ingresa tu dirección..."
              placeholderTextColor="#999"
              autoFocus
            />
          </View>
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirmar dirección</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  address: {
    fontSize: 14,
    color: '#111',
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#06C167',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111',
  },
  confirmBtn: {
    backgroundColor: '#06C167',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
