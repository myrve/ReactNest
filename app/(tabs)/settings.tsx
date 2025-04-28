import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Switch,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Moon, 
  Sun, 
  LogOut, 
  Bell, 
  HelpCircle, 
  Info, 
  Shield, 
  Mail
} from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useAuthStore } from '@/store/auth-store';
import { Card } from '@/components/Card';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, themeType, toggleTheme } = useTheme();
  const { user, logout } = useAuthStore();
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/(auth)');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
      
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Appearance
        </Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            {themeType === 'dark' ? (
              <Moon size={20} color={theme.colors.text} />
            ) : (
              <Sun size={20} color={theme.colors.text} />
            )}
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              Dark Mode
            </Text>
          </View>
          
          <Switch
            value={themeType === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor="#f4f3f4"
          />
        </View>
      </Card>
      
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Notifications
        </Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color={theme.colors.text} />
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              Push Notifications
            </Text>
          </View>
          
          <Switch
            value={true}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor="#f4f3f4"
          />
        </View>
      </Card>
      
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Support
        </Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <HelpCircle size={20} color={theme.colors.text} />
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              Help & FAQ
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Mail size={20} color={theme.colors.text} />
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              Contact Us
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
      
      <Card variant="elevated" style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          About
        </Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Info size={20} color={theme.colors.text} />
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              App Version
            </Text>
          </View>
          
          <Text style={[styles.versionText, { color: theme.colors.subtext }]}>
            1.0.0
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={20} color={theme.colors.text} />
            <Text style={[styles.settingText, { color: theme.colors.text }]}>
              Privacy Policy
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
      
      {user && (
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          onPress={handleLogout}
        >
          <LogOut size={20} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E1E1E1',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  versionText: {
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});