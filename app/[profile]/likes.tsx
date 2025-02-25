import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';

import { Container } from '~/components/Container';
import Tweet from '~/components/blocks/tweet';
import { tweets } from '~/data/tweets';
import { TTweet } from '~/types/tweet';

export default function Home() {
  const { profile } = useLocalSearchParams<{ profile: string }>();

  const renderItem = useCallback(({ item }: { item: TTweet }) => {
    return <Tweet {...item} />;
  }, []);

  console.log(profile);

  return (
    <Container>
      <FlashList
        data={tweets}
        ItemSeparatorComponent={() => <View className="h-[1] w-full bg-gray-200" />}
        renderItem={renderItem}
        estimatedItemSize={122}
      />
    </Container>
  );
}
