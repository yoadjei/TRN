import React from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography } from '@ui/index';
import { LineChart } from 'react-native-chart-kit';

type Kline = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

type CandlestickChartProps = {
  data: Kline[];
  timeframe: string;
  loading: boolean;
};

const CandlestickChart = ({ data, timeframe, loading }: CandlestickChartProps) => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.backgroundSecondary }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.backgroundSecondary }]}>
        <Typography variant="body" style={{ color: colors.textSecondary }}>
          No chart data available
        </Typography>
      </View>
    );
  }

  // Format the data for the chart
  const chartData = {
    labels: data.slice(-12).map(kline => {
      const date = new Date(kline.timestamp);
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }),
    datasets: [
      {
        data: data.slice(-12).map(kline => kline.close),
        color: () => colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={250}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: colors.backgroundSecondary,
          backgroundGradientFrom: colors.backgroundSecondary,
          backgroundGradientTo: colors.backgroundSecondary,
          decimalPlaces: 2,
          color: () => colors.primary,
          labelColor: () => colors.textSecondary,
          style: {
            borderRadius: 0,
          },
          propsForDots: {
            r: '3',
            strokeWidth: '1',
            stroke: colors.primary,
          },
          propsForBackgroundLines: {
            stroke: colors.border,
            strokeDasharray: '5, 5',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  chart: {
    marginLeft: -16,
  },
  loadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CandlestickChart;
