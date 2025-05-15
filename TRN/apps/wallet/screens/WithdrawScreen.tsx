import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Button, Card, Input } from '@ui/index';
import Icon from 'react-native-vector-icons/Feather';
import { useApi } from '@utils/useApi';
import { numberFormatter } from '@utils/numberFormatter';

type WithdrawScreenProps = {
  navigation: any;
};

const WithdrawScreen = ({ navigation }: WithdrawScreenProps) => {
  const { colors } = useTheme();
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [cryptoList, setCryptoList] = useState(['BTC', 'ETH', 'USDT', 'SOL', 'XRP']);
  const [withdrawalAddress, setWithdrawalAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState(0);
  const { data: balancesData, get, post, loading } = useApi();

  React.useEffect(() => {
    if (selectedCrypto) {
      // Fetch withdrawal fee
      const fetchFee = async () => {
        try {
          const response = await get(`/wallet/withdrawal-fee?currency=${selectedCrypto}`);
          if (response && response.fee) {
            setFee(response.fee);
          }
        } catch (error) {
          console.error('Error fetching withdrawal fee:', error);
        }
      };

      fetchFee();
    }
  }, [selectedCrypto]);

  const handleWithdraw = async () => {
    if (!selectedCrypto || !withdrawalAddress || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await post('/wallet/withdraw', {
        currency: selectedCrypto,
        address: withdrawalAddress,
        amount: parseFloat(amount),
      });

      if (response.success) {
        Alert.alert('Success', 'Withdrawal request submitted successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.message || 'Failed to submit withdrawal request');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit withdrawal request');
    }
  };

  const getMaxBalance = () => {
    const asset = balancesData?.assets?.find(a => a.symbol === selectedCrypto);
    return asset ? asset.balance : 0;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Typography variant="heading" style={{ color: colors.text }}>
          Withdraw
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
          <>
            <Card style={styles.inputCard}>
              <Typography variant="subheading" style={{ color: colors.text, marginBottom: 16 }}>
                Withdrawal Details
              </Typography>
              
              <Input
                label="Recipient Address"
                value={withdrawalAddress}
                onChangeText={setWithdrawalAddress}
                placeholder={`Enter ${selectedCrypto} address`}
                style={styles.input}
              />
              
              <View style={styles.amountContainer}>
                <Input
                  label="Amount"
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  keyboardType="numeric"
                  style={styles.amountInput}
                />
                
                <TouchableOpacity
                  style={[styles.maxButton, { backgroundColor: colors.backgroundHighlight }]}
                  onPress={() => setAmount(getMaxBalance().toString())}
                >
                  <Typography variant="body" style={{ color: colors.primary }}>
                    MAX
                  </Typography>
                </TouchableOpacity>
              </View>
              
              <View style={styles.feeContainer}>
                <Typography variant="caption" style={{ color: colors.textSecondary }}>
                  Network Fee:
                </Typography>
                
                <Typography variant="caption" style={{ color: colors.text }}>
                  {fee} {selectedCrypto}
                </Typography>
              </View>
              
              <View style={styles.balanceContainer}>
                <Typography variant="caption" style={{ color: colors.textSecondary }}>
                  Available Balance:
                </Typography>
                
                <Typography variant="caption" style={{ color: colors.text }}>
                  {getMaxBalance()} {selectedCrypto}
                </Typography>
              </View>
            </Card>
            
            <View style={styles.buttonContainer}>
              <Button
                title="Withdraw"
                onPress={handleWithdraw}
                loading={loading}
                disabled={loading || !withdrawalAddress || !amount}
              />
            </View>
          </>
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
  inputCard: {
    padding: 16,
    margin: 16,
  },
  input: {
    marginBottom: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  amountInput: {
    flex: 1,
    marginRight: 8,
  },
  maxButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
});

export default WithdrawScreen;
