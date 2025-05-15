import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography } from '@ui/index';
import { LineChart } from 'react-native-chart-kit';

type PerformanceChartProps = {
  data: Array<{
    timestamp: string;
    value: number;
  }>;
};

const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width - 32; // Full width minus padding

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
        <Typography variant="body" style={{ color: colors.textSecondary }}>
          No performance data available
        </Typography>
      </View>
    );
  }

  // Prepare data for chart
  const chartData = {
    labels: data.map(d => {
      const date = new Date(d.timestamp);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        data: data.map(d => d.value),
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
        height={220}
        chartConfig={{
          backgroundColor: colors.backgroundSecondary,
          backgroundGradientFrom: colors.backgroundSecondary,
          backgroundGradientTo: colors.backgroundSecondary,
          decimalPlaces: 2,
          color: () => colors.primary,
          labelColor: () => colors.textSecondary,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '1',
            stroke: colors.primary,
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
    justifyContent: 'center',
    borderRadius: 16,
    overflow: 'hidden',
  },
  chart: {
    borderRadius: 16,
    paddingRight: 0,
  },
});

export default PerformanceChart;
