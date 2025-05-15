import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography } from '@ui/index';
import NewsCard from '../components/NewsCard';
import { useApi } from '@utils/useApi';
import Icon from 'react-native-vector-icons/Feather';
import { useAppContext } from '@host-app/AppProvider';

type NewsListScreenProps = {
  navigation: any;
};

const NewsListScreen = ({ navigation }: NewsListScreenProps) => {
  const { colors } = useTheme();
  const { data: newsData, loading, refetch } = useApi('/news');
  const [refreshing, setRefreshing] = useState(false);
  const { addNotification } = useAppContext();

  useEffect(() => {
    // Sample price alert notification for demo
    const timer = setTimeout(() => {
      addNotification({
        id: Date.now().toString(),
        message: 'BTC price alert: Bitcoin just crossed $65,000!',
        type: 'info',
        timestamp: Date.now(),
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderNewsItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewsDetail', { article: item })}
      activeOpacity={0.7}
    >
      <NewsCard
        id={item.id}
        title={item.title}
        summary={item.summary}
        publishedAt={item.published_at}
        source={item.source}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Typography variant="heading" style={{ color: colors.text }}>
          Crypto News
        </Typography>
        
        <TouchableOpacity>
          <Icon name="bell" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={newsData?.articles}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="inbox" size={48} color={colors.textSecondary} style={styles.emptyIcon} />
            
            <Typography variant="body" style={{ color: colors.textSecondary }}>
              {loading ? 'Loading news...' : 'No news articles found'}
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
  listContainer: {
    padding: 16,
    paddingTop: 0,
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

export default NewsListScreen;
