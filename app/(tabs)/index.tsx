import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface StockData {
  rank: number;
  ticker: string;
  name: string;
  mentions: string;
  upvotes: string;
  rank_24h_ago: string;
  mentions_24h_ago: string;
}

interface ApiResponse {
  results: StockData[];
}

type Filter = 'all-stocks' | 'all-crypto' | 'all';

async function fetchSentiment(filter: Filter, signal?: AbortSignal): Promise<StockData[]> {
  const response = await fetch(`https://apewisdom.io/api/v1.0/filter/${filter}/page/1`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json: ApiResponse = await response.json();
  return json.results ?? [];
}

export default function HomeScreen() {
  const [filter, setFilter] = useState<Filter>('all-stocks');
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    data = [],
    error,
    isPending,
    isFetching,
    refetch,
  } = useQuery<StockData[], Error>({
    queryKey: ['sentiment', filter],
    queryFn: ({ signal }) => fetchSentiment(filter, signal),
    placeholderData: keepPreviousData,
  });

  const toNumber = (value: string) => Number.parseInt(value, 10) || 0;

  const getMentionChange = (current: string, previous: string) => {
    return toNumber(current) - toNumber(previous);
  };

  const getRankChange = (current: string, previous: string) => {
    const change = toNumber(previous) - toNumber(current); // Lower rank is better, so invert.

    if (change > 0) {
      return { text: `+${change}`, color: '#4ade80' };
    }
    if (change < 0) {
      return { text: `${change}`, color: '#ef4444' };
    }
    return { text: '0', color: isDark ? '#9ca3af' : '#6b7280' };
  };

  const renderItem = ({ item }: { item: StockData }) => {
    const rankChange = getRankChange(item.rank.toString(), item.rank_24h_ago);
    const mentionChange = getMentionChange(item.mentions, item.mentions_24h_ago);

    return (
      <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
        <View style={styles.rankContainer}>
          <Text style={[styles.rank, isDark ? styles.textDark : styles.textLight]} numberOfLines={1}>
            #{item.rank}
          </Text>
          <Text style={[styles.rankChange, { color: rankChange.color }]} numberOfLines={1}>
            {rankChange.text}
          </Text>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.tickerNameContainer}>
            <Text
              style={[styles.ticker, isDark ? styles.textDark : styles.textLight]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.ticker}
            </Text>
            <Text
              style={[styles.name, isDark ? styles.textSecondaryDark : styles.textSecondaryLight]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text
                style={[styles.statLabel, isDark ? styles.textSecondaryDark : styles.textSecondaryLight]}
                numberOfLines={1}
              >
                Mentions
              </Text>
              <Text style={[styles.statValue, isDark ? styles.textDark : styles.textLight]} numberOfLines={1}>
                {item.mentions}
              </Text>
              <Text
                style={[styles.statChange, { color: mentionChange >= 0 ? '#4ade80' : '#ef4444' }]}
                numberOfLines={1}
              >
                {mentionChange > 0 ? `+${mentionChange}` : `${mentionChange}`}
              </Text>
            </View>

            <View style={styles.stat}>
              <Text
                style={[styles.statLabel, isDark ? styles.textSecondaryDark : styles.textSecondaryLight]}
                numberOfLines={1}
              >
                Upvotes
              </Text>
              <Text style={[styles.statValue, isDark ? styles.textDark : styles.textLight]} numberOfLines={1}>
                {item.upvotes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const isInitialLoading = isPending && data.length === 0;
  const errorMessage =
    error instanceof Error ? error.message : 'Unable to load sentiment data right now.';

  if (isInitialLoading) {
    return (
      <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
        <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
      </View>
    );
  }

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'all-stocks' && styles.filterButtonActive,
            isDark ? styles.filterButtonDark : styles.filterButtonLight,
          ]}
          onPress={() => setFilter('all-stocks')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'all-stocks' && styles.filterTextActive,
              isDark ? styles.textDark : styles.textLight,
            ]}
          >
            Stocks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'all-crypto' && styles.filterButtonActive,
            isDark ? styles.filterButtonDark : styles.filterButtonLight,
          ]}
          onPress={() => setFilter('all-crypto')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'all-crypto' && styles.filterTextActive,
              isDark ? styles.textDark : styles.textLight,
            ]}
          >
            Crypto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'all' && styles.filterButtonActive,
            isDark ? styles.filterButtonDark : styles.filterButtonLight,
          ]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.filterTextActive,
              isDark ? styles.textDark : styles.textLight,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
      </View>

      {isFetching && !isManualRefreshing ? (
        <View style={styles.updatingRow}>
          <ActivityIndicator size="small" color={isDark ? '#f9fafb' : '#111827'} />
          <Text style={[styles.updatingText, isDark ? styles.textDark : styles.textLight]}>Updating...</Text>
        </View>
      ) : null}

      {error ? (
        <View style={[styles.errorBanner, isDark ? styles.errorBannerDark : styles.errorBannerLight]}>
          <Text style={[styles.errorText, isDark ? styles.textDark : styles.textLight]}>
            Could not load data. {errorMessage}
          </Text>
          <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.ticker}-${item.rank}`}
        refreshControl={
          <RefreshControl
            refreshing={isManualRefreshing}
            onRefresh={async () => {
              setIsManualRefreshing(true);
              await refetch();
              setIsManualRefreshing(false);
            }}
            tintColor={isDark ? '#fff' : '#000'}
          />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, isDark ? styles.textSecondaryDark : styles.textSecondaryLight]}>
              No entries found for this filter.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLight: {
    backgroundColor: '#f3f4f6',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  filterButtonLight: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
  },
  filterButtonDark: {
    backgroundColor: '#1f2937',
    borderColor: '#374151',
  },
  filterButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  updatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  updatingText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  errorBanner: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  errorBannerLight: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
  },
  errorBannerDark: {
    backgroundColor: '#3f1d1d',
    borderColor: '#7f1d1d',
  },
  errorText: {
    fontSize: 13,
    marginBottom: 8,
  },
  retryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardLight: {
    backgroundColor: '#fff',
  },
  cardDark: {
    backgroundColor: '#1f2937',
  },
  rankContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    minWidth: 50,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rankChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  tickerNameContainer: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  ticker: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    flexShrink: 0,
  },
  stat: {
    alignItems: 'flex-end',
    minWidth: 55,
  },
  statLabel: {
    fontSize: 9,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statChange: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  emptyStateText: {
    fontSize: 14,
  },
  textLight: {
    color: '#111827',
  },
  textDark: {
    color: '#f9fafb',
  },
  textSecondaryLight: {
    color: '#6b7280',
  },
  textSecondaryDark: {
    color: '#9ca3af',
  },
});
