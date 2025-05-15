import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography } from '@ui/index';
import PortfolioSummary from '../components/PortfolioSummary';
import AssetCard from '../components/AssetCard';
import TickerRibbon from '../components/TickerRibbon';
import PerformanceChart from '../components/PerformanceChart';
import { useApi } from '@utils/useApi';
import { useAppContext } from '@host-app/AppProvider';

const DashboardScreen = () => {
  const { colors } = useTheme();
  const { data: balancesData, loading, refetch } = useApi('/balances');
  const { data: marketsData } = useApi('/markets');
  const [refreshing, setRefreshing] = useState(false);
  const { addNotification } = useAppContext();

  useEffect(() => {
    // Show welcome notification
    addNotification({
      id: Date.now().toString(),
      message: 'Welcome to OKX! Check your portfolio.',
      type: 'info',
      timestamp: Date.now(),
    });
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        <View style={styles.header}>
          <Typography variant="heading" style={{ color: colors.text }}>
            Dashboard
          </Typography>
        </View>

        <TickerRibbon markets={marketsData?.markets || []} />

        <View style={styles.section}>
          <PortfolioSummary
            totalBalance={balancesData?.totalBalanceUSD || 0}
            percentChange={balancesData?.percentChange24h || 0}
            loading={loading}
          />
        </View>

        <View style={styles.section}>
          <Typography variant="subheading" style={{ color: colors.text, marginBottom: 16 }}>
            Performance
          </Typography>
          <PerformanceChart data={balancesData?.performanceData || []} />
        </View>

        <View style={styles.section}>
          <Typography variant="subheading" style={{ color: colors.text, marginBottom: 16 }}>
            Your Assets
          </Typography>
          
          {balancesData?.assets?.map((asset) => (
            <AssetCard
              key={asset.id}
              symbol={asset.symbol}
              name={asset.name}
              balance={asset.balance}
              balanceUSD={asset.balanceUSD}
              percentChange={asset.percentChange24h}
            />
          ))}
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
  section: {
    padding: 16,
    marginBottom: 8,
  },
});

export default DashboardScreen;
