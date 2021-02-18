import * as React from 'react';

import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import InfiniteScroll from 'react-native-use-infinite-scrolling';

const data = Array.from(Array(50), (_item, i) => ({
  name: `Person ${i + 1}`,
}));

const perPage = 15;

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState<number>(1);

  const handleLoadMore = () => {
    setLoading(true);

    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 3000);
  };

  const result = data.slice(0, page * perPage);

  return (
    <SafeAreaView style={styles.container}>
      <InfiniteScroll
        data={result}
        isFinish={result.length >= 40}
        loading={loading}
        loadingText="Loading..."
        keyExtractor={(item) => item.name}
        onLoadMore={() => {
          handleLoadMore();
        }}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.box}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: 150,
    marginHorizontal: 16,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
});
