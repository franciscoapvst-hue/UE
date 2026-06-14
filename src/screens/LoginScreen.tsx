import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
import { login, saveSession, Session } from '../services/auth.service';

interface Props {
  onLogin: (session: Session) => void;
  onGoRegister: () => void;
}

export function LoginScreen({ onLogin, onGoRegister }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) { setError('Completa todos los campos'); return; }
    setError('');
    setLoading(true);
    try {
      const session = await login(email.trim(), password);
      await saveSession(session);
      onLogin(session);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoWrap}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>UE</Text>
          </View>
          <Text style={styles.logoSub}>Delivery</Text>
        </View>

        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para pedir</Text>

        {/* Campos */}
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="tucorreo@email.com"
              placeholderTextColor="#bbb"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.underline} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#bbb"
              secureTextEntry
            />
            <View style={styles.underline} />
          </View>

          {error !== '' && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>Ingresar</Text>
            }
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.mutedText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={onGoRegister}>
              <Text style={styles.link}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#fff' },
  container: { flexGrow: 1, padding: 28, justifyContent: 'center' },

  logoWrap: { alignItems: 'center', marginBottom: 36 },
  logoBox: {
    width: 88, height: 88, borderRadius: 22,
    backgroundColor: '#1a6b3a',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#1a6b3a', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35, shadowRadius: 12, elevation: 8,
    marginBottom: 8,
  },
  logoText: { color: '#fff', fontSize: 36, fontWeight: '900', letterSpacing: -2 },
  logoSub: { fontSize: 13, fontWeight: '700', color: '#1a6b3a', letterSpacing: 2, textTransform: 'uppercase' },

  title: { fontSize: 26, fontWeight: '800', color: '#111', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#999', textAlign: 'center', marginTop: 4, marginBottom: 36 },

  form: { gap: 24 },
  field: { gap: 4 },
  label: { fontSize: 11, fontWeight: '700', color: '#1a6b3a', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { fontSize: 16, color: '#111', paddingVertical: 8, paddingHorizontal: 0 },
  underline: { height: 2, backgroundColor: '#eee' },

  error: {
    backgroundColor: '#fff0f0', color: '#d32f2f',
    borderRadius: 10, padding: 12, fontSize: 13,
    textAlign: 'center', borderLeftWidth: 3, borderLeftColor: '#d32f2f',
  },

  btn: {
    backgroundColor: '#1a6b3a', borderRadius: 14,
    padding: 16, alignItems: 'center', marginTop: 8,
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  row: { flexDirection: 'row', justifyContent: 'center' },
  mutedText: { fontSize: 14, color: '#999' },
  link: { fontSize: 14, color: '#1a6b3a', fontWeight: '700' },
});
