import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { useHeaderHeight } from '@react-navigation/elements';

import { MaterialTopTabs } from '~/components/TopTabs';
import ProfileHeader from '~/components/blocks/profile-header';
import { tweets } from '~/data/tweets';
import TabsProvider, { useTabs } from '~/providers/tabs-provider';
import { TUser } from '~/types/tweet';

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
};

const TopTabsHeight = 52; /* Get it from the layout or someway, i just put this number */

const Tabs = ({ user }: { user: TUser }) => {
  const { offsetY, headerHeight } = useTabs();
  const { width, height } = useWindowDimensions();

  const navHeight = useHeaderHeight();

  const headerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      offsetY,
      [0, headerHeight - navHeight],
      [0, -(headerHeight - navHeight - TopTabsHeight)],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: withSpring(translateY, SPRING_CONFIG) }],
    };
  });

  return (
    <Animated.View style={[{ width, height: height + headerHeight }, headerStyle]}>
      <MaterialTopTabs
        screenOptions={{
          lazy: true,
        }}
        tabBar={(props) => {
          return <ProfileHeader user={user} {...props} />;
        }}>
        {/* Send the profile id to child routes by the initalParam */}
        <MaterialTopTabs.Screen
          name="index"
          initialParams={{
            profile: user.id,
          }}
        />

        <MaterialTopTabs.Screen
          name="likes"
          initialParams={{
            profile: user.id,
          }}
        />
      </MaterialTopTabs>
    </Animated.View>
  );
};

export default function ProfileLayout() {
  const { profile } = useLocalSearchParams<{ profile: string }>();

  const user = useMemo(() => {
    //@ts-ignore
    return tweets.find((t) => t.user.id == profile)?.user;
  }, [profile]);

  if (!user) {
    return <></>;
  }

  return (
    <TabsProvider>
      <Tabs user={user} />
    </TabsProvider>
  );
}
