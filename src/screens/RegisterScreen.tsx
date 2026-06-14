import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
import { requestOtp } from '../services/auth.service';
import type { Session } from '../services/auth.service';
import OtpScreen from './OtpScreen';

interface Props {
  onLogin: (session: Session) => void;
  onGoLogin: () => void;
}

export function RegisterScreen({ onLogin, onGoLogin }: Props) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  async function handleRegister() {
    if (!nombre || !email || !password || !confirm) { setError('Completa todos los campos'); return; }
    if (password !== confirm) { setError('Las contraseñas no coinciden'); return; }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
    setError('');
    setLoading(true);
    try {
      await requestOtp(nombre.trim(), email.trim().toLowerCase(), password);
      setPendingEmail(email.trim().toLowerCase());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  }

  if (pendingEmail) {
    return (
      <OtpScreen
        email={pendingEmail}
        onSuccess={onLogin}
        onBack={() => setPendingEmail(null)}
      />
    );
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        <View style={styles.logoWrap}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>UE</Text>
          </View>
          <Text style={styles.logoSub}>Delivery</Text>
        </View>

        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Únete y empieza a pedir</Text>

        <View style={styles.form}>
          {[
            { label: 'Nombre completo', value: nombre, onChange: setNombre, placeholder: 'Juan Pérez', secure: false, keyboard: 'default' },
            { label: 'Correo electrónico', value: email, onChange: setEmail, placeholder: 'tucorreo@email.com', secure: false, keyboard: 'email-address' },
            { label: 'Contraseña', value: password, onChange: setPassword, placeholder: '••••••••', secure: true, keyboard: 'default' },
            { label: 'Confirmar contraseña', value: confirm, onChange: setConfirm, placeholder: '••••••••', secure: true, keyboard: 'default' },
          ].map(f => (
            <View key={f.label} style={styles.field}>
              <Text style={styles.label}>{f.label}</Text>
              <TextInput
                style={styles.input}
                value={f.value}
                onChangeText={f.onChange}
                placeholder={f.placeholder}
                placeholderTextColor="#bbb"
                secureTextEntry={f.secure}
                keyboardType={f.keyboard as any}
                autoCapitalize={f.keyboard === 'email-address' ? 'none' : 'words'}
              />
              <View style={styles.underline} />
            </View>
          ))}

          {error !== '' && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>Registrarme</Text>
            }
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.mutedText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={onGoLogin}>
              <Text style={styles.link}>Inicia sesión</Text>
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

  logoWrap: { alignItems: 'center', marginBottom: 28 },
  logoBox: {
    width: 72, height: 72, borderRadius: 18,
    backgroundColor: '#1a6b3a', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#1a6b3a', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 8, marginBottom: 6,
  },
  logoText: { color: '#fff', fontSize: 28, fontWeight: '900', letterSpacing: -2 },
  logoSub: { fontSize: 12, fontWeight: '700', color: '#1a6b3a', letterSpacing: 2, textTransform: 'uppercase' },

  title: { fontSize: 24, fontWeight: '800', color: '#111', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#999', textAlign: 'center', marginTop: 4, marginBottom: 28 },

  form: { gap: 20 },
  field: { gap: 4 },
  label: { fontSize: 11, fontWeight: '700', color: '#1a6b3a', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { fontSize: 16, color: '#111', paddingVertical: 8 },
  underline: { height: 2, backgroundColor: '#eee' },

  error: {
    backgroundColor: '#fff0f0', color: '#d32f2f',
    borderRadius: 10, padding: 12, fontSize: 13,
    textAlign: 'center', borderLeftWidth: 3, borderLeftColor: '#d32f2f',
  },

  btn: {
    backgroundColor: '#1a6b3a', borderRadius: 14,
    padding: 16, alignItems: 'center', marginTop: 4,
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  row: { flexDirection: 'row', justifyContent: 'center' },
  mutedText: { fontSize: 14, color: '#999' },
  link: { fontSize: 14, color: '#1a6b3a', fontWeight: '700' },
});
