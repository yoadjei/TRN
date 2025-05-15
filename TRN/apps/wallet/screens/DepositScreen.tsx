import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Button, Card, Input } from '@ui/index';
import Icon from 'react-native-vector-icons/Feather';
import { useApi } from '@utils/useApi';

type DepositScreenProps = {
  navigation: any;
};

const DepositScreen = ({ navigation }: DepositScreenProps) => {
  const { colors } = useTheme();
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [cryptoList, setCryptoList] = useState(['BTC', 'ETH', 'USDT', 'SOL', 'XRP']);
  const [depositAddress, setDepositAddress] = useState('');
  const { get } = useApi();

  React.useEffect(() => {
    if (selectedCrypto) {
      // Fetch deposit address
      const fetchAddress = async () => {
        try {
          const response = await get(`/wallet/deposit-address?currency=${selectedCrypto}`);
          if (response && response.address) {
            setDepositAddress(response.address);
          }
        } catch (error) {
          console.error('Error fetching deposit address:', error);
        }
      };

      fetchAddress();
    }
  }, [selectedCrypto]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Typography variant="heading" style={{ color: colors.text }}>
          Deposit
        </Typography>
        
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView>
        <Card style={styles.selectionCard}>
          <Typography variant="subheading" style={{ color: colors.text, marginBottom: 16 }}>
            Select Crypto
          </Typography>
          
          <View style={styles.cryptoList}>
            {cryptoList.map((crypto) => (
              <TouchableOpacity
                key={crypto}
                style={[
                  styles.cryptoItem,
                  {
                    backgroundColor:
                      selectedCrypto === crypto ? colors.primary : colors.backgroundSecondary,
                  },
                ]}
                onPress={() => setSelectedCrypto(crypto)}
              >
                <Typography
                  variant="body"
                  style={{
                    color: selectedCrypto === crypto ? colors.white : colors.text,
                  }}
                >
                  {crypto}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        
        {selectedCrypto ? (
          <Card style={styles.addressCard}>
            <Typography variant="subheading" style={{ color: colors.text, marginBottom: 8 }}>
              Deposit Address
            </Typography>
            
            <Typography variant="caption" style={{ color: colors.textSecondary, marginBottom: 16 }}>
              Send only {selectedCrypto} to this address. Sending any other asset may result in permanent loss.
            </Typography>
            
            <View style={[styles.addressContainer, { backgroundColor: colors.backgroundSecondary }]}>
              <Typography variant="body" style={{ color: colors.text, flex: 1 }}>
                {depositAddress || 'Loading address...'}
              </Typography>
              
              <TouchableOpacity onPress={() => {/* Copy to clipboard */}}>
                <Icon name="copy" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.warningContainer}>
              <Icon name="alert-triangle" size={16} color={colors.warning} style={styles.warningIcon} />
              
              <Typography variant="caption" style={{ color: colors.warning, flex: 1 }}>
                Please verify the address before sending. Transactions cannot be reversed.
              </Typography>
            </View>
          </Card>
        ) : null}
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
  selectionCard: {
    padding: 16,
    margin: 16,
  },
  cryptoList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cryptoItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  addressCard: {
    padding: 16,
    margin: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  warningIcon: {
    marginRight: 8,
    marginTop: 2,
  },
});

export default DepositScreen;
