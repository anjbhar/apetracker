import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AboutScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>About ApeTracker</ThemedText>
        
        <ThemedText style={styles.paragraph}>
          ApeTracker displays real-time stock and cryptocurrency sentiment data by tracking mentions across popular discussion boards.
        </ThemedText>
        
        <ThemedText type="subtitle" style={styles.subtitle}>Data Sources</ThemedText>
        <ThemedText style={styles.paragraph}>
          This app monitors the most popular stock and crypto boards on Reddit and 4Chan, including:
        </ThemedText>
        
        <ThemedText style={styles.listItem}>• WallStreetBets (WSB)</ThemedText>
        <ThemedText style={styles.listItem}>• r/stocks</ThemedText>
        <ThemedText style={styles.listItem}>• r/investing</ThemedText>
        <ThemedText style={styles.listItem}>• r/CryptoCurrency</ThemedText>
        <ThemedText style={styles.listItem}>• 4chan /biz</ThemedText>
        <ThemedText style={styles.listItem}>• and many more</ThemedText>
        
        <ThemedText type="subtitle" style={styles.subtitle}>Features</ThemedText>
        <ThemedText style={styles.listItem}>• Real-time mention tracking</ThemedText>
        <ThemedText style={styles.listItem}>• 24-hour rank changes</ThemedText>
        <ThemedText style={styles.listItem}>• Upvote counts</ThemedText>
        <ThemedText style={styles.listItem}>• Filter by Stocks, Crypto, or All</ThemedText>
        <ThemedText style={styles.listItem}>• Pull to refresh</ThemedText>
        <ThemedText style={styles.listItem}>• Dark mode support</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
    lineHeight: 22,
  },
  listItem: {
    marginBottom: 8,
    marginLeft: 8,
    lineHeight: 22,
  },
});
