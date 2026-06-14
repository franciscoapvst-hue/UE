import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { verifyOtp, saveSession } from '../services/auth.service';
import type { Session } from '../services/auth.service';

interface Props {
  email: string;
  onSuccess: (session: Session) => void;
  onBack: () => void;
}

export default function OtpScreen({ email, onSuccess, onBack }: Props) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  function handleChange(text: string, index: number) {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
    if (!digit && index > 0) inputs.current[index - 1]?.focus();
  }

  async function handleVerify() {
    const full = code.join('');
    if (full.length < 6) {
      Alert.alert('Código incompleto', 'Ingresa los 6 dígitos del código.');
      return;
    }
    setLoading(true);
    try {
      const session = await verifyOtp(email, full);
      await saveSession(session);
      onSuccess(session);
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Código incorrecto');
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  const expired = secondsLeft <= 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <View style={styles.logo}><Text style={styles.logoText}>UE</Text></View>

        <Text style={styles.title}>Verifica tu correo</Text>
        <Text style={styles.subtitle}>
          Ingresa el código de 6 dígitos enviado a{'\n'}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <View style={styles.row}>
          {code.map((digit, i) => (
            <TextInput
              key={i}
              ref={el => { inputs.current[i] = el; }}
              style={[styles.digitInput, digit ? styles.digitFilled : null]}
              value={digit}
              onChangeText={t => handleChange(t, i)}
              keyboardType="number-pad"
              maxLength={1}
              textContentType="oneTimeCode"
              autoFocus={i === 0}
              selectTextOnFocus
            />
          ))}
        </View>

        {expired ? (
          <Text style={styles.expired}>El código expiró. Vuelve atrás y regístrate de nuevo.</Text>
        ) : (
          <Text style={styles.timer}>
            Expira en <Text style={styles.timerBold}>{secondsLeft}s</Text>
          </Text>
        )}

        <TouchableOpacity
          style={[styles.btn, (loading || expired) && styles.btnDisabled]}
          onPress={handleVerify}
          disabled={loading || expired}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnText}>Verificar</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ede8',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#1a6b3a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  email: {
    color: '#1a6b3a',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  digitInput: {
    width: 44,
    height: 56,
    borderBottomWidth: 2,
    borderColor: '#ddd',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111',
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
  digitFilled: {
    borderColor: '#1a6b3a',
    backgroundColor: '#f0f8f4',
  },
  timer: {
    fontSize: 13,
    color: '#999',
    marginBottom: 24,
  },
  timerBold: {
    fontWeight: '700',
    color: '#1a6b3a',
  },
  expired: {
    fontSize: 13,
    color: '#e53e3e',
    textAlign: 'center',
    marginBottom: 24,
  },
  btn: {
    backgroundColor: '#1a6b3a',
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  backBtn: {
    paddingVertical: 8,
  },
  backText: {
    color: '#888',
    fontSize: 14,
  },
});
