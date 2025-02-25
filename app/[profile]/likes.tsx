import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions, View } from 'react-native';

import { Container } from '~/components/Container';
import Tweet from '~/components/blocks/tweet';
import { tweets } from '~/data/tweets';
import { useTabs } from '~/providers/tabs-provider';
import { TTweet } from '~/types/tweet';

/* Header Height (the title) + Material Top Tabs Height */
const offsetBottom = 200;

export default function LikesPage() {
  const { height } = useWindowDimensions();
  /* Profile from inital params */
  const { profile } = useLocalSearchParams<{ profile: string }>();

  const { setOffsetY, offsetY } = useTabs();

  const renderItem = useCallback(({ item }: { item: TTweet }) => {
    return <Tweet {...item} />;
  }, []);

  const handleOnScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    /* Verify current position */
    setOffsetY(e.nativeEvent.contentOffset.y);
  }, []);

  return (
    <Container style={{ position: 'relative', height: height - offsetBottom }}>
      <FlashList
        data={tweets}
        onScroll={handleOnScroll}
        ItemSeparatorComponent={() => <View className="h-[1] w-full bg-gray-200" />}
        renderItem={renderItem}
        estimatedItemSize={122}
      />
    </Container>
  );
}
