import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Card } from '@ui/index';
import Icon from 'react-native-vector-icons/Feather';
import { useApi } from '@utils/useApi';
import { dateFormatter } from '@utils/dateFormatter';

type TransactionHistoryScreenProps = {
  navigation: any;
};

type Transaction = {
  id: string;
  type: 'deposit' | 'withdrawal';
  status: 'completed' | 'pending' | 'failed';
  amount: number;
  currency: string;
  fee: number;
  timestamp: string;
  address: string;
  txHash: string;
};

const TransactionHistoryScreen = ({ navigation }: TransactionHistoryScreenProps) => {
  const { colors } = useTheme();
  const { data: transactionsData, loading, refetch } = useApi('/transactions');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const isDeposit = item.type === 'deposit';
    const statusColor =
      item.status === 'completed'
        ? colors.success
        : item.status === 'failed'
        ? colors.error
        : colors.warning;

    return (
      <Card style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <View style={styles.typeContainer}>
            <View
              style={[
                styles.typeIcon,
                {
                  backgroundColor: isDeposit ? colors.success : colors.primary,
                },
              ]}
            >
              <Icon
                name={isDeposit ? 'arrow-down' : 'arrow-up'}
                size={16}
                color={colors.white}
              />
            </View>
            
            <View>
              <Typography variant="subheading" style={{ color: colors.text }}>
                {isDeposit ? 'Deposit' : 'Withdrawal'}
              </Typography>
              
              <Typography variant="caption" style={{ color: colors.textSecondary }}>
                {dateFormatter.format(new Date(item.timestamp))}
              </Typography>
            </View>
          </View>
          
          <View style={styles.amountContainer}>
            <Typography variant="body" style={{ color: colors.text, textAlign: 'right' }}>
              {isDeposit ? '+' : '-'}{item.amount} {item.currency}
            </Typography>
            
            <Typography
              variant="caption"
              style={{ color: statusColor, textAlign: 'right', textTransform: 'capitalize' }}
            >
              {item.status}
            </Typography>
          </View>
        </View>
        
        <View style={[styles.transactionDetails, { borderTopColor: colors.border }]}>
          <View style={styles.detailRow}>
            <Typography variant="caption" style={{ color: colors.textSecondary }}>
              {isDeposit ? 'From' : 'To'}:
            </Typography>
            
            <Typography variant="caption" style={{ color: colors.text, flex: 1, textAlign: 'right' }}>
              {item.address.slice(0, 8)}...{item.address.slice(-8)}
            </Typography>
          </View>
          
          <View style={styles.detailRow}>
            <Typography variant="caption" style={{ color: colors.textSecondary }}>
              Transaction Hash:
            </Typography>
            
            <Typography variant="caption" style={{ color: colors.text, flex: 1, textAlign: 'right' }}>
              {item.txHash.slice(0, 8)}...{item.txHash.slice(-8)}
            </Typography>
          </View>
          
          <View style={styles.detailRow}>
            <Typography variant="caption" style={{ color: colors.textSecondary }}>
              Fee:
            </Typography>
            
            <Typography variant="caption" style={{ color: colors.text }}>
              {item.fee} {item.currency}
            </Typography>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Typography variant="heading" style={{ color: colors.text }}>
          Transaction History
        </Typography>
        
        <View style={{ width: 24 }} />
      </View>
      
      <FlatList
        data={transactionsData?.transactions || []}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="inbox" size={48} color={colors.textSecondary} style={styles.emptyIcon} />
            
            <Typography variant="body" style={{ color: colors.textSecondary }}>
              No transactions found
            </Typography>
          </View>
        }
      />
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
  listContainer: {
    padding: 16,
  },
  transactionCard: {
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  transactionDetails: {
    padding: 16,
    borderTopWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIcon: {
    marginBottom: 16,
  },
});

export default TransactionHistoryScreen;
