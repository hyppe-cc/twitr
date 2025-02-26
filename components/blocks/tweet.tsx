import { formatDistanceToNow } from 'date-fns';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { cssInterop } from 'nativewind';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NativeSyntheticEvent,
  TextLayoutEventData,
  TextProps,
  TouchableOpacity,
  View,
} from 'react-native';

import Button from '~/components/ui/button';
import Icon from '~/components/ui/icon';
import { Muted, P } from '~/components/ui/typography';
import { TTweet } from '~/types/tweet';

const StyledImage = cssInterop(Image, {
  className: 'style',
});

/* Children cold be any text node, dont know how to typed */
const Body = memo(({ children, ...props }: TextProps) => {
  const { t } = useTranslation();

  const [numberOfLines, setNumberOfLine] = useState<number | undefined>();
  const [isTextExpanded, setExpanded] = useState(false);
  const [already, setAlready] = useState(false);

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (already) {
        return;
      }

      if (e.nativeEvent.lines.length > 3 && !isTextExpanded) {
        setExpanded(true);
        setNumberOfLine(3);
      }

      setAlready(true);
    },
    [already]
  );

  const toggle = useCallback(() => {
    if (numberOfLines) {
      setNumberOfLine(undefined);
    } else {
      setNumberOfLine(3);
    }
  }, [numberOfLines]);

  return (
    <>
      <P onTextLayout={onTextLayout} numberOfLines={numberOfLines} {...props}>
        {children}
      </P>

      {isTextExpanded && (
        <TouchableOpacity onPress={() => toggle()}>
          <P>{numberOfLines ? t('viewMore') : t('viewLess')}</P>
        </TouchableOpacity>
      )}
    </>
  );
});

export default function Tweet({ content, user, timestamp, id }: TTweet) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: '/tweet/[id]',
          params: {
            id,
          },
        });
      }}>
      <View className="flex flex-row items-start gap-2 p-2">
        <StyledImage
          className="aspect-square w-10 rounded-full"
          source={`https://ui-avatars.com/api/?name=${user.username}`}
        />
        <View className="flex-1 gap-1">
          <View className="flex flex-row gap-1">
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: '/[profile]',
                  params: {
                    profile: user.id,
                  },
                });
              }}>
              <P className="font-semibold">{user.display_name}</P>
            </TouchableOpacity>
            <Muted>
              {`@${user.username}`}
              {' - '}
              {formatDistanceToNow(timestamp, { addSuffix: false })}
            </Muted>
          </View>

          <Body>{content}</Body>

          {/* Footer */}
          <View className="flex flex-row justify-between">
            {/* Use color context to inherit wall color, for example for buttons. */}
            <Button>
              <Icon name="chatbubble-outline" />
            </Button>
            <Button variant="destructive">
              <Icon name="repeat-outline" />
            </Button>
            <Button className="text-blue-500 dark:text-blue-400">
              <Icon name="heart-outline" />
            </Button>
            <Button variant="destructive">
              <Icon name="bar-chart-outline" />
            </Button>
            <Button variant="destructive">
              <Icon name="bookmark-outline" />
            </Button>
            <Button>
              <Icon name="share-outline" />
            </Button>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
