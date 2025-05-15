import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Card } from '@ui/index';
import { dateFormatter } from '@utils/dateFormatter';

type NewsCardProps = {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  source: string;
};

const NewsCard = ({ title, summary, publishedAt, source }: NewsCardProps) => {
  const { colors } = useTheme();

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Typography variant="caption" style={{ color: colors.primary }}>
          {source}
        </Typography>
        
        <Typography variant="caption" style={{ color: colors.textSecondary }}>
          {dateFormatter.formatRelative(new Date(publishedAt))}
        </Typography>
      </View>
      
      <Typography variant="subheading" style={{ color: colors.text, marginBottom: 8 }}>
        {title}
      </Typography>
      
      <Typography 
        variant="body" 
        style={{ color: colors.textSecondary }} 
        numberOfLines={2}
      >
        {summary}
      </Typography>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default NewsCard;
