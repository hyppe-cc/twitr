import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useRef } from 'react';
import { View } from 'react-native';

import Tweet from '~/components/blocks/tweet';
import Separator from '~/components/ui/separator';
import { tweets } from '~/data/tweets';
import { TTweet } from '~/types/tweet';

export default function Home() {
  const listRef = useRef();

  const renderItem = useCallback(({ item }: { item: TTweet }) => {
    return <Tweet {...item} />;
  }, []);

  //@ts-ignore
  useScrollToTop(listRef);

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        //@ts-ignore
        ref={listRef}
        data={tweets}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={renderItem}
        estimatedItemSize={122}
      />
    </View>
  );
}
