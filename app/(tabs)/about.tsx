import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AboutScreen() {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, isDark ? styles.textDark : styles.textLight]}>About ApeTracker</Text>

        <Text style={[styles.paragraph, isDark ? styles.textDark : styles.textLight]}>
          ApeTracker displays real-time stock and cryptocurrency sentiment data by tracking mentions across popular discussion boards.
        </Text>

        <Text style={[styles.subtitle, isDark ? styles.textDark : styles.textLight]}>Data Sources</Text>
        <Text style={[styles.paragraph, isDark ? styles.textDark : styles.textLight]}>
          This app monitors the most popular stock and crypto boards on Reddit and 4Chan, including:
        </Text>

        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- WallStreetBets (WSB)</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- r/stocks</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- r/investing</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- r/CryptoCurrency</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- 4chan /biz</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- and many more</Text>

        <Text style={[styles.subtitle, isDark ? styles.textDark : styles.textLight]}>Features</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- Real-time mention tracking</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- 24-hour rank changes</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- Upvote counts</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- Filter by Stocks, Crypto, or All</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- Pull to refresh</Text>
        <Text style={[styles.listItem, isDark ? styles.textDark : styles.textLight]}>- Dark mode support</Text>
      </ScrollView>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
    lineHeight: 22,
  },
  listItem: {
    marginBottom: 8,
    marginLeft: 4,
    lineHeight: 22,
  },
  textLight: {
    color: '#111827',
  },
  textDark: {
    color: '#f9fafb',
  },
});
