import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Button, Card } from '@ui/index';
import { useApi } from '@utils/useApi';
import { numberFormatter } from '@utils/numberFormatter';
import Icon from 'react-native-vector-icons/Feather';

type WalletScreenProps = {
  navigation: any;
};

const WalletScreen = ({ navigation }: WalletScreenProps) => {
  const { colors } = useTheme();
  const { data: balancesData, loading, refetch } = useApi('/balances');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Typography variant="heading" style={{ color: colors.text }}>
          Wallet
        </Typography>
      </View>
      
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        <Card style={styles.balanceCard}>
          <Typography variant="caption" style={{ color: colors.textSecondary, marginBottom: 8 }}>
            Total Balance
          </Typography>
          
          <Typography variant="largeHeading" style={{ color: colors.text, marginBottom: 16 }}>
            ${numberFormatter.format(balancesData?.totalBalanceUSD || 0)}
          </Typography>
          
          <View style={styles.actionButtons}>
            <Button
              title="Deposit"
              onPress={() => navigation.navigate('Deposit')}
              icon="arrow-down"
              style={[styles.actionButton, { marginRight: 8 }]}
            />
            
            <Button
              title="Withdraw"
              onPress={() => navigation.navigate('Withdraw')}
              icon="arrow-up"
              style={styles.actionButton}
              variant="secondary"
            />
          </View>
        </Card>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="subheading" style={{ color: colors.text }}>
              Your Assets
            </Typography>
            
            <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
              <Typography variant="body" style={{ color: colors.primary }}>
                Transaction History
              </Typography>
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <Card style={styles.loadingCard}>
              <Typography variant="body" style={{ color: colors.textSecondary }}>
                Loading assets...
              </Typography>
            </Card>
          ) : (
            balancesData?.assets?.map((asset) => (
              <TouchableOpacity key={asset.id} activeOpacity={0.7}>
                <Card style={styles.assetCard}>
                  <View style={styles.assetInfo}>
                    <View style={[styles.assetIcon, { backgroundColor: colors.backgroundHighlight }]}>
                      <Typography variant="subheading" style={{ color: colors.primary }}>
                        {asset.symbol.slice(0, 1)}
                      </Typography>
                    </View>
                    
                    <View>
                      <Typography variant="subheading" style={{ color: colors.text }}>
                        {asset.symbol}
                      </Typography>
                      
                      <Typography variant="caption" style={{ color: colors.textSecondary }}>
                        {asset.name}
                      </Typography>
                    </View>
                  </View>
                  
                  <View style={styles.assetBalances}>
                    <Typography variant="body" style={{ color: colors.text, textAlign: 'right' }}>
                      {asset.balance.toFixed(6)} {asset.symbol}
                    </Typography>
                    
                    <Typography variant="caption" style={{ color: colors.textSecondary, textAlign: 'right' }}>
                      ${numberFormatter.format(asset.balanceUSD)}
                    </Typography>
                  </View>
                  
                  <Icon name="chevron-right" size={16} color={colors.textSecondary} />
                </Card>
              </TouchableOpacity>
            ))
          )}
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
    padding: 16,
    paddingTop: 24,
  },
  balanceCard: {
    padding: 16,
    margin: 16,
    marginTop: 0,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingCard: {
    padding: 16,
    alignItems: 'center',
  },
  assetCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
  },
  assetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assetBalances: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 12,
  },
});

export default WalletScreen;
