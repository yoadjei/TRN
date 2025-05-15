import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Card } from '@ui/index';
import { numberFormatter } from '@utils/numberFormatter';
import Icon from 'react-native-vector-icons/Feather';

type AssetCardProps = {
  symbol: string;
  name: string;
  balance: number;
  balanceUSD: number;
  percentChange: number;
};

const AssetCard = ({ symbol, name, balance, balanceUSD, percentChange }: AssetCardProps) => {
  const { colors } = useTheme();
  
  const isPositiveChange = percentChange >= 0;

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Card style={styles.container}>
        <View style={styles.leftSection}>
          <View style={[styles.iconContainer, { backgroundColor: colors.backgroundHighlight }]}>
            <Typography variant="heading" style={{ color: colors.primary }}>
              {symbol.slice(0, 1)}
            </Typography>
          </View>
          
          <View style={styles.nameContainer}>
            <Typography variant="subheading" style={{ color: colors.text }}>
              {symbol}
            </Typography>
            
            <Typography variant="caption" style={{ color: colors.textSecondary }}>
              {name}
            </Typography>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <Typography variant="body" style={{ color: colors.text, textAlign: 'right' }}>
            {balance.toFixed(6)} {symbol}
          </Typography>
          
          <View style={styles.priceRow}>
            <Typography variant="body" style={{ color: colors.text }}>
              ${numberFormatter.format(balanceUSD)}
            </Typography>
            
            <Typography
              variant="caption"
              style={{
                color: isPositiveChange ? colors.success : colors.error,
                marginLeft: 8,
              }}
            >
              {isPositiveChange ? '+' : ''}{percentChange.toFixed(2)}%
            </Typography>
          </View>
        </View>
        
        <Icon name="chevron-right" size={16} color={colors.textSecondary} />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nameContainer: {
    flexDirection: 'column',
  },
  rightSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AssetCard;
