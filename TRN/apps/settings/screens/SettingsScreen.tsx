import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Card } from '@ui/index';
import Icon from 'react-native-vector-icons/Feather';

type SettingsScreenProps = {
  navigation: any;
};

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { colors, theme, toggleTheme } = useTheme();

  const renderSettingItem = (
    icon: string,
    title: string,
    onPress: () => void,
    rightElement?: React.ReactNode,
    subtitle?: string
  ) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.backgroundHighlight }]}>
        <Icon name={icon} size={20} color={colors.primary} />
      </View>
      
      <View style={styles.settingItemContent}>
        <View>
          <Typography variant="body" style={{ color: colors.text }}>
            {title}
          </Typography>
          
          {subtitle ? (
            <Typography variant="caption" style={{ color: colors.textSecondary }}>
              {subtitle}
            </Typography>
          ) : null}
        </View>
        
        {rightElement || (
          <Icon name="chevron-right" size={20} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Typography variant="heading" style={{ color: colors.text }}>
          Settings
        </Typography>
      </View>
      
      <ScrollView>
        <Card style={styles.section}>
          <TouchableOpacity
            style={styles.profileSection}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={[styles.profileImage, { backgroundColor: colors.backgroundHighlight }]}>
              <Icon name="user" size={32} color={colors.primary} />
            </View>
            
            <View style={styles.profileInfo}>
              <Typography variant="subheading" style={{ color: colors.text }}>
                John Doe
              </Typography>
              
              <Typography variant="caption" style={{ color: colors.textSecondary }}>
                john.doe@example.com
              </Typography>
            </View>
            
            <Icon name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </Card>

        <Card style={styles.section}>
          <Typography variant="subheading" style={[styles.sectionTitle, { color: colors.text }]}>
            App Settings
          </Typography>
          
          {renderSettingItem(
            'moon',
            'Dark Mode',
            toggleTheme,
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.backgroundSecondary, true: colors.primary }}
              thumbColor={colors.white}
            />
          )}
          
          {renderSettingItem(
            'globe',
            'Language',
            () => {},
            <Typography variant="body" style={{ color: colors.textSecondary }}>
              English
            </Typography>
          )}
          
          {renderSettingItem('dollar-sign', 'Currency', () => {}, 
            <Typography variant="body" style={{ color: colors.textSecondary }}>
              USD
            </Typography>
          )}
        </Card>

        <Card style={styles.section}>
          <Typography variant="subheading" style={[styles.sectionTitle, { color: colors.text }]}>
            Security
          </Typography>
          
          {renderSettingItem('shield', 'Security Settings', () => {})}
          {renderSettingItem('lock', 'Change PIN', () => {})}
          {renderSettingItem('alert-triangle', 'Suspicious Activity', () => {})}
        </Card>

        <Card style={styles.section}>
          <Typography variant="subheading" style={[styles.sectionTitle, { color: colors.text }]}>
            Notifications
          </Typography>
          
          {renderSettingItem(
            'bell',
            'Push Notifications',
            () => {},
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: colors.backgroundSecondary, true: colors.primary }}
              thumbColor={colors.white}
            />
          )}
          
          {renderSettingItem(
            'mail',
            'Email Notifications',
            () => {},
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: colors.backgroundSecondary, true: colors.primary }}
              thumbColor={colors.white}
            />
          )}
          
          {renderSettingItem('dollar-sign', 'Price Alerts', () => {})}
        </Card>

        <Card style={styles.section}>
          <Typography variant="subheading" style={[styles.sectionTitle, { color: colors.text }]}>
            About
          </Typography>
          
          {renderSettingItem('info', 'About OKX Clone', () => {})}
          {renderSettingItem('help-circle', 'Help Center', () => {})}
          {renderSettingItem('file-text', 'Terms of Service', () => {})}
          {renderSettingItem('shield', 'Privacy Policy', () => {})}
        </Card>

        <TouchableOpacity style={styles.logoutButton}>
          <Typography variant="body" style={{ color: colors.error }}>
            Log Out
          </Typography>
        </TouchableOpacity>
        
        <Typography variant="caption" style={[styles.versionText, { color: colors.textSecondary }]}>
          Version 1.0.0
        </Typography>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    padding: 16,
    paddingBottom: 8,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0.5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    alignItems: 'center',
    padding: 16,
    marginVertical: 16,
  },
  versionText: {
    textAlign: 'center',
    marginBottom: 32,
  },
});

export default SettingsScreen;
