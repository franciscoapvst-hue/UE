import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { getSession, Session } from './src/services/auth.service';

type Screen = 'login' | 'register' | 'home';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession().then(s => {
      if (s) { setSession(s); setScreen('home'); }
    });
  }, []);

  function handleLogin(s: Session) {
    setSession(s);
    setScreen('home');
  }

  function handleLogout() {
    setSession(null);
    setScreen('login');
  }

  return (
    <SafeAreaProvider>
      {screen === 'login' && (
        <LoginScreen onLogin={handleLogin} onGoRegister={() => setScreen('register')} />
      )}
      {screen === 'register' && (
        <RegisterScreen onLogin={handleLogin} onGoLogin={() => setScreen('login')} />
      )}
      {screen === 'home' && session && (
        <HomeScreen session={session} onLogout={handleLogout} />
      )}
    </SafeAreaProvider>
  );
}
