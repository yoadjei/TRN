import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Card } from '@ui/index';

type OrderBookData = {
  asks: Array<[string, string]>; // [price, amount]
  bids: Array<[string, string]>; // [price, amount]
};

type OrderBookProps = {
  data: OrderBookData;
  loading: boolean;
};

const OrderBook = ({ data, loading }: OrderBookProps) => {
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  const maxVolume = Math.max(
    ...data.asks.map(([_, amount]) => parseFloat(amount)),
    ...data.bids.map(([_, amount]) => parseFloat(amount))
  );

  const renderOrderRow = (price: string, amount: string, side: 'ask' | 'bid', index: number) => {
    const priceNum = parseFloat(price);
    const amountNum = parseFloat(amount);
    const volumePercentage = (amountNum / maxVolume) * 100;
    
    return (
      <View
        key={`${side}-${index}`}
        style={[
          styles.orderRow,
          { borderBottomColor: colors.border },
        ]}
      >
        <View
          style={[
            styles.volumeBar,
            {
              backgroundColor: side === 'ask' ? colors.error + '30' : colors.success + '30',
              width: `${volumePercentage}%`,
              right: side === 'ask' ? 0 : undefined,
              left: side === 'bid' ? 0 : undefined,
            },
          ]}
        />
        
        <Typography variant="body" style={{ color: side === 'ask' ? colors.error : colors.success }}>
          {priceNum.toFixed(2)}
        </Typography>
        
        <Typography variant="body" style={{ color: colors.text, textAlign: 'right' }}>
          {amountNum.toFixed(6)}
        </Typography>
        
        <Typography variant="body" style={{ color: colors.textSecondary, textAlign: 'right' }}>
          {(priceNum * amountNum).toFixed(2)}
        </Typography>
      </View>
    );
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Typography variant="caption" style={{ color: colors.textSecondary, flex: 1 }}>
          Price
        </Typography>
        <Typography variant="caption" style={{ color: colors.textSecondary, flex: 1, textAlign: 'right' }}>
          Amount
        </Typography>
        <Typography variant="caption" style={{ color: colors.textSecondary, flex: 1, textAlign: 'right' }}>
          Total
        </Typography>
      </View>
      
      <View style={styles.asksContainer}>
        {data.asks.slice(0, 8).map((ask, index) => renderOrderRow(ask[0], ask[1], 'ask', index))}
      </View>
      
      <View style={[styles.centerPrice, { borderTopColor: colors.border, borderBottomColor: colors.border }]}>
        <Typography variant="subheading" style={{ color: colors.text }}>
          {data.bids[0] ? parseFloat(data.bids[0][0]).toFixed(2) : '0.00'} USDT
        </Typography>
      </View>
      
      <View style={styles.bidsContainer}>
        {data.bids.slice(0, 8).map((bid, index) => renderOrderRow(bid[0], bid[1], 'bid', index))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingBottom: 8,
  },
  asksContainer: {},
  bidsContainer: {},
  centerPrice: {
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    position: 'relative',
    zIndex: 1,
  },
  volumeBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export default OrderBook;
