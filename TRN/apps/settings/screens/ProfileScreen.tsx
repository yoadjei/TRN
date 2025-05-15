import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Button, Input, Card } from '@ui/index';
import Icon from 'react-native-vector-icons/Feather';
import { useApi } from '@utils/useApi';

type ProfileScreenProps = {
  navigation: any;
};

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { colors } = useTheme();
  const { data: userData, put, loading } = useApi('/user');
  
  const [name, setName] = useState(userData?.name || 'John Doe');
  const [email, setEmail] = useState(userData?.email || 'john.doe@example.com');
  const [phone, setPhone] = useState(userData?.phone || '+1 (555) 123-4567');
  const [country, setCountry] = useState(userData?.country || 'United States');
  
  const handleSave = async () => {
    try {
      const response = await put('/user', {
        name,
        email,
        phone,
        country,
      });
      
      if (response.success) {
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.message || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating your profile');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Typography variant="heading" style={{ color: colors.text }}>
          Edit Profile
        </Typography>
        
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.photoSection}>
          <View style={[styles.profileImage, { backgroundColor: colors.backgroundHighlight }]}>
            <Icon name="user" size={40} color={colors.primary} />
          </View>
          
          <TouchableOpacity style={[styles.changePhotoButton, { backgroundColor: colors.primaryLight }]}>
            <Typography variant="body" style={{ color: colors.primary }}>
              Change Photo
            </Typography>
          </TouchableOpacity>
        </View>
        
        <Card style={styles.formCard}>
          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            style={styles.input}
          />
          
          <Input
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          
          <Input
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            style={styles.input}
          />
          
          <Input
            label="Country"
            value={country}
            onChangeText={setCountry}
            placeholder="Enter your country"
            style={styles.input}
          />
        </Card>
        
        <Card style={styles.verificationCard}>
          <View style={styles.verificationHeader}>
            <Typography variant="subheading" style={{ color: colors.text }}>
              Verification Status
            </Typography>
            
            <View style={[styles.verificationBadge, { backgroundColor: colors.success + '30' }]}>
              <Typography variant="caption" style={{ color: colors.success }}>
                Verified
              </Typography>
            </View>
          </View>
          
          <Typography variant="caption" style={{ color: colors.textSecondary, marginTop: 8 }}>
            Your account is fully verified. You have access to all features.
          </Typography>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Save Changes"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
  },
  backButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  formCard: {
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  verificationCard: {
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 16,
  },
  verificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verificationBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
});

export default ProfileScreen;
