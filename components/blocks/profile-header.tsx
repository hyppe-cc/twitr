import { MaterialTopTabBar, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import Image from '~/components/ui/image';
import { P } from '~/components/ui/typography';
import { useTabs } from '~/providers/tabs-provider';
import { TUser } from '~/types/tweet';

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
};

const SCROLL_THRESHOLD = 500;

export default function ProfileHeader({
  user,
  ...props
}: MaterialTopTabBarProps & { user: TUser }) {
  const theme = useTheme();

  const { headerHeight, setHeaderHeight, offsetY } = useTabs();

  const opacity = useAnimatedStyle(() => {
    const opacity = interpolate(offsetY, [0, SCROLL_THRESHOLD * 0.7], [0, 1], Extrapolation.CLAMP);

    return {
      opacity: withSpring(opacity, SPRING_CONFIG),
    };
  });

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (headerHeight === 0) {
        /* This will be added + the height of the device */
        console.log(e.nativeEvent.layout.height);
        setHeaderHeight(e.nativeEvent.layout.height);
      }
    },
    [user]
  );

  return (
    <View onLayout={handleLayout} className="relative">
      <View className="relative">
        <Image source="https://picsum.photos/1000/1000" className="aspect-square w-full" />
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', theme.colors.background]}
          style={{ position: 'absolute', inset: 0 }}
        />
      </View>

      <Image
        source="https://picsum.photos/500/500"
        className="-mt-12 ml-4 aspect-square w-24 rounded-3xl border-4 border-white"
      />

      <View className="gap-2 p-4">
        <View>
          <P className="text-2xl font-semibold">{user.display_name}</P>
          <P className="text-gray-800">@{user.username}</P>
        </View>

        <View className="flex-row gap-2">
          <P>
            followers: <P className="font-semibold">{user.followers_count}</P>
          </P>
          <P>
            following: <P className="font-semibold">{user.followers_count}</P>
          </P>
        </View>

        <View>
          <P className="font-medium">{user.bio}</P>
        </View>
      </View>

      <Animated.View className="absolute inset-0" style={[opacity]}>
        <BlurView tint="systemChromeMaterial" style={{ flex: 1 }} />
      </Animated.View>

      <MaterialTopTabBar {...props} />
    </View>
  );
}
