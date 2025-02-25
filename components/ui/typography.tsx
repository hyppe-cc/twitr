import { Text, TextProps } from 'react-native';

import { cn } from '~/lib/utils';

export const P = ({ className, ...props }: TextProps) => {
  return <Text className={cn('text-gray-950 dark:text-gray-50', className)} {...props} />;
};

export const Muted = ({ className, ...props }: TextProps) => {
  return <Text className={cn('text-gray-500', className)} {...props} />;
};
