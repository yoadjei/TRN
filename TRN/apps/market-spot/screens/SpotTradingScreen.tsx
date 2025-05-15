import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Input, Button, Card } from '@ui/index';
import OrderBook from '../components/OrderBook';
import CandlestickChart from '../components/CandlestickChart';
import { useApi } from '@utils/useApi';
import { useAppContext } from '@host-app/AppProvider';
import Icon from 'react-native-vector-icons/Feather';

const SpotTradingScreen = () => {
  const { colors } = useTheme();
  const { data: marketData, loading } = useApi('/markets/BTC-USDT');
  const { selectedCurrency, setSelectedCurrency } = useAppContext();
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [timeframe, setTimeframe] = useState('1h');
  
  const timeframes = ['15m', '1h', '4h', '1d', '1w'];
  
  const handlePlaceOrder = () => {
    // Place order logic
  };
  
  const totalCost = price && amount ? parseFloat(price) * parseFloat(amount) : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.symbolSelector}>
          <TouchableOpacity style={styles.symbolButton}>
            <Typography variant="subheading" style={{ color: colors.text }}>
              BTC/USDT
            </Typography>
            <Icon name="chevron-down" size={16} color={colors.textSecondary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          
          <Typography
            variant="body"
            style={{ color: colors.success }}
          >
            {marketData?.lastPrice || '0.00'} 
            <Typography variant="caption" style={{ color: colors.success }}>
              {' '}+{marketData?.priceChangePercent || '0.00'}%
            </Typography>
          </Typography>
        </View>
      </View>
      
      <ScrollView>
        <View style={styles.chartContainer}>
          <View style={styles.timeframeSelector}>
            {timeframes.map((tf) => (
              <TouchableOpacity
                key={tf}
                style={[
                  styles.timeframeButton,
                  { backgroundColor: timeframe === tf ? colors.primary : 'transparent' }
                ]}
                onPress={() => setTimeframe(tf)}
              >
                <Typography
                  variant="caption"
                  style={{ color: timeframe === tf ? colors.white : colors.textSecondary }}
                >
                  {tf}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
          
          <CandlestickChart
            data={marketData?.klines || []}
            timeframe={timeframe}
            loading={loading}
          />
        </View>
        
        <View style={styles.orderBookSection}>
          <Typography variant="subheading" style={{ color: colors.text, marginBottom: 8 }}>
            Order Book
          </Typography>
          <OrderBook data={marketData?.orderBook || {}} loading={loading} />
        </View>
        
        <Card style={styles.tradingForm}>
          <View style={styles.orderTypeSelector}>
            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                { backgroundColor: orderType === 'limit' ? colors.primary : 'transparent' }
              ]}
              onPress={() => setOrderType('limit')}
            >
              <Typography
                variant="body"
                style={{ color: orderType === 'limit' ? colors.white : colors.textSecondary }}
              >
                Limit
              </Typography>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.orderTypeButton,
                { backgroundColor: orderType === 'market' ? colors.primary : 'transparent' }
              ]}
              onPress={() => setOrderType('market')}
            >
              <Typography
                variant="body"
                style={{ color: orderType === 'market' ? colors.white : colors.textSecondary }}
              >
                Market
              </Typography>
            </TouchableOpacity>
          </View>
          
          <View style={styles.buyOrSellSelector}>
            <TouchableOpacity
              style={[
                styles.buyButton,
                { 
                  backgroundColor: side === 'buy' ? colors.success + '20' : 'transparent',
                  borderColor: side === 'buy' ? colors.success : colors.border,
                }
              ]}
              onPress={() => setSide('buy')}
            >
              <Typography
                variant="body"
                style={{ color: colors.success }}
              >
                Buy
              </Typography>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sellButton,
                { 
                  backgroundColor: side === 'sell' ? colors.error + '20' : 'transparent',
                  borderColor: side === 'sell' ? colors.error : colors.border,
                }
              ]}
              onPress={() => setSide('sell')}
            >
              <Typography
                variant="body"
                style={{ color: colors.error }}
              >
                Sell
              </Typography>
            </TouchableOpacity>
          </View>
          
          {orderType === 'limit' && (
            <Input
              label="Price (USDT)"
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              keyboardType="numeric"
              style={styles.input}
            />
          )}
          
          <Input
            label="Amount (BTC)"
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
            style={styles.input}
          />
          
          <View style={styles.totalRow}>
            <Typography variant="body" style={{ color: colors.textSecondary }}>
              Total:
            </Typography>
            <Typography variant="body" style={{ color: colors.text }}>
              {totalCost.toFixed(2)} USDT
            </Typography>
          </View>
          
          <Button
            title={`${side === 'buy' ? 'Buy' : 'Sell'} BTC`}
            onPress={handlePlaceOrder}
            style={[
              styles.orderButton,
              { backgroundColor: side === 'buy' ? colors.success : colors.error }
            ]}
          />
        </Card>
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
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  symbolSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symbolButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContainer: {
    marginVertical: 8,
  },
  timeframeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  timeframeButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  orderBookSection: {
    padding: 16,
  },
  tradingForm: {
    padding: 16,
    margin: 16,
  },
  orderTypeSelector: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  orderTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  buyOrSellSelector: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  buyButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
  },
  sellButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    marginBottom: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderButton: {
    marginTop: 8,
  },
});

export default SpotTradingScreen;
