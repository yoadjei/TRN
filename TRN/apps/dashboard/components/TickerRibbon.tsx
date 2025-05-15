import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography } from '@ui/index';

type Market = {
  id: string;
  symbol: string;
  price: number;
  percentChange24h: number;
};

type TickerRibbonProps = {
  markets: Market[];
};

const TickerRibbon = ({ markets }: TickerRibbonProps) => {
  const { colors } = useTheme();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (markets.length > 0 && scrollRef.current) {
      // Calculate the content width (each ticker item is roughly 150px wide)
      const contentWidth = markets.length * 150;
      const scrollViewWidth = 400; // Approximate width of the screen

      // Create infinite scrolling animation
      Animated.loop(
        Animated.timing(scrollX, {
          toValue: -contentWidth,
          duration: markets.length * 2000, // Speed depends on number of items
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [markets]);

  if (!markets || markets.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.tickersContainer,
            {
              transform: [{ translateX: scrollX }],
            },
          ]}
        >
          {/* Double the items to create an illusion of infinite scrolling */}
          {[...markets, ...markets].map((market, index) => {
            const isPositive = market.percentChange24h >= 0;
            return (
              <View key={`${market.id}-${index}`} style={styles.tickerItem}>
                <Typography variant="body" style={{ color: colors.text, marginRight: 8 }}>
                  {market.symbol}
                </Typography>
                <Typography variant="body" style={{ color: colors.text }}>
                  ${market.price.toFixed(2)}
                </Typography>
                <Typography
                  variant="caption"
                  style={{
                    color: isPositive ? colors.success : colors.error,
                    marginLeft: 6,
                  }}
                >
                  {isPositive ? '+' : ''}
                  {market.percentChange24h.toFixed(2)}%
                </Typography>
              </View>
            );
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    overflow: 'hidden',
  },
  scrollContent: {
    alignItems: 'center',
  },
  tickersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
});

export default TickerRibbon;
