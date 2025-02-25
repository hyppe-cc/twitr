import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';

import Tweet from '~/components/blocks/tweet';
import { tweets } from '~/data/tweets';

export default function ShowTweet() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const tweet = useMemo(() => {
    //@ts-ignore
    return tweets.find((t) => t.id == id);
  }, [id]);

  if (!tweet) {
    return <></>;
  }

  return <Tweet {...tweet} />;
}
