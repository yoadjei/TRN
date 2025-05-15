import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Card } from '@ui/index';
import { numberFormatter } from '@utils/numberFormatter';

type PortfolioSummaryProps = {
  totalBalance: number;
  percentChange: number;
  loading: boolean;
};

const PortfolioSummary = ({ totalBalance, percentChange, loading }: PortfolioSummaryProps) => {
  const { colors } = useTheme();
  
  const isPositiveChange = percentChange >= 0;

  if (loading) {
    return (
      <Card style={styles.container}>
        <ActivityIndicator size="small" color={colors.primary} />
      </Card>
    );
  }

  return (
    <Card style={styles.container}>
      <Typography variant="caption" style={{ color: colors.textSecondary, marginBottom: 8 }}>
        Total Balance
      </Typography>
      
      <Typography variant="largeHeading" style={{ color: colors.text, marginBottom: 12 }}>
        ${numberFormatter.format(totalBalance)}
      </Typography>
      
      <View style={styles.changeContainer}>
        <Typography
          variant="body"
          style={{
            color: isPositiveChange ? colors.success : colors.error,
          }}
        >
          {isPositiveChange ? '+' : ''}{percentChange.toFixed(2)}%
        </Typography>
        
        <Typography variant="caption" style={{ color: colors.textSecondary, marginLeft: 8 }}>
          24h change
        </Typography>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PortfolioSummary;
