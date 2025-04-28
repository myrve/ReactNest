import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';

export default function WelcomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, router]);
  
  const handleLogin = () => {
    router.push('/login');
  };
  
  const handleRegister = () => {
    router.push('/register');
  };
  
  const handleGuestLogin = () => {
    const { loginAsGuest } = useAuthStore.getState();
    loginAsGuest();
    router.replace('/(tabs)');
  };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>RN</Text>
        </View>
      </LinearGradient>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          React Native Mastery
        </Text>
        
        <Text style={[styles.subtitle, { color: theme.colors.subtext }]}>
          Your journey to becoming a React Native expert starts here
        </Text>
        
        <View style={styles.features}>
          <FeatureItem 
            icon="🚀" 
            text="Comprehensive learning modules" 
            textColor={theme.colors.text}
          />
          <FeatureItem 
            icon="🧩" 
            text="Interactive code examples" 
            textColor={theme.colors.text}
          />
          <FeatureItem 
            icon="🎯" 
            text="Quizzes to test your knowledge" 
            textColor={theme.colors.text}
          />
          <FeatureItem 
            icon="🏆" 
            text="Earn points and level up" 
            textColor={theme.colors.text}
          />
        </View>
      </View>
      
      <View style={styles.buttons}>
        <Button 
          title="Login" 
          onPress={handleLogin} 
          style={styles.button}
        />
        
        <Button 
          title="Register" 
          variant="secondary"
          onPress={handleRegister} 
          style={styles.button}
        />
        
        <Button 
          title="Continue as Guest" 
          variant="outline"
          onPress={handleGuestLogin} 
          style={styles.button}
        />
      </View>
    </View>
  );
}

interface FeatureItemProps {
  icon: string;
  text: string;
  textColor: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text, textColor }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={[styles.featureText, { color: textColor }]}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4E7AEF',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  features: {
    marginTop: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
  },
  buttons: {
    padding: 24,
  },
  button: {
    marginBottom: 12,
  },
});