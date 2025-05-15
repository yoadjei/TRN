import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Typography, Card } from '@ui/index';
import Icon from 'react-native-vector-icons/Feather';
import { dateFormatter } from '@utils/dateFormatter';

type NewsDetailScreenProps = {
  navigation: any;
  route: {
    params: {
      article: {
        id: string;
        title: string;
        summary: string;
        content: string;
        published_at: string;
        source: string;
      };
    };
  };
};

const NewsDetailScreen = ({ navigation, route }: NewsDetailScreenProps) => {
  const { colors } = useTheme();
  const { article } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title} - Read more in the OKX app`,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Typography variant="heading" numberOfLines={1} style={{ color: colors.text, flex: 1, textAlign: 'center' }}>
          News Detail
        </Typography>
        
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Icon name="share-2" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Typography variant="largeHeading" style={{ color: colors.text, marginBottom: 12 }}>
            {article.title}
          </Typography>
          
          <View style={styles.metaContainer}>
            <Typography variant="caption" style={{ color: colors.textSecondary }}>
              {article.source}
            </Typography>
            
            <Typography variant="caption" style={{ color: colors.textSecondary }}>
              {dateFormatter.formatRelative(new Date(article.published_at))}
            </Typography>
          </View>
          
          <Card style={[styles.summaryCard, { backgroundColor: colors.backgroundHighlight }]}>
            <Typography variant="subheading" style={{ color: colors.text, marginBottom: 8 }}>
              Summary
            </Typography>
            
            <Typography variant="body" style={{ color: colors.text }}>
              {article.summary}
            </Typography>
          </Card>
          
          <Typography variant="body" style={{ color: colors.text, lineHeight: 22 }}>
            {article.content}
          </Typography>
          
          <View style={[styles.tagsContainer, { backgroundColor: colors.backgroundSecondary }]}>
            <Typography variant="caption" style={{ color: colors.textSecondary, marginRight: 8 }}>
              Tags:
            </Typography>
            
            <View style={styles.tagsList}>
              <View style={[styles.tag, { backgroundColor: colors.backgroundHighlight }]}>
                <Typography variant="caption" style={{ color: colors.primary }}>
                  Bitcoin
                </Typography>
              </View>
              
              <View style={[styles.tag, { backgroundColor: colors.backgroundHighlight }]}>
                <Typography variant="caption" style={{ color: colors.primary }}>
                  Market
                </Typography>
              </View>
              
              <View style={[styles.tag, { backgroundColor: colors.backgroundHighlight }]}>
                <Typography variant="caption" style={{ color: colors.primary }}>
                  ETF
                </Typography>
              </View>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
  },
  backButton: {
    padding: 4,
  },
  shareButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryCard: {
    padding: 16,
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
});

export default NewsDetailScreen;
