import { formatDistanceToNow } from 'date-fns';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { cssInterop } from 'nativewind';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    NativeSyntheticEvent,
    Text,
    TextLayoutEventData,
    TextProps,
    TouchableOpacity,
    View,
} from 'react-native';

import Icon from '~/components/ui/icon';
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
      <Text onTextLayout={onTextLayout} numberOfLines={numberOfLines} {...props}>
        {children}
      </Text>

      {isTextExpanded && (
        <TouchableOpacity onPress={() => toggle()}>
          <Text>{numberOfLines ? t('viewMore') : t('viewLess')}</Text>
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
              <Text className="font-semibold">{user.display_name}</Text>
            </TouchableOpacity>
            <Text className="text-gray-800">
              {`@${user.username}`}
              {' - '}
              {formatDistanceToNow(timestamp, { addSuffix: false })}
            </Text>
          </View>

          <Body>{content}</Body>

          {/* Footer */}
          <View className="flex flex-row justify-between border border-red-500">
            <Icon name="chatbubble-outline" />
            <Icon name="repeat-outline" />
            <Icon name="heart-outline" />
            <Icon name="bar-chart-outline" />
            <Icon name="bookmark-outline" />
            <Icon name="share-outline" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
