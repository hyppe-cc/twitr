import { LegendList } from '@legendapp/list';
import { useCallback } from 'react';
import { View } from 'react-native';

import Tweet from '~/components/blocks/tweet';
import { tweets } from '~/data/tweets';
import { TTweet } from '~/types/tweet';

export default function Home() {
  const renderItem = useCallback(({ item }: { item: TTweet }) => {
    return <Tweet {...item} />;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LegendList
        data={tweets}
        ItemSeparatorComponent={() => <View className="h-[1] w-full bg-gray-200" />}
        renderItem={renderItem}
        estimatedItemSize={122}
      />
    </View>
  );
}
